import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/permissions';

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isAdmin(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: { reason?: string };
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.course.update({
    where: { id: course.id },
    data: {
      publishStatus: 'REJECTED',
      rejectReason: body.reason?.trim() || 'Please revise and resubmit.',
    },
  });

  return NextResponse.json({ ok: true });
}
