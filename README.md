# LUXORA — Next.js + Firebase E-commerce

The original LUXORA visual design is preserved. This version adds Firebase Authentication, Firestore carts/orders, checkout, Paystack payment, and Framer Motion animations.

## Firebase
1. Create a Firebase project.
2. Enable Authentication > Email/Password.
3. Create Firestore.
4. Add a Web App and put its config into `.env.local` using `.env.example`.
5. Create a service account and add its server credentials to `.env.local` (never use `NEXT_PUBLIC_` for these values).
6. Deploy the included `firestore.rules`.

## Paystack
Set `PAYSTACK_SECRET_KEY` and `NEXT_PUBLIC_APP_URL` in `.env.local`. The server validates the catalog prices, initializes a hosted Paystack transaction, verifies it, and creates the Firestore order. For production, add a Paystack webhook for reconciliation if a customer closes the browser before the callback completes.

## Run
```bash
npm install
npm run dev
```

## Routes
`/` `/collections` `/collections/[slug]` `/products/[slug]` `/login` `/signup` `/cart` `/checkout` `/payment/callback` `/account`
