import { Hero } from '@/components/sections/Hero';
import { StatsStrip } from '@/components/sections/StatsStrip';
import { FeaturedCourses } from '@/components/sections/FeaturedCourses';
import { LearningPaths } from '@/components/sections/LearningPaths';
import { Instructors } from '@/components/sections/Instructors';
import { Testimonials } from '@/components/sections/Testimonials';
import { HiringPartners } from '@/components/sections/HiringPartners';
import { CTABand } from '@/components/sections/CTABand';
import { getFeaturedCoursesFromDb } from '@/lib/catalog';

export default async function HomePage() {
  const featured = await getFeaturedCoursesFromDb(8);
  return (
    <>
      <Hero />
      <StatsStrip />
      <FeaturedCourses courses={featured} />
      <LearningPaths />
      <HiringPartners />
      <Instructors />
      <Testimonials />
      <CTABand />
    </>
  );
}
