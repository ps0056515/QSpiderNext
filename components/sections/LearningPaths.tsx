import Link from 'next/link';
import {
  Bug,
  Code2,
  Cloud,
  BrainCircuit,
  Coffee,
  FileCode,
  CloudCog,
  Target,
  ArrowRight,
  BookOpen,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { LEARNING_PATHS } from '@/lib/data';

const ICONS: Record<string, LucideIcon> = {
  Bug, Code2, Cloud, BrainCircuit, Coffee, FileCode, CloudCog, Target,
};

export function LearningPaths() {
  return (
    <section className="relative py-20 md:py-24">
      {/* Decorative background */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Guided Learning Paths</p>
          <h2 className="section-heading">Pick your destination. We'll map the route.</h2>
          <p className="mt-3 text-sm text-slate-400">
            Structured sequences that take you from fundamentals to job-ready in the
            shortest path possible.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEARNING_PATHS.map((path) => {
            const Icon = ICONS[path.icon] ?? BookOpen;
            return (
              <Link
                key={path.slug}
                href={`/learning-paths/${path.slug}`}
                className="card-surface group relative flex flex-col p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-ember-500/20 to-ember-600/5 text-ember-400 ring-1 ring-inset ring-ember-500/20">
                    <Icon size={20} />
                  </div>
                  <span className="chip">{path.track}</span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 group-hover:text-ember-300 transition">
                  {path.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                  {path.description}
                </p>

                <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <BookOpen size={12} /> {path.courseCount} courses
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {path.hours}h
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="absolute right-6 top-6 text-slate-600 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
