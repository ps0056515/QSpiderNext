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
  BookOpen,
  Clock,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { LEARNING_PATHS } from '@/lib/data';
import { PageHeader } from '@/components/ui/PageHeader';

const ICONS: Record<string, LucideIcon> = {
  Bug, Code2, Cloud, BrainCircuit, Coffee, FileCode, CloudCog, Target,
};

export default function LearningPathsPage() {
  const career = LEARNING_PATHS.filter((p) => p.track === 'Career');
  const topics = LEARNING_PATHS.filter((p) => p.track === 'Topic');

  return (
    <>
      <PageHeader
        eyebrow="Learning Paths"
        title="Guided sequences from zero to hired."
        description="Every path bundles courses, labs, and mentorship into a single, linear roadmap. No guessing what comes next."
      />

      <section className="pb-24">
        <div className="container-x space-y-16">
          <PathGroup id="career-tracks" title="Career Tracks" items={career} />
          <PathGroup id="technology-tracks" title="Technology Tracks" items={topics} />
        </div>
      </section>
    </>
  );
}

function PathGroup({
  id,
  title,
  items,
}: {
  id?: string;
  title: string;
  items: typeof LEARNING_PATHS;
}) {
  return (
    <div id={id}>
      <h2 className="font-display text-2xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => {
          const Icon = ICONS[p.icon] ?? BookOpen;
          return (
            <Link
              key={p.slug}
              href={`/learning-paths/${p.slug}`}
              className="card-surface group relative flex flex-col p-6"
            >
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-gradient-to-br from-ember-500/20 to-ember-600/5 text-ember-400 ring-1 ring-inset ring-ember-500/20">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-slate-900 group-hover:text-ember-300 transition">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{p.description}</p>
              <div className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <BookOpen size={12} /> {p.courseCount} courses
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={12} /> {p.hours}h
                </span>
                <ArrowRight size={14} className="ml-auto text-slate-600 group-hover:translate-x-0.5 group-hover:text-ember-400 transition" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
