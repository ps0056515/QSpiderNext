import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/data';
import { CourseCard } from '@/components/ui/CourseCard';

export function FeaturedCourses({ courses }: { courses: Course[] }) {
  const featured = courses;
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Popular Courses</p>
            <h2 className="section-heading">
              Skills, careers, and certifications —{' '}
              <span className="text-slate-400">all in one place.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-400">
              Browse top courses, guided learning paths, and career tracks designed
              around what hiring companies actually ask for.
            </p>
          </div>
          <Link href="/courses" className="btn-ghost">
            Explore all courses <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.length === 0 ? (
            <p className="col-span-full text-center text-sm text-slate-500">
              No featured courses in the database yet. Run{' '}
              <code className="font-mono text-slate-400">npm run db:seed</code>.
            </p>
          ) : (
            featured.map((c) => <CourseCard key={c.slug} course={c} />)
          )}
        </div>
      </div>
    </section>
  );
}
