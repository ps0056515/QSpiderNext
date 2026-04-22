'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Play,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDuration } from '@/lib/learning-path-details';
import type { LearningPathExperience, PathCourseNode, PathStage } from '@/lib/learning-path-details';
import type { LearningPath } from '@/lib/data';

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? '?';
  const b = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : (parts[0]?.[1] ?? '');
  return (a + b).toUpperCase();
}

function storageKey(slug: string) {
  return `qsl-lp-${slug}-done`;
}

function readDone(slug: string): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(storageKey(slug));
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function writeDone(slug: string, set: Set<string>) {
  localStorage.setItem(storageKey(slug), JSON.stringify([...set]));
}

type Props = {
  experience: LearningPathExperience;
  summary: LearningPath;
};

const HOURS_OPTIONS = [2, 4, 6] as const;

export function InteractivePathView({ experience, summary }: Props) {
  const [knowledgeId, setKnowledgeId] = useState(experience.knowledgeFilters[0]?.id ?? 'none');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [hoursPerDay, setHoursPerDay] = useState<(typeof HOURS_OPTIONS)[number]>(2);
  const [done, setDone] = useState<Set<string>>(new Set());

  useEffect(() => {
    setDone(readDone(experience.slug));
  }, [experience.slug]);

  const filter = experience.knowledgeFilters.find((f) => f.id === knowledgeId) ?? experience.knowledgeFilters[0];

  const visibleStages: PathStage[] = useMemo(() => {
    if (!filter) return experience.stages;
    const hide = new Set(filter.hideStageIds);
    return experience.stages.filter((s) => !hide.has(s.id));
  }, [experience.stages, filter]);

  const flatCourses: PathCourseNode[] = useMemo(
    () => visibleStages.flatMap((s) => s.courses),
    [visibleStages],
  );

  const totalMinutes = useMemo(
    () => flatCourses.reduce((acc, c) => acc + c.durationMinutes, 0),
    [flatCourses],
  );

  const totalHours = totalMinutes / 60;

  const monthEstimate = useMemo(() => {
    const studyHoursPerMonth = hoursPerDay * 22;
    if (studyHoursPerMonth <= 0) return null;
    const months = totalHours / studyHoursPerMonth;
    if (months < 0.35) return 'A few weeks';
    if (months < 1.1) return '~1 month';
    if (months < 2.2) return '~1–2 months';
    if (months < 3.3) return '~2–3 months';
    if (months < 5) return '~3–4 months';
    return `~${Math.round(months)} months`;
  }, [hoursPerDay, totalHours]);

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDone = useCallback(
    (id: string) => {
      setDone((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        writeDone(experience.slug, next);
        return next;
      });
    },
    [experience.slug],
  );

  const completedCount = useMemo(() => flatCourses.filter((c) => done.has(c.id)).length, [done, flatCourses]);

  return (
    <div className="pb-24">
      {/* Controls: I know… */}
      <section className="border-b border-slate-200 bg-slate-100/40">
        <div className="container-x py-8 md:py-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">I know</p>
              <p className="mt-1 text-sm text-slate-400">
                Adjust the map to your starting point — early modules hide so the route matches your level.
              </p>
            </div>
            <div
              className="inline-flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50/80 p-1 shadow-inner"
              role="tablist"
              aria-label="Starting knowledge"
            >
              {experience.knowledgeFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={knowledgeId === f.id}
                  onClick={() => setKnowledgeId(f.id)}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-semibold transition',
                    knowledgeId === f.id
                      ? 'bg-white text-ink-950 shadow'
                      : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900',
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <BookOpen size={14} className="text-volt-500" />
              {summary.courseCount} catalog courses in track
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-ember-400" />
              Visible nodes: {formatDuration(totalMinutes)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-400/90" />
              Your progress: {completedCount}/{flatCourses.length} nodes
            </span>
          </div>
        </div>
      </section>

      {/* Path tree */}
      <section className="container-x pt-12 md:pt-16">
        <div className="relative mx-auto max-w-3xl">
          {/* vertical spine */}
          <div
            className="pointer-events-none absolute left-[1.125rem] top-8 bottom-24 w-px bg-gradient-to-b from-volt-500/50 via-ember-500/30 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden
          />

          <div className="space-y-14 md:space-y-20">
            {visibleStages.map((stage, si) => (
              <div key={stage.id} className="relative">
                <StageHeader stage={stage} index={si} />
                <div className="mt-8 space-y-8 md:mt-10 md:space-y-10">
                  {stage.courses.map((course) => (
                    <CourseNode
                      key={course.id}
                      course={course}
                      expanded={!!expanded[course.id]}
                      onToggleDetails={() => toggleExpanded(course.id)}
                      completed={done.has(course.id)}
                      onToggleDone={() => toggleDone(course.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Time commitment calculator */}
      <section className="container-x mt-20 md:mt-24">
        <div className="card-surface relative overflow-hidden p-6 md:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-volt-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-ember-500/10 blur-3xl" />
          <div className="relative">
            <p className="section-eyebrow">How long will it take for me to complete?</p>
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">I can spend</h2>
            <p className="mt-2 text-sm text-slate-400">Hours per study day (typical focused blocks).</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {HOURS_OPTIONS.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHoursPerDay(h)}
                  className={cn(
                    'min-w-[4.5rem] rounded-lg border px-4 py-2.5 text-sm font-bold transition',
                    hoursPerDay === h
                      ? 'border-volt-400/60 bg-volt-500/15 text-volt-100 shadow-[0_0_24px_-8px_rgba(245,158,11,0.4)]'
                      : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-slate-300 hover:text-slate-900',
                  )}
                >
                  {h}h / day
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50/60 px-5 py-6">
              <p className="text-sm text-slate-400">Approximate calendar time for visible nodes</p>
              <p className="mt-2 font-display text-3xl font-bold text-slate-900 md:text-4xl">{monthEstimate}</p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Based on ~22 study days per month at {hoursPerDay}h/day. Actual pace varies with prior experience,
                assignment load, and center schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Readiness / promo */}
      {(experience.readinessTitle || experience.readinessDescription) && (
        <section className="container-x mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-ember-500/25 bg-gradient-to-br from-ember-500/10 via-slate-100/80 to-volt-500/10 p-6 md:p-10">
            <Sparkles className="absolute right-6 top-6 h-8 w-8 text-ember-400/40" />
            {experience.readinessEyebrow && (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember-300">{experience.readinessEyebrow}</p>
            )}
            {experience.readinessTitle && (
              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">{experience.readinessTitle}</h2>
            )}
            {experience.readinessDescription && (
              <p className="mt-3 max-w-2xl text-sm text-slate-300">{experience.readinessDescription}</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary !py-2.5 text-sm">
                Talk to a counselor
              </Link>
              <Link href="/courses" className="btn-secondary !py-2.5 text-sm">
                Browse all courses
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {experience.faqs.length > 0 && (
        <section className="container-x mt-16 md:mt-20">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQs</h2>
          <div className="mt-6 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-slate-100/40">
            {experience.faqs.map((faq) => (
              <details key={faq.question} className="group px-4 py-1 md:px-5">
                <summary className="cursor-pointer list-none py-4 font-medium text-slate-200 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-3">
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className="shrink-0 text-slate-500 transition group-open:rotate-180"
                    />
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-slate-400">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StageHeader({ stage, index }: { stage: PathStage; index: number }) {
  return (
    <div className="relative flex justify-center md:justify-center">
      <div
        className={cn(
          'relative z-[1] w-full max-w-xl rounded-xl px-4 py-4 text-center md:px-6 md:py-5',
          'bg-gradient-to-b from-slate-100 to-white shadow-[0_0_60px_-12px_rgba(139,92,246,0.35)]',
          'ring-1 ring-inset ring-volt-400/30',
        )}
      >
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500/15 via-transparent to-volt-500/15" />
        <p className="relative text-[11px] font-semibold uppercase tracking-[0.25em] text-volt-300/90">
          Stage {index + 1}
        </p>
        <h2 className="relative mt-2 font-display text-lg font-bold leading-snug text-slate-900 md:text-xl">
          {stage.title}
        </h2>
        {stage.subtitle && (
          <p className="relative mt-2 text-sm text-slate-400">{stage.subtitle}</p>
        )}
      </div>
    </div>
  );
}

function CourseNode({
  course,
  expanded,
  onToggleDetails,
  completed,
  onToggleDone,
}: {
  course: PathCourseNode;
  expanded: boolean;
  onToggleDetails: () => void;
  completed: boolean;
  onToggleDone: () => void;
}) {
  return (
    <div className="relative pl-12 md:pl-0">
      {/* node dot on spine */}
      <div className="absolute left-0 top-8 z-[1] flex h-9 w-9 items-center justify-center md:left-1/2 md:-translate-x-1/2">
        <span
          className={cn(
            'h-3.5 w-3.5 rounded-full border-2 shadow-lg',
            completed
              ? 'border-emerald-400 bg-emerald-500/80 shadow-emerald-500/40'
              : 'border-volt-400/80 bg-slate-50 shadow-volt-500/30',
          )}
        />
      </div>

      <article
        className={cn(
          'card-surface relative ml-0 overflow-hidden md:mx-auto md:max-w-xl',
          completed && 'border-emerald-500/25',
        )}
      >
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-stretch sm:gap-5 sm:p-5">
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-violet-600/30 via-slate-200 to-volt-600/20 sm:aspect-auto sm:h-28 sm:w-40">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.45),transparent_55%)]" />
            <div className="absolute bottom-2 left-2 flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-slate-50/80 text-xs font-bold text-slate-900 shadow-lg">
              {initials(course.instructor)}
            </div>
            {course.certPrep && (
              <span className="absolute right-2 top-2 rounded bg-ember-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Cert prep
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="font-display text-base font-semibold leading-snug text-slate-900 md:text-lg">
                {course.title}
              </h3>
              <span className="shrink-0 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-300">
                {formatDuration(course.durationMinutes)}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Instructor · {course.instructor}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {course.courseSlug ? (
                <Link
                  href={`/courses/${course.courseSlug}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20 text-violet-200 ring-1 ring-inset ring-violet-400/30 transition hover:bg-violet-500/30 hover:text-slate-900"
                  aria-label={`Start learning ${course.title}`}
                >
                  <Play size={18} className="translate-x-0.5" fill="currentColor" />
                </Link>
              ) : (
                <span
                  className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200"
                  title="Enroll to unlock streaming access"
                >
                  <Play size={18} className="translate-x-0.5" />
                </span>
              )}

              {course.externalUrl ? (
                <a
                  href={course.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-300 ring-1 ring-inset ring-slate-200 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Open external resource"
                >
                  <ExternalLink size={17} />
                </a>
              ) : null}

              <button
                type="button"
                onClick={onToggleDetails}
                className="btn-ghost !text-sm !font-semibold"
              >
                {expanded ? 'Hide details' : 'More details'}
              </button>

              <button
                type="button"
                onClick={onToggleDone}
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-300 transition"
              >
                {completed ? (
                  <>
                    <CheckCircle2 size={16} className="text-emerald-400" /> Done
                  </>
                ) : (
                  <>
                    <Circle size={16} /> Mark done
                  </>
                )}
              </button>
            </div>

            {expanded && (
              <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-300">
                {course.topics.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt-500/80" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </article>
    </div>
  );
}

export function RelatedPathsSection({ paths }: { paths: LearningPath[] }) {
  if (paths.length === 0) return null;
  return (
    <section className="border-t border-slate-200 bg-slate-100/30 py-16 md:py-20">
      <div className="container-x">
        <h2 className="font-display text-2xl font-bold text-slate-900">More learning paths</h2>
        <p className="mt-2 text-sm text-slate-400">Topic and career maps you can switch to without losing momentum.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <Link
              key={p.slug}
              href={`/learning-paths/${p.slug}`}
              className="card-surface flex flex-col p-5 transition"
            >
              <span className="chip w-fit">{p.track}</span>
              <h3 className="mt-3 font-display text-base font-semibold text-slate-900">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-xs text-slate-500">{p.description}</p>
              <span className="mt-4 text-xs font-semibold text-volt-400">View path →</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/learning-paths" className="btn-secondary !py-2.5 text-sm">
            All learning paths
          </Link>
        </div>
      </div>
    </section>
  );
}
