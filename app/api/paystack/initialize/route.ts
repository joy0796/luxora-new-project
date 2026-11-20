import { NextResponse } from 'next/server';
import { products } from '@/lib/data';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!process.env.PAYSTACK_SECRET_KEY) return NextResponse.json({ error: 'Paystack is not configured. Add PAYSTACK_SECRET_KEY to .env.local.' }, { status: 500 });
    if (!body.email || !body.userId || !Array.isArray(body.items) || !body.items.length) return NextResponse.json({ error: 'Missing checkout information.' }, { status: 400 });
    // Server-side catalog validation prevents clients from changing prices before payment.
    const validated = body.items.map((item: { productId: string; quantity: number; color: string }) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Unknown product: ${item.productId}`);
      const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
      return { productId: product.id, name: product.name, price: product.price, quantity, image: product.image, color: item.color || product.colors[0]?.name };
    });
    const subtotal = validated.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0);
    const shipping = subtotal >= 100 ? 0 : 12;
    const total = subtotal + shipping;
    if (Math.abs(total - Number(body.total)) > 0.01) return NextResponse.json({ error: 'Cart total changed. Please refresh and try again.' }, { status: 400 });
    const response = await fetch('https://api.paystack.co/transaction/initialize', { method: 'POST', headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: body.email, amount: Math.round(total * 100), currency: 'USD', callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/callback`, metadata: { userId: body.userId, name: body.name, phone: body.phone, address: body.address, city: body.city, items: validated, subtotal, shipping, total } }) });
    const data = await response.json();
    if (!response.ok || !data.status) return NextResponse.json({ error: data.message || 'Paystack initialization failed.' }, { status: 502 });
    return NextResponse.json({ authorization_url: data.data.authorization_url, reference: data.data.reference });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unable to initialize payment.' }, { status: 500 }); }
}
