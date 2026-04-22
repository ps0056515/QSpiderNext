import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import {
  Clock,
  Award,
  CheckCircle2,
  ArrowLeft,
  Users,
  BookOpen,
  Target,
} from 'lucide-react';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { rowToCourse } from '@/lib/catalog';
import { countLessons, flattenLessonNav, getCourseWithCurriculum } from '@/lib/learn';
import { COURSES } from '@/lib/data';
import { CourseCard } from '@/components/ui/CourseCard';
import { CourseEnrollActions } from './CourseEnrollActions';

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const full = await getCourseWithCurriculum(params.slug);
  if (!full) notFound();

  const course = rowToCourse(full);
  const session = await getServerSession(authOptions);

  let enrolled = false;
  if (session?.user?.id) {
    const e = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId: session.user.id, courseId: full.id },
      },
    });
    enrolled = !!e;
  }

  const nav = flattenLessonNav(full);
  const firstLessonId = nav[0]?.id ?? null;
  const totalLessons = countLessons(full);

  const allInCategory = await prisma.course.findMany({
    where: {
      category: course.category,
      publishStatus: 'PUBLISHED',
      NOT: { slug: course.slug },
    },
    take: 6,
    orderBy: { title: 'asc' },
  });
  const related = allInCategory.map(rowToCourse).slice(0, 3);

  const outcomes = [
    `Build working ${course.category.toLowerCase()} projects from scratch`,
    'Pass aptitude + technical rounds at service and product companies',
    'Earn a course completion certificate recognized by 2,500+ hiring partners',
    'Get personalized mentor feedback on mock interviews and assignments',
  ];

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="container-x relative pt-10 pb-16 md:pt-14 md:pb-20">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-900"
          >
            <ArrowLeft size={12} /> Back to all courses
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip">{course.category}</span>
                <span className="chip">{course.level}</span>
                {course.certPrep && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-ember-500/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-ember-300 ring-1 ring-inset ring-ember-500/20">
                    <Award size={11} /> Cert Prep
                  </span>
                )}
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={14} /> {course.hours} hours of content
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users size={14} /> Trainer: {course.instructor}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen size={14} /> {full.modules.length} modules · {totalLessons} lessons
                </span>
              </div>

              <CourseEnrollActions
                courseSlug={course.slug}
                firstLessonId={firstLessonId}
                initialEnrolled={enrolled}
              />
            </div>

            <aside className="lg:mt-6">
              <div className="card-surface sticky top-24 p-6">
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  What you&apos;ll achieve
                </h3>
                <ul className="mt-4 space-y-3">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 flex-none text-ember-400"
                      />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-5">
                  {course.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-400 ring-1 ring-inset ring-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="section-eyebrow">Curriculum</p>
            <h2 className="font-display text-3xl font-bold text-slate-900">
              A structured path from day 1 to day placed.
            </h2>

            <ol className="mt-10 space-y-6">
              {full.modules.map((mod, mi) => (
                <li key={mod.id}>
                  <div className="flex items-start gap-3">
                    <span className="grid h-9 w-9 flex-none place-items-center rounded-md bg-ember-500/10 font-mono text-sm font-semibold text-ember-300 ring-1 ring-ember-500/20">
                      {String(mi + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-semibold text-slate-900">{mod.title}</p>
                      <ul className="mt-3 space-y-2 border-l border-slate-200 pl-4">
                        {mod.lessons.map((les) => (
                          <li key={les.id} className="text-sm text-slate-400">
                            <span className="text-slate-300">{les.title}</span>
                            <span className="ml-2 text-[11px] uppercase tracking-wide text-slate-500">
                              {les.contentType}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-slate-200 py-16">
          <div className="container-x">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-ember-400" />
              <h2 className="font-display text-xl font-semibold text-slate-900">
                Related courses
              </h2>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
