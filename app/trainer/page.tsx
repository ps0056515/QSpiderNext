import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Plus } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isTrainer } from '@/lib/permissions';
import { PageHeader } from '@/components/ui/PageHeader';
import { TrainerCourseActions } from '@/components/trainer/TrainerCourseActions';

export default async function TrainerHomePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isTrainer(session.user.role)) {
    redirect('/');
  }

  const courses = await prisma.course.findMany({
    where: { trainerId: session.user.id },
    orderBy: { title: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      publishStatus: true,
      hours: true,
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Trainer"
        title="Your courses"
        description="Create drafts, submit for review, and manage content. Admins publish to the catalog."
      />
      <section className="pb-24">
        <div className="container-x max-w-4xl">
          <div className="mb-6 flex justify-end">
            <Link href="/trainer/courses/new" className="btn-primary inline-flex items-center gap-2 text-sm">
              <Plus size={16} /> New course
            </Link>
          </div>
          <div className="space-y-3">
            {courses.length === 0 ? (
              <p className="text-sm text-slate-500">No courses yet. Create your first draft.</p>
            ) : (
              courses.map((c) => (
                <div
                  key={c.id}
                  className="card-surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900">{c.title}</p>
                    <p className="text-xs text-slate-500">
                      {c.slug} · {c.hours}h ·{' '}
                      <span className="uppercase tracking-wide text-slate-400">{c.publishStatus}</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <TrainerCourseActions courseId={c.id} publishStatus={c.publishStatus} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
