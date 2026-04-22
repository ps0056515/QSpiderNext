import Link from 'next/link';
import { LEARNING_PATHS } from '@/lib/data';

export function LearningPathDirectoryBands() {
  const topics = LEARNING_PATHS.filter((p) => p.track === 'Topic');
  const careers = LEARNING_PATHS.filter((p) => p.track === 'Career');

  return (
    <section className="border-t border-slate-200 py-14 md:py-20">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Topic-based learning paths</h2>
          <p className="mt-2 text-sm text-slate-400">
            Deep stacks on a single technology family — ideal when you already know your toolchain.
          </p>
          <ul className="mt-6 space-y-2">
            {topics.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/learning-paths/${p.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-300 transition hover:border-volt-500/30 hover:bg-slate-100 hover:text-slate-900"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="text-xs text-volt-400 opacity-0 transition group-hover:opacity-100">Open</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/learning-paths#technology-tracks" className="btn-ghost mt-4 !text-xs">
            View all technology tracks
          </Link>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-slate-900 md:text-2xl">Role-based learning paths</h2>
          <p className="mt-2 text-sm text-slate-400">
            End-to-end roadmaps named after job titles — closer to how hiring managers think about readiness.
          </p>
          <ul className="mt-6 space-y-2">
            {careers.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/learning-paths/${p.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-300 transition hover:border-ember-500/30 hover:bg-slate-100 hover:text-slate-900"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="text-xs text-ember-300 opacity-0 transition group-hover:opacity-100">Open</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/learning-paths#career-tracks" className="btn-ghost mt-4 !text-xs">
            View all career tracks
          </Link>
        </div>
      </div>
    </section>
  );
}
