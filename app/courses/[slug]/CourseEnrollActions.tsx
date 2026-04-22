'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {
  courseSlug: string;
  firstLessonId: string | null;
  initialEnrolled: boolean;
};

export function CourseEnrollActions({
  courseSlug,
  firstLessonId,
  initialEnrolled,
}: Props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [enrolled, setEnrolled] = useState(initialEnrolled);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setEnrolled(initialEnrolled);
  }, [initialEnrolled]);

  async function onEnroll() {
    if (status === 'loading') return;
    if (!session?.user) {
      router.push(`/login?callbackUrl=/courses/${encodeURIComponent(courseSlug)}`);
      return;
    }
    setBusy(true);
    try {
      const r = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseSlug }),
      });
      if (r.ok) {
        setEnrolled(true);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  const learnHref =
    firstLessonId != null
      ? `/learn/${encodeURIComponent(courseSlug)}/lessons/${firstLessonId}`
      : null;

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {enrolled && learnHref ? (
        <Link href={learnHref} className="btn-primary">
          Continue learning
        </Link>
      ) : (
        <button
          type="button"
          onClick={onEnroll}
          disabled={busy || status === 'loading'}
          className="btn-primary disabled:opacity-60"
        >
          {busy ? 'Enrolling…' : 'Enroll free'}
        </button>
      )}
      <Link href="/contact" className="btn-secondary">
        Download syllabus
      </Link>
    </div>
  );
}
