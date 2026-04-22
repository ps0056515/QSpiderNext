import { STATS } from '@/lib/data';

export function StatsStrip() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-100/40">
      <div className="container-x py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
                <span className="bg-gradient-to-b from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  {s.value}
                </span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
