import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { flattenLessonNav, getCourseWithCurriculum } from '@/lib/learn';
import { LessonViewer } from '@/components/learn/LessonViewer';

export default async function LearnLessonPage({
  params,
}: {
  params: { courseSlug: string; lessonId: string };
}) {
  const course = await getCourseWithCurriculum(params.courseSlug);
  if (!course) notFound();

  let lesson: (typeof course.modules)[0]['lessons'][0] | undefined;
  for (const mod of course.modules) {
    const hit = mod.lessons.find((l) => l.id === params.lessonId);
    if (hit) {
      lesson = hit;
      break;
    }
  }
  if (!lesson) notFound();

  const nav = flattenLessonNav(course);

  return (
    <section className="pb-24 pt-10">
      <div className="container-x max-w-3xl">
        <Link
          href={`/courses/${encodeURIComponent(params.courseSlug)}`}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-900"
        >
          <ArrowLeft size={12} /> Course overview
        </Link>
        <div className="mt-6">
          <LessonViewer
            courseSlug={params.courseSlug}
            lessonId={lesson.id}
            title={lesson.title}
            contentType={lesson.contentType}
            videoUrl={lesson.videoUrl}
            bodyMd={lesson.bodyMd}
            quizId={lesson.quizId}
            questionsJson={lesson.quiz?.questionsJson ?? null}
            nav={nav}
          />
        </div>
      </div>
    </section>
  );
}
