import Link from 'next/link';
import { ArrowRight, Building2, Zap, Layers, ShieldCheck, LineChart } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function CorporatePage() {
  const pillars = [
    {
      icon: Zap,
      title: 'Custom cohort design',
      desc: 'We map your stack, team skill-gaps, and timelines into a bespoke program.',
    },
    {
      icon: Layers,
      title: 'Blended delivery',
      desc: 'Live instructor sessions + hands-on labs + self-paced modules in one flow.',
    },
    {
      icon: ShieldCheck,
      title: 'Outcome-based assessments',
      desc: 'Pre/post skill benchmarks and graded capstones you can show leadership.',
    },
    {
      icon: LineChart,
      title: 'Dedicated success manager',
      desc: 'Single point of contact with weekly progress reports and feedback loops.',
    },
  ];

  const technologies = [
    'Java / Spring Boot', 'Python', 'React / Next.js', 'Node.js',
    'AWS / Azure / GCP', 'Kubernetes', 'Docker', 'Terraform',
    'CI/CD · Jenkins', 'Selenium · Playwright', 'SQL / NoSQL',
    'Data Engineering', 'ML / GenAI', 'Security Fundamentals',
  ];

  return (
    <>
      <PageHeader
        eyebrow="For Business"
        title="Upskill your engineering team. Outcome-first."
        description="Custom cohorts for enterprise engineering teams — from fresh-hire onboarding to deep-specialization tracks."
      />

      <section className="pb-12">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-surface p-6">
                <div className="grid h-10 w-10 place-items-center rounded-md bg-ember-500/10 text-ember-400 ring-1 ring-ember-500/20">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="section-eyebrow">Technologies</p>
              <h2 className="section-heading">A catalog as wide as your roadmap.</h2>
              <p className="mt-4 text-sm text-slate-400">
                Over 100+ technologies, taught by practitioners who've built and
                shipped them in production.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="card-surface p-8">
              <Building2 size={20} className="text-ember-400" />
              <h3 className="mt-4 font-display text-xl font-semibold text-slate-900">
                Let's design your cohort.
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Share your team size, current stack, and target outcomes. We'll come
                back with a proposal inside 48 hours.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                  Onboarding academies for fresh graduates
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                  Reskilling programs for mid-level engineers
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember-400" />
                  Leadership tracks for tech leads and architects
                </li>
              </ul>
              <Link href="/contact" className="btn-primary mt-8 w-full sm:w-auto">
                Talk to Sales
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
