import Link from 'next/link';
import { Clock, Award, ArrowRight } from 'lucide-react';
import { Course } from '@/lib/data';
import { cn } from '@/lib/utils';

const LEVEL_STYLES: Record<Course['level'], string> = {
  Beginner: 'bg-emerald-500/10 text-emerald-300 ring-emerald-500/20',
  Associate: 'bg-volt-500/10 text-volt-300 ring-volt-500/20',
  Professional: 'bg-ember-500/10 text-ember-300 ring-ember-500/20',
};

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="card-surface group flex h-full flex-col p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="chip">{course.category}</span>
        {course.certPrep && (
          <span className="inline-flex items-center gap-1 rounded-full bg-ember-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ember-300 ring-1 ring-inset ring-ember-500/20">
            <Award size={10} /> Cert Prep
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-tight text-slate-900 transition group-hover:text-ember-300">
        {course.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-slate-400">
        {course.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {course.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-400 ring-1 ring-inset ring-white/5"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 mt-5">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset',
              LEVEL_STYLES[course.level],
            )}
          >
            {course.level}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Clock size={12} /> {course.hours}h
          </span>
        </div>
        <ArrowRight
          size={16}
          className="text-slate-500 transition group-hover:translate-x-0.5 group-hover:text-ember-400"
        />
      </div>
    </Link>
  );
}
