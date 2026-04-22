import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/permissions';
import { PageHeader } from '@/components/ui/PageHeader';
import { AdminReviewActions } from './AdminReviewActions';

export default async function AdminReviewPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isAdmin(session.user.role)) {
    redirect('/');
  }

  const pending = await prisma.course.findMany({
    where: { publishStatus: 'PENDING_REVIEW' },
    orderBy: { title: 'asc' },
    include: { trainer: { select: { email: true, name: true } } },
  });

  return (
    <>
      <PageHeader
        eyebrow="Admin"
        title="Course review queue"
        description="Publish or reject trainer submissions. Rejected courses return to the trainer with a reason."
      />
      <section className="pb-24">
        <div className="container-x max-w-4xl space-y-4">
          {pending.length === 0 ? (
            <p className="text-sm text-slate-500">No courses pending review.</p>
          ) : (
            pending.map((c) => (
              <div key={c.id} className="card-surface space-y-3 p-5">
                <div>
                  <p className="font-display font-semibold text-slate-900">{c.title}</p>
                  <p className="text-xs text-slate-500">
                    {c.slug} · Trainer: {c.trainer?.name ?? c.trainer?.email ?? '—'}
                  </p>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-3">{c.description}</p>
                </div>
                <AdminReviewActions courseId={c.id} />
              </div>
            ))
          )}
          <p className="text-center text-xs text-slate-600">
            <Link href="/" className="text-ember-400 hover:underline">
              Home
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
