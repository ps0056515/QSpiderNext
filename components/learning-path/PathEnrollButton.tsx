'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export function PathEnrollButton({ pathSlug }: { pathSlug: string }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onEnroll() {
    if (status === 'loading') return;
    if (!session?.user) {
      router.push(`/login?callbackUrl=/learning-paths/${encodeURIComponent(pathSlug)}`);
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const r = await fetch(`/api/learning-paths/${encodeURIComponent(pathSlug)}/enroll`, {
        method: 'POST',
      });
      const data = await r.json().catch(() => ({}));
      if (r.ok) {
        setMsg('Enrolled — courses in this path are now in your dashboard.');
        router.refresh();
      } else {
        setMsg((data as { error?: string }).error ?? 'Could not enroll.');
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <button type="button" onClick={onEnroll} disabled={busy} className="btn-primary text-sm">
        {busy ? 'Enrolling…' : 'Enroll in this path'}
      </button>
      {msg && <p className="text-xs text-slate-400">{msg}</p>}
    </div>
  );
}
