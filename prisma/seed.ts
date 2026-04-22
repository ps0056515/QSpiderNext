import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { COURSES, LEARNING_PATHS } from '../lib/data';

const prisma = new PrismaClient();

const DEMO_VIDEO = 'https://www.youtube.com/embed/Ke90Tje7VS0';

/** Shared template quiz for every course (replace with real authoring later). */
const GENERIC_QUIZ_QUESTIONS = [
  {
    id: 'q1',
    text: 'What is the main goal of following a structured lesson plan in this course?',
    choices: [
      'Skip assessments',
      'Build skills in the right order with measurable progress',
      'Avoid hands-on practice',
      'Only watch videos',
    ],
    correctIndex: 1,
  },
  {
    id: 'q2',
    text: 'Before moving to the next lesson, you should typically:',
    choices: [
      'Ignore weak areas',
      'Review objectives and complete practice for the current topic',
      'Change course title',
      'Delete your account',
    ],
    correctIndex: 1,
  },
  {
    id: 'q3',
    text: 'Employers value portfolios that show:',
    choices: [
      'Only certificates without projects',
      'Real projects, clarity of thought, and reproducible artifacts',
      'Random screenshots',
      'Plagiarized work',
    ],
    correctIndex: 1,
  },
];

/** Maps path slug → ordered course slugs (must exist in COURSES). */
const PATH_COURSE_SLUGS: Record<string, string[]> = {
  'software-testing-engineer': [
    'manual-software-testing',
    'selenium-automation-testing',
    'api-testing-postman',
    'sql-database',
    'aptitude-placement-prep',
    'soft-skills-communication',
  ],
  'full-stack-developer': [
    'core-advanced-java',
    'mern-stack',
    'python-full-stack',
    'sql-database',
    'aws-cloud-practitioner',
    'api-testing-postman',
  ],
  'devops-engineer': ['devops-engineering', 'aws-cloud-practitioner', 'sql-database', 'python-full-stack'],
  'data-scientist': ['data-science-ml', 'python-full-stack', 'sql-database', 'aptitude-placement-prep'],
  'java-track': ['core-advanced-java', 'mern-stack', 'sql-database', 'api-testing-postman'],
  'python-track': ['python-full-stack', 'data-science-ml', 'sql-database', 'api-testing-postman'],
  'cloud-track': ['aws-cloud-practitioner', 'devops-engineering', 'sql-database', 'python-full-stack'],
  'placement-readiness': [
    'aptitude-placement-prep',
    'soft-skills-communication',
    'sql-database',
    'manual-software-testing',
  ],
};

