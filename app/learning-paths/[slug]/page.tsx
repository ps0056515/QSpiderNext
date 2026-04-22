import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LEARNING_PATHS } from '@/lib/data';
import {
  getLearningPathExperience,
  getAllPathExperienceSlugs,
  getRelatedPaths,
} from '@/lib/learning-path-details';
import { PageHeader } from '@/components/ui/PageHeader';
import { InteractivePathView, RelatedPathsSection } from '@/components/learning-path/InteractivePathView';
import { LearningPathDirectoryBands } from '@/components/learning-path/LearningPathDirectoryBands';
import { PathEnrollButton } from '@/components/learning-path/PathEnrollButton';

export function generateStaticParams() {
  return getAllPathExperienceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const summary = LEARNING_PATHS.find((p) => p.slug === params.slug);
  const xp = getLearningPathExperience(params.slug);
  if (!summary || !xp) {
    return { title: 'Learning Path' };
  }
  return {
    title: `${summary.title} | QSpiders Learn`,
    description: xp.heroDescription,
  };
}

export default function LearningPathDetailPage({ params }: { params: { slug: string } }) {
  const experience = getLearningPathExperience(params.slug);
  const summary = LEARNING_PATHS.find((p) => p.slug === params.slug);
  if (!experience || !summary) notFound();

  const related = getRelatedPaths(params.slug, 4);

  return (
    <>
      <PageHeader
        eyebrow="Learning Path"
        title={experience.heroTitle}
        description={experience.heroDescription}
      />

      <div className="border-b border-slate-200 bg-slate-50/60">
        <div className="container-x flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/learning-paths"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-900"
          >
            <ArrowLeft size={14} /> All learning paths
          </Link>
          <PathEnrollButton pathSlug={params.slug} />
        </div>
      </div>

      <InteractivePathView experience={experience} summary={summary} />
      <RelatedPathsSection paths={related} />
      <LearningPathDirectoryBands />
    </>
  );
}
