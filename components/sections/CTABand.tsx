import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function CTABand() {
  return (
    <section className="relative py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 via-slate-50 to-white px-6 py-14 sm:px-12 md:px-16">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ember-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-64 w-64 rounded-full bg-volt-500/10 blur-3xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="section-eyebrow">Start today</p>
              <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                Your first day at a top IT company starts{' '}
                <span className="bg-gradient-to-r from-ember-400 to-ember-600 bg-clip-text text-transparent">
                  right here.
                </span>
              </h2>
              <p className="mt-3 max-w-xl text-base text-slate-600">
                Enroll in any course to get live sessions, hands-on labs, and full
                placement support. Free career counselling included.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link href="/courses" className="btn-primary">
                Enroll Now
                <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                <Phone size={14} />
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
