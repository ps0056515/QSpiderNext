'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { LayoutDashboard, LogOut, GraduationCap, Shield } from 'lucide-react';

export function AuthNav() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <span className="hidden w-16 sm:inline-block" aria-hidden />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
      >
        Sign in
      </Link>
    );
  }

  const role = session.user.role;

  return (
    <div className="hidden items-center gap-2 sm:flex">
      {(role === 'TRAINER' || role === 'ADMIN') && (
        <Link
          href="/trainer"
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
        >
          <GraduationCap size={14} />
          Trainer
        </Link>
      )}
      {role === 'ADMIN' && (
        <Link
          href="/admin/review"
          className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
        >
          <Shield size={14} />
          Review
        </Link>
      )}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900"
      >
        <LayoutDashboard size={14} />
        Dashboard
      </Link>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/' })}
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900"
      >
        <LogOut size={14} />
        Sign out
      </button>
    </div>
  );
}
