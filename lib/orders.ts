import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from './firebase';

export type OrderItem = { id: string; name: string; price: number; quantity: number; image: string; color?: string };
export type Order = { id: string; userId: string; email: string; items: OrderItem[]; total: number; status: string; paymentStatus: string; paymentReference?: string; createdAt?: { seconds: number; nanoseconds: number } };

export async function getUserOrders(userId: string) {
  const q = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as Order[];
}
