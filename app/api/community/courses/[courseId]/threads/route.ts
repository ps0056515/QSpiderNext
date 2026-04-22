import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: Request,
  { params }: { params: { courseId: string } },
) {
  const threads = await prisma.discussionThread.findMany({
    where: { courseId: params.courseId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: { user: { select: { name: true, email: true } } },
  });
  return NextResponse.json({ threads });
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { title?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ error: 'title required' }, { status: 400 });
  }

  const thread = await prisma.discussionThread.create({
    data: {
      courseId: params.courseId,
      userId: session.user.id,
      title,
    },
  });

  return NextResponse.json({ id: thread.id });
}
