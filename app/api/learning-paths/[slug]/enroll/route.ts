import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

/** Enroll in path and auto-enroll all published courses in the path. */
export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const path = await prisma.learningPath.findFirst({
    where: { slug: params.slug, published: true },
    include: {
      courses: {
        orderBy: { order: 'asc' },
        include: { course: true },
      },
    },
  });

  if (!path) {
    return NextResponse.json({ error: 'Path not found' }, { status: 404 });
  }

  await prisma.pathEnrollment.upsert({
    where: {
      userId_pathId: { userId: session.user.id, pathId: path.id },
    },
    create: { userId: session.user.id, pathId: path.id },
    update: {},
  });

  for (const row of path.courses) {
    if (row.course.publishStatus !== 'PUBLISHED') continue;
    await prisma.enrollment.upsert({
      where: {
        userId_courseId: { userId: session.user.id, courseId: row.courseId },
      },
      create: { userId: session.user.id, courseId: row.courseId },
      update: {},
    });
  }

  return NextResponse.json({ ok: true, pathSlug: path.slug });
}
