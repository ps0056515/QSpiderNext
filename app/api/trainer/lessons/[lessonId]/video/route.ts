import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isTrainer } from '@/lib/permissions';

/**
 * Stub: register video processing for a lesson (Mux / Stream webhook would update status).
 */
export async function POST(
  req: Request,
  { params }: { params: { lessonId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isTrainer(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { provider?: string; externalId?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { module: { include: { course: true } } },
  });
  if (!lesson || lesson.module.course.trainerId !== session.user.id) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const asset = await prisma.videoAsset.upsert({
    where: { lessonId: lesson.id },
    create: {
      lessonId: lesson.id,
      provider: body.provider?.trim() || 'stub',
      externalId: body.externalId?.trim(),
      status: body.status?.trim() || 'PROCESSING',
    },
    update: {
      provider: body.provider?.trim() || 'stub',
      externalId: body.externalId?.trim(),
      status: body.status?.trim() || 'PROCESSING',
    },
  });

  return NextResponse.json({ id: asset.id, status: asset.status });
}
