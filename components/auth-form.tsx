'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const router = useRouter();
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(''); setBusy(true);
    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });
        await setDoc(doc(db, 'users', credential.user.uid), { uid: credential.user.uid, name, email, createdAt: new Date() }, { merge: true });
      } else await signInWithEmailAndPassword(auth, email, password);
      router.push('/account');
    } catch (err) { setError(err instanceof Error ? err.message.replace('Firebase: ', '') : 'Something went wrong.'); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit} className="space-y-5">
    {mode === 'signup' && <label className="block"><span className="field-label">Full name</span><input required value={name} onChange={e=>setName(e.target.value)} className="field" placeholder="Your name"/></label>}
    <label className="block"><span className="field-label">Email</span><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="field" placeholder="you@example.com"/></label>
    <label className="block"><span className="field-label">Password</span><input required minLength={6} type="password" value={password} onChange={e=>setPassword(e.target.value)} className="field" placeholder="At least 6 characters"/></label>
    {error && <p className="rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</p>}
    <button disabled={busy} className="lux-button w-full disabled:opacity-50">{busy ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}</button>
    <p className="text-center text-xs text-muted">{mode === 'signup' ? <>Already have an account? <Link className="underline" href="/login">Sign in</Link></> : <>New to LUXORA? <Link className="underline" href="/signup">Create an account</Link></>}</p>
  </form>;
}
