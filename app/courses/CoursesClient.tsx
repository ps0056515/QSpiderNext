'use client';

import { useMemo, useState } from 'react';
import type { Course } from '@/lib/data';
import { CourseCard } from '@/components/ui/CourseCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Testing', 'Development', 'DevOps & Cloud', 'Data & AI', 'Career'];

export function CoursesClient({ initialCourses }: { initialCourses: Course[] }) {
  const [cat, setCat] = useState<string>('All');
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    return initialCourses.filter((c) => {
      const matchesCat = cat === 'All' || c.category === cat;
      const matchesQ =
        !q ||
        c.title.toLowerCase().includes(q.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(q.toLowerCase()));
      return matchesCat && matchesQ;
    });
  }, [cat, q, initialCourses]);

  return (
    <>
      <PageHeader
        eyebrow="All Courses"
        title="Courses built for placement outcomes."
        description="Industry-grade, hands-on training across Testing, Development, DevOps, Cloud, Data, and Career Readiness. Catalog is stored in the database (seed from Prisma)."
      />
      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-xs font-semibold transition',
                    cat === c
                      ? 'bg-ember-500 text-white shadow-[0_6px_20px_-6px_rgba(99,102,241,0.55)]'
                      : 'border border-slate-200 bg-slate-50 text-slate-300 hover:border-slate-300 hover:text-slate-900',
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search courses…"
                className="w-full rounded-md border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-ember-500/50 focus:outline-none focus:ring-2 focus:ring-ember-500/20"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-sm text-slate-500">
              No courses match that search. Try a different keyword.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
