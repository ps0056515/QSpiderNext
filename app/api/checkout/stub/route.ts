import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { courseSlug?: string; pathSlug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  let courseId: string | null = null;
  const slug = body.courseSlug?.trim();
  if (slug) {
    const course = await prisma.course.findFirst({
      where: { slug, publishStatus: 'PUBLISHED' },
    });
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    courseId = course.id;
  }

  let learningPathId: string | null = null;
  const pathSlug = body.pathSlug?.trim();
  if (pathSlug) {
    const path = await prisma.learningPath.findUnique({ where: { slug: pathSlug } });
    if (!path) {
      return NextResponse.json({ error: 'Path not found' }, { status: 404 });
    }
    learningPathId = path.id;
  }

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      courseId,
      learningPathId,
      amountPaise: 0,
      status: 'DRAFT',
      provider: 'stub',
    },
  });

  return NextResponse.json({ orderId: order.id, status: order.status });
}