async function main() {
  await prisma.discussionThread.deleteMany();
  await prisma.order.deleteMany();
  await prisma.pathEnrollment.deleteMany();
  await prisma.learningPathCourse.deleteMany();
  await prisma.learningPath.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.videoAsset.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.course.deleteMany();
  await prisma.payoutBatch.deleteMany();
  await prisma.user.deleteMany();
  await prisma.labOffering.deleteMany();

  const passwordHash = await bcrypt.hash('demo123', 10);

  await prisma.user.create({
    data: {
      email: 'learner@qspiders-learn.example',
      name: 'Demo Learner',
      passwordHash,
      role: 'USER',
    },
  });

  await prisma.user.create({
    data: {
      email: 'admin@qspiders-learn.example',
      name: 'Demo Admin',
      passwordHash,
      role: 'ADMIN',
    },
  });

  const trainer = await prisma.user.create({
    data: {
      email: 'trainer@qspiders-learn.example',
      name: 'Demo Trainer',
      passwordHash,
      role: 'TRAINER',
    },
  });

  const demoLoginHash = await bcrypt.hash('Demo123', 10);
  await prisma.user.create({
    data: {
      email: 'demo@qspiders-learn.example',
      name: 'Demo',
      passwordHash: demoLoginHash,
      role: 'USER',
    },
  });

  const courseIdBySlug = new Map<string, string>();

  for (const c of COURSES) {
    const course = await prisma.course.create({
      data: {
        slug: c.slug,
        title: c.title,
        category: c.category,
        level: c.level,
        hours: c.hours,
        instructor: c.instructor,
        description: c.description,
        tagsJson: JSON.stringify(c.tags),
        featured: !!c.featured,
        certPrep: !!c.certPrep,
        publishStatus: 'PUBLISHED',
        trainerId: trainer.id,
      },
    });
    courseIdBySlug.set(c.slug, course.id);

    const mod1 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Foundations & orientation',
        order: 0,
      },
    });
    const mod2 = await prisma.module.create({
      data: {
        courseId: course.id,
        title: 'Applied skills & projects',
        order: 1,
      },
    });

    await prisma.lesson.create({
      data: {
        moduleId: mod1.id,
        title: 'Welcome & how to use this course',
        order: 0,
        contentType: 'VIDEO',
        videoUrl: DEMO_VIDEO,
      },
    });
    await prisma.lesson.create({
      data: {
        moduleId: mod1.id,
        title: 'Core concepts walkthrough',
        order: 1,
        contentType: 'ARTICLE',
        bodyMd: `## ${c.title}\n\nUse this lesson as a reading companion to the intro video. Practice the exercises in your lab workbook when available.`,
      },
    });

    const quiz = await prisma.quiz.create({
      data: {
        courseId: course.id,
        title: `${c.title}: knowledge check`,
        passPercent: 70,
        questionsJson: JSON.stringify(GENERIC_QUIZ_QUESTIONS),
      },
    });
    await prisma.lesson.create({
      data: {
        moduleId: mod2.id,
        title: 'Knowledge check',
        order: 0,
        contentType: 'QUIZ',
        quizId: quiz.id,
      },
    });

    await prisma.lesson.create({
      data: {
        moduleId: mod2.id,
        title: 'Wrap-up & next steps',
        order: 1,
        contentType: 'ARTICLE',
        bodyMd: '## Next steps\n\nReview weak areas, complete practice assignments, and explore related courses in the catalog.',
      },
    });
  }

  for (const lp of LEARNING_PATHS) {
    const slugs = PATH_COURSE_SLUGS[lp.slug];
    if (!slugs?.length) continue;

    const path = await prisma.learningPath.create({
      data: {
        slug: lp.slug,
        title: lp.title,
        description: lp.description,
        track: lp.track,
        hours: lp.hours,
        icon: lp.icon,
        courseCount: slugs.length,
        published: true,
      },
    });

    let order = 0;
    for (const slug of slugs) {
      const cid = courseIdBySlug.get(slug);
      if (!cid) continue;
      await prisma.learningPathCourse.create({
        data: {
          pathId: path.id,
          courseId: cid,
          order: order++,
        },
      });
    }

    const count = await prisma.learningPathCourse.count({ where: { pathId: path.id } });
    await prisma.learningPath.update({
      where: { id: path.id },
      data: { courseCount: count },
    });
  }

  await prisma.labOffering.createMany({
    data: [
      {
        slug: 'k8s-sandbox',
        title: 'Kubernetes practice sandbox',
        description: 'Ephemeral clusters for CKA-style drills — infrastructure pending budget.',
        status: 'COMING_SOON',
      },
      {
        slug: 'aws-playground',
        title: 'AWS console playground',
        description: 'Isolated accounts for IAM, S3, and Lambda exercises — coming soon.',
        status: 'COMING_SOON',
      },
    ],
  });

  await prisma.payoutBatch.create({
    data: {
      trainerId: trainer.id,
      amountPaise: 0,
      status: 'PENDING',
      periodLabel: 'demo-stub',
    },
  });

  console.log(
    'Seed complete. Quick demo: demo@qspiders-learn.example / Demo123 | also learner|trainer|admin @ qspiders-learn.example / demo123',
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
