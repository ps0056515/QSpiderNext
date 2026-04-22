import { HIRING_PARTNERS } from '@/lib/data';

export function HiringPartners() {
  return (
    <section className="relative border-y border-slate-200 bg-slate-100/40 py-14">
      <div className="container-x">
        <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500">
          Trusted by 2,500+ hiring partners
        </p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {HIRING_PARTNERS.map((p) => (
            <div
              key={p}
              className="flex items-center justify-center rounded-md border border-slate-100 bg-slate-50 px-4 py-3 text-center font-display text-sm font-semibold text-slate-400 transition hover:border-ember-500/20 hover:text-slate-900"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
