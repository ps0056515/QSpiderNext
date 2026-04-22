import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isAdmin } from '@/lib/permissions';

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isAdmin(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const course = await prisma.course.findUnique({ where: { id: params.id } });
  if (!course) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.course.update({
    where: { id: course.id },
    data: { publishStatus: 'PUBLISHED', rejectReason: null },
  });

  return NextResponse.json({ ok: true });
}
