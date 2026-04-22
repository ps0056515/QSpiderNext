'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function AdminReviewActions({ courseId }: { courseId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function publish() {
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/courses/${courseId}/publish`, { method: 'POST' });
      if (r.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function reject() {
    const reason = window.prompt('Rejection reason for the trainer:', 'Please add more lesson content.');
    if (reason === null) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/courses/${courseId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      if (r.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" disabled={busy} onClick={publish} className="btn-primary text-sm">
        Publish
      </button>
      <button type="button" disabled={busy} onClick={reject} className="btn-secondary text-sm">
        Reject
      </button>
    </div>
  );
}
