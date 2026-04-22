import type { Course } from '@/lib/data';
import { COURSES } from '@/lib/data';
import { prisma } from '@/lib/prisma';

function sortCourses(list: Course[]): Course[] {
  return [...list].sort((a, b) => a.title.localeCompare(b.title));
}

async function withCatalogFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error('[catalog] Database unavailable, using static COURSES fallback.', err);
    return fallback;
  }
}

export function rowToCourse(row: {
  slug: string;
  title: string;
  category: string;
  level: string;
  hours: number;
  instructor: string;
  description: string;
  tagsJson: string;
  featured: boolean;
  certPrep: boolean;
}): Course {
  let tags: string[] = [];
  try {
    tags = JSON.parse(row.tagsJson) as string[];
  } catch {
    tags = [];
  }
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    level: row.level as Course['level'],
    hours: row.hours,
    instructor: row.instructor,
    description: row.description,
    tags,
    featured: row.featured || undefined,
    certPrep: row.certPrep || undefined,
  };
}

export async function getAllCoursesFromDb(): Promise<Course[]> {
  return withCatalogFallback(async () => {
    const rows = await prisma.course.findMany({
      where: { publishStatus: 'PUBLISHED' },
      orderBy: { title: 'asc' },
    });
    return rows.map(rowToCourse);
  }, sortCourses(COURSES));
}

export async function getCourseBySlugFromDb(slug: string): Promise<Course | null> {
  return withCatalogFallback(async () => {
    const row = await prisma.course.findFirst({
      where: { slug, publishStatus: 'PUBLISHED' },
    });
    return row ? rowToCourse(row) : null;
  }, COURSES.find((c) => c.slug === slug) ?? null);
}

export async function getFeaturedCoursesFromDb(limit = 4): Promise<Course[]> {
  return withCatalogFallback(async () => {
    const rows = await prisma.course.findMany({
      where: { featured: true, publishStatus: 'PUBLISHED' },
      take: limit,
      orderBy: { title: 'asc' },
    });
    return rows.map(rowToCourse);
  }, sortCourses(COURSES.filter((c) => c.featured).slice(0, limit)));
}
