import { INSTRUCTORS } from '@/lib/data';

export function Instructors() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-eyebrow">Leaders Who Teach</p>
            <h2 className="section-heading">
              Mentors from the industry.{' '}
              <span className="text-slate-400">Not lecture halls.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Every course is led by engineers who've built and shipped the systems
              they teach — ex-Amazon, ex-Thoughtworks, ex-Infosys, and more. Real stack,
              real stories, real feedback.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {INSTRUCTORS.map((i) => (
              <div
                key={i.name}
                className="card-surface p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-ember-500 to-ember-700 font-display text-sm font-bold text-white ring-2 ring-ember-500/20">
                    {i.avatar}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {i.name}
                    </h3>
                    <p className="text-xs text-ember-400">{i.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">{i.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
