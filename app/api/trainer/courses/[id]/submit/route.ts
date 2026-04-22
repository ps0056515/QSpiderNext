import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isTrainer } from '@/lib/permissions';

/** Submit draft for admin review */
export async function POST(
  _req: Request,
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

  if (course.publishStatus !== 'DRAFT' && course.publishStatus !== 'REJECTED') {
    return NextResponse.json({ error: 'Invalid state for submit' }, { status: 400 });
  }

  await prisma.course.update({
    where: { id: course.id },
    data: { publishStatus: 'PENDING_REVIEW', rejectReason: null },
  });

  return NextResponse.json({ ok: true });
}
