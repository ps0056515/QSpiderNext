import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { isTrainer } from '@/lib/permissions';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isTrainer(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const courses = await prisma.course.findMany({
    where: { trainerId: session.user.id },
    orderBy: { title: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      publishStatus: true,
      category: true,
      hours: true,
    },
  });

  return NextResponse.json({ courses });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !isTrainer(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: {
    slug?: string;
    title?: string;
    category?: string;
    level?: string;
    hours?: number;
    description?: string;
    tags?: string[];
    instructor?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const slug = body.slug?.trim().toLowerCase().replace(/\s+/g, '-');
  const title = body.title?.trim();
  if (!slug || !title) {
    return NextResponse.json({ error: 'slug and title required' }, { status: 400 });
  }

  const exists = await prisma.course.findUnique({ where: { slug } });
  if (exists) {
    return NextResponse.json({ error: 'Slug already taken' }, { status: 409 });
  }

  const course = await prisma.course.create({
    data: {
      slug,
      title,
      category: body.category?.trim() || 'General',
      level: body.level?.trim() || 'Beginner',
      hours: typeof body.hours === 'number' && body.hours > 0 ? body.hours : 40,
      instructor: body.instructor?.trim() || session.user.name || session.user.email || 'Trainer',
      description: body.description?.trim() || 'Description coming soon.',
      tagsJson: JSON.stringify(body.tags ?? []),
      publishStatus: 'DRAFT',
      trainerId: session.user.id,
    },
  });

  return NextResponse.json({ id: course.id, slug: course.slug });
}
