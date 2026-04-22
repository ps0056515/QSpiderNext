import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { BookOpen, Route } from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { countLessons, flattenLessonNav } from '@/lib/learn';
import { PageHeader } from '@/components/ui/PageHeader';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/dashboard');
  }

  type Row = {
    slug: string;
    title: string;
    done: number;
    total: number;
    nextLessonId: string | null;
  };

  let rows: Row[] = [];
  let pathRows: { slug: string; title: string }[] = [];
  let loadError: string | null = null;

  try {
    const pathEnrollments = await prisma.pathEnrollment.findMany({
      where: { userId: session.user.id },
      include: { path: true },
      orderBy: { enrolledAt: 'desc' },
    });
    pathRows = pathEnrollments.map((p) => ({
      slug: p.path.slug,
      title: p.path.title,
    }));
  } catch {
    /* ignore path errors if DB partial */
  }

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: {
        course: {
          include: {
            modules: {
              orderBy: { order: 'asc' },
              include: { lessons: { orderBy: { order: 'asc' } } },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    rows = await Promise.all(
      enrollments.map(async (e) => {
        const total = countLessons(e.course);
        const done = await prisma.lessonProgress.count({
          where: {
            userId: session.user.id,
            completed: true,
            lesson: { module: { courseId: e.courseId } },
          },
        });
        const nav = flattenLessonNav(
          e.course as Parameters<typeof flattenLessonNav>[0],
        );
        const completedRows = await prisma.lessonProgress.findMany({
          where: {
            userId: session.user.id,
            lesson: { module: { courseId: e.courseId } },
            completed: true,
          },
          select: { lessonId: true },
        });
        const doneIds = new Set(completedRows.map((x) => x.lessonId));
        const nextLessonId =
          nav.find((n) => !doneIds.has(n.id))?.id ?? nav[0]?.id ?? null;
        return {
          slug: e.course.slug,
          title: e.course.title,
          done,
          total,
          nextLessonId,
        };
      }),
    );
  } catch (err) {
    console.error('[dashboard] Failed to load enrollments', err);
    loadError =
      'Could not load your enrollments. Ensure DATABASE_URL is set and the database is migrated (npm run db:push).';
  }

  return (
    <>
      <PageHeader
        eyebrow="Learner"
        title="Your learning"
        description="Courses you are enrolled in and rough completion based on lessons marked complete."
      />
      <section className="pb-24">
        <div className="container-x max-w-3xl space-y-4">
          {loadError ? (
            <div className="card-surface border border-amber-500/20 bg-amber-500/5 p-6 text-sm text-slate-300">
              {loadError}
            </div>
          ) : (
            <>
              {!loadError && rows.length === 0 && pathRows.length === 0 && (
                <div className="card-surface p-8 text-center text-sm text-slate-400">
                  <BookOpen className="mx-auto mb-3 text-slate-500" size={28} />
                  <p>No enrollments yet.</p>
                  <Link href="/courses" className="mt-4 inline-block btn-primary">
                    Browse courses
                  </Link>
                </div>
              )}
              {rows.map((r) => {
                const pct = r.total > 0 ? Math.round((100 * r.done) / r.total) : 0;
                const href =
                  r.nextLessonId != null
                    ? `/learn/${encodeURIComponent(r.slug)}/lessons/${r.nextLessonId}`
                    : `/courses/${encodeURIComponent(r.slug)}`;
                return (
                  <div
                    key={r.slug}
                    className="card-surface flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h2 className="font-display text-lg font-semibold text-slate-900">{r.title}</h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Progress: {r.done}/{r.total} lessons ({pct}%)
                      </p>
                      <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-ember-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <Link href={href} className="btn-primary shrink-0 text-sm">
                      Continue
                    </Link>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
}
