'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TrainerCourseActions({
  courseId,
  publishStatus,
}: {
  courseId: string;
  publishStatus: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const canSubmit = publishStatus === 'DRAFT' || publishStatus === 'REJECTED';

  async function submitForReview() {
    setBusy(true);
    try {
      const r = await fetch(`/api/trainer/courses/${courseId}/submit`, { method: 'POST' });
      if (r.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  if (!canSubmit) return null;

  return (
    <button
      type="button"
      disabled={busy}
      onClick={submitForReview}
      className="btn-secondary shrink-0 text-xs"
    >
      {busy ? '…' : 'Submit for review'}
    </button>
  );
}
