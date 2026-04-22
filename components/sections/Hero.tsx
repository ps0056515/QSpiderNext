import Link from 'next/link';
import { Play, ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* background layers */}
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern [background-size:52px_52px] opacity-30 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

      <div className="container-x relative pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-ember-500/35 bg-ember-500/[0.07] px-4 py-1.5 text-xs font-medium text-ember-800 backdrop-blur">
            <Sparkles size={12} />
            <span>New: Gen-AI career track now open for enrollment</span>
          </div>

          {/* Headline */}
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Learn. Build. Get{' '}
            <span className="relative whitespace-nowrap">
              <span className="bg-gradient-to-r from-ember-400 via-ember-500 to-ember-600 bg-clip-text text-transparent">
                Placed.
              </span>
              <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-ember-400/0 via-ember-500 to-ember-400/0" />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
            Industry-grade training in Software Testing, Full Stack, DevOps, Cloud, and
            Data Science. Hands-on labs, live mentors, and a placement cell trusted by
            2,500+ companies.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/courses" className="btn-primary w-full sm:w-auto">
              Explore Courses
              <ArrowRight size={16} />
            </Link>
            <Link href="/placements" className="btn-secondary w-full sm:w-auto">
              <Play size={14} />
              View Placements
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-slate-500">
            7,50,000+ students placed · 2,500+ hiring partners · 90+ centers
          </p>
        </div>

        {/* Hero code/terminal visual */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="gradient-border rounded-xl border border-slate-200 bg-white p-1 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-lg bg-slate-50">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100/80 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 font-mono text-[11px] text-slate-500">
                  qspiders-learn · devops-lab · bash
                </span>
              </div>
              {/* Terminal body */}
              <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-7 text-slate-700">
                <Line prompt>kubectl get pods -n placement-pipeline</Line>
                <Line muted>NAME                         READY  STATUS    RESTARTS</Line>
                <Line muted>selenium-runner-7b8c-4d9x     1/1    Running   0</Line>
                <Line muted>jenkins-build-5fd2-lk21       1/1    Running   0</Line>
                <Line muted>spring-boot-api-9a7d-m8wq     1/1    Running   0</Line>
                <Line prompt>./run-interview-sim.sh --role "SDET"</Line>
                <Line highlight>✓ Mock round cleared. Placement-ready.</Line>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({
  children,
  prompt,
  muted,
  highlight,
}: {
  children: React.ReactNode;
  prompt?: boolean;
  muted?: boolean;
  highlight?: boolean;
}) {
  if (prompt) {
    return (
      <div>
        <span className="text-ember-600">➜</span>{' '}
        <span className="text-amber-700">~/learn</span>{' '}
        <span className="text-slate-800">{children}</span>
      </div>
    );
  }
  if (highlight) {
    return <div className="text-emerald-400">{children}</div>;
  }
  return <div className={muted ? 'text-slate-500' : 'text-slate-700'}>{children}</div>;
}
