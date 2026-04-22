import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isTrainer } from '@/lib/permissions';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isTrainer(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const course = await prisma.course.findFirst({
    where: { id: params.id, trainerId: session.user.id },
  });
  if (!course) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  let body: Partial<{
    title: string;
    description: string;
    category: string;
    level: string;
    hours: number;
    tags: string[];
    instructor: string;
  }>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  await prisma.course.update({
    where: { id: course.id },
    data: {
      ...(body.title != null ? { title: body.title.trim() } : {}),
      ...(body.description != null ? { description: body.description.trim() } : {}),
      ...(body.category != null ? { category: body.category.trim() } : {}),
      ...(body.level != null ? { level: body.level.trim() } : {}),
      ...(typeof body.hours === 'number' ? { hours: body.hours } : {}),
      ...(body.instructor != null ? { instructor: body.instructor.trim() } : {}),
      ...(body.tags != null ? { tagsJson: JSON.stringify(body.tags) } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
