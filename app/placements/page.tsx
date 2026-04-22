import { GraduationCap, Briefcase, TrendingUp, Building2 } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { STATS, HIRING_PARTNERS, TESTIMONIALS } from '@/lib/data';
import { CTABand } from '@/components/sections/CTABand';

const DEGREES = ['BE / BTech', 'BCA', 'BSc', 'BCom', 'MCA', 'ME / MTech', 'MBA', 'MSc'];
const STREAMS = ['CS', 'IT', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Information Science'];

export default function PlacementsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Placements"
        title="7.5 lakh+ students placed. And counting."
        description="A dedicated placement cell connects our students with top IT employers — from hyperscale service firms to high-growth product startups."
      />

      {/* Stats grid */}
      <section className="pb-10">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="card-surface p-6">
                <p className="font-display text-3xl font-bold text-slate-900">
                  <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
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

      {/* Hiring approach */}
      <section className="py-16">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="section-eyebrow">How it works</p>
              <h2 className="section-heading">A placement pipeline, not a job board.</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                We don't just list openings. We run a structured pipeline that
                prepares candidates technically, grooms them on soft skills, and then
                schedules them into recruitment drives with our partner network.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  {
                    icon: GraduationCap,
                    title: 'Skill certification',
                    desc: 'Course completion + assessments, aligned to hiring criteria.',
                  },
                  {
                    icon: Briefcase,
                    title: 'Mock interviews',
                    desc: 'Technical + HR rounds with real recruiter feedback.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Placement drives',
                    desc: 'Regular on-campus and virtual drives across India.',
                  },
                  {
                    icon: Building2,
                    title: '2,500+ partners',
                    desc: 'From service giants to emerging product companies.',
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <li key={title} className="flex gap-4">
                    <div className="grid h-10 w-10 flex-none place-items-center rounded-md bg-ember-500/10 text-ember-400 ring-1 ring-ember-500/20">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold text-slate-900">
                        {title}
                      </p>
                      <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6">
              <h3 className="font-display text-base font-semibold text-slate-900">
                We place students from all backgrounds
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-slate-500">
                Degrees
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {DEGREES.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-300"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-xs uppercase tracking-[0.15em] text-slate-500">
                Streams
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STREAMS.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring partners */}
      <section className="border-y border-slate-200 bg-slate-100/40 py-14">
        <div className="container-x">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-slate-500">
            Our students work at
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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

      {/* Stories */}
      <section className="py-16">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Student Stories</p>
            <h2 className="section-heading">Real careers. Real outcomes.</h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure key={i} className="card-surface p-6">
                <blockquote className="text-[15px] leading-relaxed text-slate-200">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-display text-sm font-semibold text-slate-900">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-xs text-ember-400">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
