import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

type Question = { id: string; text: string; choices: string[]; correctIndex: number };

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { quizId?: string; answers?: number[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const quizId = body.quizId?.trim();
  const answers = body.answers;
  if (!quizId || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'quizId and answers[] required' }, { status: 400 });
  }

  const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
  if (!quiz || !quiz.courseId) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
  }

  const courseForQuiz = await prisma.course.findUnique({ where: { id: quiz.courseId } });
  if (!courseForQuiz || courseForQuiz.publishStatus !== 'PUBLISHED') {
    return NextResponse.json({ error: 'Quiz not available' }, { status: 403 });
  }

  let questions: Question[];
  try {
    questions = JSON.parse(quiz.questionsJson) as Question[];
  } catch {
    return NextResponse.json({ error: 'Invalid quiz data' }, { status: 500 });
  }

  if (answers.length !== questions.length) {
    return NextResponse.json({ error: 'Answer every question' }, { status: 400 });
  }

  let correct = 0;
  for (let i = 0; i < questions.length; i++) {
    if (answers[i] === questions[i].correctIndex) correct++;
  }

  const score = Math.round((100 * correct) / questions.length);
  const passed = score >= quiz.passPercent;

  const enrolled = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: { userId: session.user.id, courseId: quiz.courseId },
    },
  });
  if (!enrolled) {
    return NextResponse.json({ error: 'Not enrolled' }, { status: 403 });
  }

  let verifyCode: string | undefined;
  if (passed) {
    verifyCode = randomBytes(10).toString('hex');
    await prisma.certificate.upsert({
      where: {
        userId_courseId: { userId: session.user.id, courseId: quiz.courseId },
      },
      create: {
        userId: session.user.id,
        courseId: quiz.courseId,
        verifyCode,
      },
      update: { verifyCode, issuedAt: new Date() },
    });
  }

  return NextResponse.json({ passed, score, passPercent: quiz.passPercent, verifyCode });
}
