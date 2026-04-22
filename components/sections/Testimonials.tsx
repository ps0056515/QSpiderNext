import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';

export function Testimonials() {
  return (
    <section className="relative py-20 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Student Stories</p>
          <h2 className="section-heading">
            Real careers.{' '}
            <span className="text-slate-400">Real placements.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              className="card-surface flex h-full flex-col p-6"
            >
              <Quote
                size={24}
                className="text-ember-500/40"
                strokeWidth={1.5}
              />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-200">
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
  );
}
