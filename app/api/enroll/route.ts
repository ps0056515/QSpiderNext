import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { courseSlug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const slug = body.courseSlug?.trim();
  if (!slug) {
    return NextResponse.json({ error: 'courseSlug required' }, { status: 400 });
  }

  const course = await prisma.course.findFirst({
    where: { slug, publishStatus: 'PUBLISHED' },
  });
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: { userId: session.user.id, courseId: course.id },
    },
    create: { userId: session.user.id, courseId: course.id },
    update: {},
  });

  return NextResponse.json({ ok: true, courseSlug: slug });
}
