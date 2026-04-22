'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';

export function CheckoutForm({
  initialCourseSlug,
  initialPathSlug,
}: {
  initialCourseSlug: string;
  initialPathSlug: string;
}) {
  const [courseSlug, setCourseSlug] = useState(initialCourseSlug);
  const [pathSlug, setPathSlug] = useState(initialPathSlug);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const r = await fetch('/api/checkout/stub', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseSlug: courseSlug.trim() || undefined,
          pathSlug: pathSlug.trim() || undefined,
        }),
      });
      const data = await r.json();
      if (r.ok) {
        setStatus(`Order ${data.orderId} created (${data.status}).`);
      } else {
        setStatus(data.error ?? 'Request failed');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Commerce (stub)"
        title="Checkout"
        description="Creates a draft order in the database. No payment provider is integrated."
      />
      <section className="pb-24">
        <div className="container-x max-w-md">
          <form onSubmit={onSubmit} className="card-surface space-y-4 p-6">
            <div>
              <label htmlFor="slug" className="text-xs font-semibold text-slate-400">
                Course slug (optional)
              </label>
              <input
                id="slug"
                value={courseSlug}
                onChange={(e) => setCourseSlug(e.target.value)}
                placeholder="e.g. manual-software-testing"
                className="mt-1.5 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
              />
            </div>
            <div>
              <label htmlFor="pathSlug" className="text-xs font-semibold text-slate-400">
                Learning path slug (optional)
              </label>
              <input
                id="pathSlug"
                value={pathSlug}
                onChange={(e) => setPathSlug(e.target.value)}
                placeholder="e.g. software-testing-engineer"
                className="mt-1.5 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500"
              />
            </div>
            {status && (
              <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-300">
                {status}
              </p>
            )}
            <button type="submit" disabled={busy} className="btn-primary w-full">
              {busy ? 'Placing order…' : 'Place stub order'}
            </button>
            <p className="text-center text-xs text-slate-500">
              <Link href="/courses" className="text-ember-400 hover:underline">
                Cancel
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
