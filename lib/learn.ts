import { prisma } from '@/lib/prisma';

export async function getCourseWithCurriculum(
  slug: string,
  opts?: { publishedOnly?: boolean },
) {
  const publishedOnly = opts?.publishedOnly !== false;
  try {
    return await prisma.course.findFirst({
      where: publishedOnly ? { slug, publishStatus: 'PUBLISHED' } : { slug },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: { quiz: true },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error('[learn] getCourseWithCurriculum failed', err);
    return null;
  }
}

export function countLessons(course: {
  modules: { lessons: unknown[] }[];
}): number {
  return course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
}

export type LessonNavItem = { id: string; title: string };

export function flattenLessonNav(
  course: NonNullable<Awaited<ReturnType<typeof getCourseWithCurriculum>>>,
): LessonNavItem[] {
  const nav: LessonNavItem[] = [];
  for (const mod of course.modules) {
    for (const les of mod.lessons) {
      nav.push({ id: les.id, title: les.title });
    }
  }
  return nav;
}
