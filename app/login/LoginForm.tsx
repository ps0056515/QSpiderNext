'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });
      if (res?.error) {
        setError('Invalid email or password.');
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="card-surface p-6 sm:p-8">
      <form className="space-y-5" onSubmit={onSubmit}>
        {error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </p>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            Email
          </label>
          <div className="relative mt-1.5">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              aria-hidden
            />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium text-volt-400 hover:text-volt-300 transition"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative mt-1.5">
            <Lock
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              aria-hidden
            />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
            />
          </div>
        </div>

        <button type="submit" disabled={pending} className="btn-primary w-full justify-center">
          {pending ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-6 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-center text-xs leading-relaxed text-slate-400">
        <span className="font-medium text-slate-300">Quick demo:</span>{' '}
        <span className="font-mono text-slate-200">demo@qspiders-learn.example</span> /{' '}
        <span className="font-mono text-slate-200">Demo123</span>
        <br />
        <span className="mt-2 inline-block text-[11px]">
          Other seeded accounts use password <span className="font-mono text-slate-300">demo123</span>{' '}
          (learner, trainer, admin @ <span className="font-mono">qspiders-learn.example</span>).
        </span>
      </p>

      <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/courses" className="btn-secondary flex-1 justify-center !py-2.5 text-sm sm:flex-none">
          Browse courses
        </Link>
        <Link
          href="/contact"
          className="btn-ghost inline-flex flex-1 items-center justify-center gap-1 text-sm sm:flex-none"
        >
          Need help? <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
