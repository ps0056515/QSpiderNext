import { PageHeader } from '@/components/ui/PageHeader';
import { Instructors } from '@/components/sections/Instructors';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { OFFLINE_CENTERS } from '@/lib/data';
import { MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Training engineers since 2007."
        description="Built by industry practitioners for the next generation of IT talent. Classroom-first in roots, hybrid in delivery, placement-focused in mission."
      />

      <StatsStrip />

      {/* Story */}
      <section className="py-16">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="section-eyebrow">Our Story</p>
            <h2 className="section-heading">From one classroom to ninety centers.</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-300">
              <p>
                What started as a small software testing institute has grown into
                India's most trusted IT training brand — with centers across every
                major tech hub and tens of thousands of students passing through our
                halls every year.
              </p>
              <p>
                The formula hasn't changed: industry-grade instructors, curriculum
                that tracks what companies actually hire for, and a placement cell
                that treats every student as its own goal.
              </p>
              <p>
                What <em>has</em> changed is how we deliver it. Today our programs are
                hybrid — live instruction, hands-on labs, mentor office hours, and
                a digital learning platform that follows you from laptop to phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Instructors />

      {/* Centers */}
      <section className="py-16 border-t border-slate-200">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow">Offline Centers</p>
            <h2 className="section-heading">Find a campus near you.</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OFFLINE_CENTERS.map((c) => (
              <div key={c.city} className="card-surface p-5">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-ember-400" />
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    {c.city}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-slate-400">{c.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
