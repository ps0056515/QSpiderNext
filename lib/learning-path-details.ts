import { COURSES, type LearningPath, LEARNING_PATHS } from '@/lib/data';

export type PathKnowledgeFilter = {
  id: string;
  label: string;
  /** Stage ids hidden when this filter is active (shown stages = all minus these) */
  hideStageIds: string[];
};

export type PathCourseNode = {
  id: string;
  title: string;
  durationMinutes: number;
  instructor: string;
  /** Link "Play" / start learning */
  courseSlug?: string;
  topics: string[];
  externalUrl?: string;
  certPrep?: boolean;
};

export type PathStage = {
  id: string;
  title: string;
  subtitle?: string;
  courses: PathCourseNode[];
};

export type PathFAQ = { question: string; answer: string };

export type LearningPathExperience = {
  slug: string;
  heroTitle: string;
  heroDescription: string;
  /** "I know …" segmented control (KodeKloud-style) */
  knowledgeFilters: PathKnowledgeFilter[];
  stages: PathStage[];
  faqs: PathFAQ[];
  /** Optional promo line above readiness CTA */
  readinessEyebrow?: string;
  readinessTitle?: string;
  readinessDescription?: string;
};

function mins(h: number, m = 0) {
  return Math.round(h * 60 + m);
}

function fromCourse(
  slug: string,
  topics: string[],
  durationMinutes: number,
  extras?: Partial<PathCourseNode>,
): PathCourseNode {
  const c = COURSES.find((x) => x.slug === slug);
  if (!c) {
    throw new Error(`Unknown course slug: ${slug}`);
  }
  return {
    id: slug,
    courseSlug: slug,
    title: c.title,
    durationMinutes,
    instructor: c.instructor,
    topics,
    certPrep: c.certPrep,
    ...extras,
  };
}

function standalone(
  id: string,
  title: string,
  durationMinutes: number,
  instructor: string,
  topics: string[],
  extras?: Partial<PathCourseNode>,
): PathCourseNode {
  return {
    id,
    title,
    durationMinutes,
    instructor,
    topics,
    ...extras,
  };
}

export const PATH_EXPERIENCES: Record<string, LearningPathExperience> = {
  'software-testing-engineer': {
    slug: 'software-testing-engineer',
    heroTitle: 'Software Testing Learning Path',
    heroDescription:
      'A guided, node-by-node roadmap from zero QA foundations to automation, API testing, and job-ready interviews — similar to how global platforms visualize long programs.',
    knowledgeFilters: [
      { id: 'none', label: 'New to IT', hideStageIds: [] },
      { id: 'manual', label: 'Manual QA basics', hideStageIds: ['st-found'] },
      { id: 'code', label: 'Comfortable coding', hideStageIds: ['st-found', 'st-core'] },
    ],
    stages: [
      {
        id: 'st-found',
        title: 'Beginner: Foundations for Non‑Programmers',
        subtitle: 'SDLC, testing mindset, and your first structured test cases.',
        courses: [
          fromCourse(
            'manual-software-testing',
            [
              'SDLC & STLC in real projects',
              'Equivalence partitioning & boundary values',
              'Defect lifecycle with severity/priority',
              'Writing traceable test cases in sheets/tools',
            ],
            mins(4, 10),
          ),
          standalone(
            'workshop-requirements',
            'Requirements Workshop & User Stories',
            mins(2, 30),
            'Anitha Kumari',
            [
              'Reading BRDs without drowning in jargon',
              'Acceptance criteria that testers can execute',
              'Collaborating with BAs in agile ceremonies',
            ],
          ),
        ],
      },
      {
        id: 'st-core',
        title: 'Associate: Automation & API Testing',
        subtitle: 'WebDriver, frameworks, and services under test.',
        courses: [
          fromCourse(
            'selenium-automation-testing',
            [
              'Locator strategy & synchronization patterns',
              'Page Object Model at scale',
              'Parallel runs with TestNG + Maven',
              'Reporting hooks for CI dashboards',
            ],
            mins(5, 0),
          ),
          fromCourse(
            'api-testing-postman',
            [
              'REST verbs, status codes, and contracts',
              'Collections, environments, and Newman CLI',
              'RestAssured basics for regression packs',
            ],
            mins(3, 20),
          ),
        ],
      },
      {
        id: 'st-pro',
        title: 'Professional: CI, Quality Gates & Interviews',
        subtitle: 'Ship quality as part of the pipeline and speak fluently in interviews.',
        courses: [
          standalone(
            'ci-quality-gates',
            'CI Quality Gates & Defect Analytics',
            mins(4, 0),
            'Subba Raju',
            [
              'Hooking suites into Jenkins / GitHub Actions',
              'Flaky test triage playbooks',
              'Quality metrics that managers actually read',
            ],
            { externalUrl: 'https://www.qspiders.com' },
          ),
          fromCourse(
            'aptitude-placement-prep',
            [
              'Aptitude drills mapped to service companies',
              'Mock HR + technical storytelling',
              'Resume QA projects that recruiters scan in 20s',
            ],
            mins(4, 30),
          ),
        ],
      },
    ],
    readinessEyebrow: 'Readiness',
    readinessTitle: 'Test your fundamentals for free',
    readinessDescription:
      'Short, timed checks on manual testing, SQL, and logical reasoning help you see gaps before you invest weeks in deep modules.',
    faqs: [
      {
        question: 'Do I need programming before Selenium?',
        answer:
          'Core Java is taught inside the automation track. If you pick “Comfortable coding”, we assume you can read loops and classes so the path moves faster into frameworks.',
      },
      {
        question: 'Is this path only for freshers?',
        answer:
          'Most learners are graduates, but lateral hires use the same map to standardize on QSpiders-style delivery before client interviews.',
      },
      {
        question: 'How are hours estimated?',
        answer:
          'Hours combine live instruction, guided labs, and self-practice. Your pace changes the calendar estimate — use the calculator below.',
      },
    ],
  },

  'full-stack-developer': {
    slug: 'full-stack-developer',
    heroTitle: 'Full Stack Development Learning Path',
    heroDescription:
      'Front-end polish, back-end APIs, databases, and deployment — staged like a visual curriculum map so you always know the next skill.',
    knowledgeFilters: [
      { id: 'none', label: 'No dev background', hideStageIds: [] },
      { id: 'fe', label: 'HTML/CSS/JS', hideStageIds: ['fs-web101'] },
      { id: 'be', label: 'APIs & SQL', hideStageIds: ['fs-web101', 'fs-fe'] },
    ],
    stages: [
      {
        id: 'fs-web101',
        title: 'Beginner: Web & Programming Building Blocks',
        courses: [
          fromCourse(
            'core-advanced-java',
            [
              'OOP, collections, and exceptions done properly',
              'Streams & lambdas for readable services',
              'JDBC patterns before ORMs',
            ],
            mins(6, 0),
          ),
          standalone(
            'git-http-basics',
            'Git, HTTP & Browser DevTools',
            mins(2, 45),
            'Arjun Pillai',
            [
              'Branching models for team projects',
              'Reading network waterfalls',
              'Debugging CORS locally',
            ],
          ),
        ],
      },
      {
        id: 'fs-fe',
        title: 'Intermediate: Modern Front‑end',
        courses: [
          standalone(
            'react-patterns',
            'React Patterns & State Management',
            mins(4, 10),
            'Arjun Pillai',
            [
              'Hooks, composition, and performance basics',
              'Data fetching with resilient UX',
              'Storybook-style component discipline',
            ],
          ),
          fromCourse(
            'mern-stack',
            [
              'Express routing & middleware design',
              'Mongo schemas that survive production',
              'Auth flows & secure cookies',
            ],
            mins(5, 30),
          ),
        ],
      },
      {
        id: 'fs-ship',
        title: 'Professional: Ship & Scale',
        courses: [
          fromCourse(
            'python-full-stack',
            [
              'Django ORM + admin for rapid MVPs',
              'REST + serializers with validation',
              'Deploying with gunicorn + reverse proxy',
            ],
            mins(5, 0),
            { externalUrl: 'https://www.python.org' },
          ),
          fromCourse(
            'aptitude-placement-prep',
            ['DSA warm-ups for product interviews', 'System design storytelling'],
            mins(3, 0),
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'MERN vs Python — which track wins?',
        answer:
          'Both appear in this visualization because hiring markets differ by city. Mentors help you commit to one primary stack while borrowing patterns from the other.',
      },
      {
        question: 'What if I already know Java?',
        answer:
          'Choose “HTML/CSS/JS” or “APIs & SQL” in I know… to collapse early Java-heavy stages and spend time on frameworks and deployment.',
      },
    ],
  },

  'devops-engineer': {
    slug: 'devops-engineer',
    heroTitle: 'DevOps & Cloud Learning Path',
    heroDescription:
      'Linux → Git → CI/CD → containers → Kubernetes → IaC → observability. Each node lists the practical outcomes you should be able to demo.',
    knowledgeFilters: [
      { id: 'none', label: 'New to DevOps', hideStageIds: [] },
      { id: 'linux', label: 'Linux comfortable', hideStageIds: ['dv-linux'] },
      { id: 'k8s', label: 'Containers done', hideStageIds: ['dv-linux', 'dv-cicd'] },
    ],
    stages: [
      {
        id: 'dv-linux',
        title: 'Beginner: Systems & Version Control',
        courses: [
          standalone(
            'linux-shell-bootcamp',
            'Linux Shell & Services Bootcamp',
            mins(4, 0),
            'Karthik S.',
            [
              'Users, permissions, and systemd basics',
              'Networking troubleshooting checklist',
              'vim/ssh hygiene for SRE interviews',
            ],
          ),
          standalone(
            'git-collab',
            'Git Collaboration & Code Review',
            mins(2, 15),
            'Karthik S.',
            ['Rebase vs merge trade-offs', 'Hooks for secret scanning', 'PR templates that work'],
          ),
        ],
      },
      {
        id: 'dv-cicd',
        title: 'Intermediate: CI/CD & Containers',
        courses: [
          fromCourse(
            'devops-engineering',
            [
              'Jenkinsfile patterns & shared libraries',
              'Docker multi-stage builds',
              'Blue/green vs canary thinking',
            ],
            mins(6, 20),
          ),
          fromCourse(
            'aws-cloud-practitioner',
            [
              'IAM least privilege in pipelines',
              'S3 lifecycle for build artifacts',
              'Cost guardrails for sandboxes',
            ],
            mins(3, 40),
          ),
        ],
      },
      {
        id: 'dv-platform',
        title: 'Professional: Kubernetes & Platform Mindset',
        courses: [
          standalone(
            'k8s-ops-deep',
            'Kubernetes Operations & GitOps',
            mins(5, 45),
            'Karthik S.',
            [
              'Workload identities & network policies',
              'Helm upgrades without drama',
              'Argo CD sync windows',
            ],
            { externalUrl: 'https://kubernetes.io' },
          ),
          fromCourse(
            'aptitude-placement-prep',
            ['Aptitude for service firms', 'DevOps scenario interviews'],
            mins(2, 30),
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Do I need cloud certification?',
        answer:
          'Certifications help but the path optimizes for demos: pipelines, Dockerfiles, and live clusters you can screen-share.',
      },
    ],
  },

  'data-scientist': {
    slug: 'data-scientist',
    heroTitle: 'Data Science & AI Learning Path',
    heroDescription:
      'Inspired by guided AI roadmaps: foundations → tooling → ML depth → MLOps-style delivery. Filters adapt which beginner bridge you see.',
    knowledgeFilters: [
      { id: 'none', label: 'Nothing', hideStageIds: [] },
      { id: 'stats', label: 'Stats & Excel', hideStageIds: ['ds-bridge'] },
      { id: 'pydata', label: 'Python/pandas', hideStageIds: ['ds-bridge', 'ds-prep'] },
    ],
    stages: [
      {
        id: 'ds-bridge',
        title: 'Beginner: For Non‑Technical Learners',
        subtitle: 'Build intuition before equations.',
        courses: [
          fromCourse(
            'sql-database',
            [
              'Relational thinking with real schemas',
              'Joins that interviewers love to probe',
              'Transactions & isolation levels',
            ],
            mins(4, 10),
          ),
          standalone(
            'prompt-analytics',
            'Prompting for Analytics & Research',
            mins(3, 0),
            'Dr. Priya Menon',
            [
              'Structured prompts for summarizing datasets',
              'Guardrails for business-facing answers',
              'Pairing LLM output with SQL verification',
            ],
            { externalUrl: 'https://www.kaggle.com' },
          ),
        ],
      },
      {
        id: 'ds-prep',
        title: 'Intermediate: Python for Data & ML Pipelines',
        courses: [
          fromCourse(
            'data-science-ml',
            [
              'pandas feature engineering patterns',
              'scikit-learn pipelines & metrics',
              'Experiment tracking mindset',
            ],
            mins(6, 20),
          ),
          standalone(
            'viz-storytelling',
            'Visualization & Executive Storytelling',
            mins(2, 40),
            'Dr. Priya Menon',
            ['Choosing charts that match decisions', 'Narratives from messy EDA', 'Dashboard anti-patterns'],
          ),
        ],
      },
      {
        id: 'ds-deep',
        title: 'Professional: Deep Learning & Delivery',
        courses: [
          standalone(
            'pytorch-production',
            'PyTorch Models to On‑call Metrics',
            mins(5, 10),
            'Dr. Priya Menon',
            [
              'Training loops with reproducible seeds',
              'TorchScript vs lightweight APIs',
              'Monitoring drift without over-alerting',
            ],
          ),
          fromCourse(
            'aptitude-placement-prep',
            ['Aptitude for analytics roles', 'Take-home presentation prep'],
            mins(3, 0),
          ),
        ],
      },
    ],
    readinessEyebrow: 'Success stories',
    readinessTitle: 'See how learners finish strong',
    readinessDescription:
      'Capstone reviews mirror real hiring loops: notebook quality, code hygiene, and clear metrics beat buzzwords.',
    faqs: [
      {
        question: 'Is this only theory?',
        answer:
          'No — every stage ends with labs you can show: notebooks, APIs, and dashboards. The “More details” drawer lists the concrete artifacts.',
      },
      {
        question: 'How does the “I know…” filter work?',
        answer:
          'It hides early bridge modules so the map matches your starting point. You can always switch back to view the full path.',
      },
    ],
  },

  'java-track': {
    slug: 'java-track',
    heroTitle: 'Java Technology Learning Path',
    heroDescription:
      'Service-industry aligned Java depth: language mastery, enterprise patterns, and integration skills.',
    knowledgeFilters: [
      { id: 'none', label: 'New to Java', hideStageIds: [] },
      { id: 'oop', label: 'OOP comfortable', hideStageIds: ['jv-core'] },
    ],
    stages: [
      {
        id: 'jv-core',
        title: 'Beginner: Language & APIs',
        courses: [
          fromCourse(
            'core-advanced-java',
            ['Syntax to collections', 'Exceptions & generics', 'IO/NIO essentials'],
            mins(8, 0),
          ),
        ],
      },
      {
        id: 'jv-web',
        title: 'Intermediate: Web & Data Access',
        courses: [
          standalone(
            'servlets-spring-bridge',
            'Servlets → Spring Boot Bridge',
            mins(4, 30),
            'Durga Prasad',
            ['MVC without magic', 'Config profiles', 'Testing slices with MockMvc'],
          ),
          fromCourse(
            'sql-database',
            ['SQL for backend devs', 'Indexing for APIs', 'Transactions in services'],
            mins(3, 0),
          ),
        ],
      },
      {
        id: 'jv-career',
        title: 'Professional: Interviews & Delivery',
        courses: [
          fromCourse(
            'aptitude-placement-prep',
            ['Java interview loops', 'Resume project walkthroughs'],
            mins(3, 30),
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Does this replace the Full Stack path?',
        answer:
          'This is narrower and deeper on Java. Pick Full Stack if you want equal time on JavaScript ecosystems.',
      },
    ],
  },

  'python-track': {
    slug: 'python-track',
    heroTitle: 'Python Technology Learning Path',
    heroDescription:
      'Scripting, automation, web frameworks, and data tooling — sequenced for versatility across QA, data, and web roles.',
    knowledgeFilters: [
      { id: 'none', label: 'New to Python', hideStageIds: [] },
      { id: 'script', label: 'Scripting OK', hideStageIds: ['py-base'] },
    ],
    stages: [
      {
        id: 'py-base',
        title: 'Beginner: Python Core',
        courses: [
          standalone(
            'python-core',
            'Python Core & Standard Library',
            mins(5, 0),
            'Rashmi N.',
            ['Types, modules, packaging', 'Testing with pytest', 'Virtual env hygiene'],
          ),
        ],
      },
      {
        id: 'py-web',
        title: 'Intermediate: Web & APIs',
        courses: [
          fromCourse(
            'python-full-stack',
            ['Django views & templates', 'REST serializers', 'Auth patterns'],
            mins(6, 0),
          ),
        ],
      },
      {
        id: 'py-data',
        title: 'Professional: Data & Automation',
        courses: [
          fromCourse(
            'data-science-ml',
            ['pandas for engineers', 'sklearn pipelines', 'Notebook → script promotion'],
            mins(5, 30),
          ),
          fromCourse(
            'api-testing-postman',
            ['Testing your own APIs', 'Contract checks'],
            mins(2, 0),
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Should I learn Java too?',
        answer:
          'Many enterprises still hire Java-first. Python is ideal if you target data, ML, or Django-heavy teams — mentors help you align to your city’s demand.',
      },
    ],
  },

  'cloud-track': {
    slug: 'cloud-track',
    heroTitle: 'Multi‑Cloud Learning Path',
    heroDescription:
      'AWS-first with concepts that transfer to Azure/GCP — IAM, networking, compute, and managed data.',
    knowledgeFilters: [
      { id: 'none', label: 'New to cloud', hideStageIds: [] },
      { id: 'net', label: 'Networking OK', hideStageIds: ['cl-net'] },
    ],
    stages: [
      {
        id: 'cl-net',
        title: 'Beginner: Cloud Primitives',
        courses: [
          fromCourse(
            'aws-cloud-practitioner',
            ['Shared responsibility model', 'Core services map', 'Billing alarms'],
            mins(4, 0),
          ),
        ],
      },
      {
        id: 'cl-arch',
        title: 'Intermediate: Architectures',
        courses: [
          fromCourse(
            'devops-engineering',
            ['IaC mindset', 'Containers on cloud', 'Observability hooks'],
            mins(4, 30),
            { externalUrl: 'https://aws.amazon.com' },
          ),
        ],
      },
      {
        id: 'cl-sec',
        title: 'Professional: Security & Cost',
        courses: [
          standalone(
            'cloud-governance',
            'Governance, Landing Zones & Guardrails',
            mins(3, 20),
            'Harish Bhat',
            ['SCPs and OU design', 'Tagging strategies', 'FinOps dashboards'],
          ),
        ],
      },
    ],
    faqs: [
      {
        question: 'Is this certification focused?',
        answer:
          'Hours map to practitioner skills first; certification alignment is layered where it helps (e.g., Cloud Practitioner topics).',
      },
    ],
  },

  'placement-readiness': {
    slug: 'placement-readiness',
    heroTitle: 'Placement Readiness Learning Path',
    heroDescription:
      'A focused sprint: aptitude, communication, DSA warm-ups, and mock interviews — visualized as a short, intense branch.',
    knowledgeFilters: [
      { id: 'none', label: 'Final year', hideStageIds: [] },
      { id: 'placed', label: 'Off-campus active', hideStageIds: ['pl-base'] },
    ],
    stages: [
      {
        id: 'pl-base',
        title: 'Beginner: Mindset & Aptitude Engines',
        courses: [
          fromCourse(
            'aptitude-placement-prep',
            ['Quant shortcuts', 'Logical grids', 'Verbal traps'],
            mins(4, 0),
          ),
          fromCourse(
            'soft-skills-communication',
            ['Email + LinkedIn hygiene', 'GD frameworks', 'HR storytelling'],
            mins(3, 0),
          ),
        ],
      },
      {
        id: 'pl-tech',
        title: 'Intermediate: Technical Warm‑ups',
        courses: [
          standalone(
            'dsa-lite',
            'DSA Lite for Service Interviews',
            mins(3, 30),
            'S. Vasudevan',
            ['Arrays, strings, hash maps', 'Complexity talk track', 'Whiteboard pacing'],
          ),
          fromCourse(
            'sql-database',
            ['SQL puzzles common in rounds', 'Joins under time pressure'],
            mins(2, 0),
          ),
        ],
      },
      {
        id: 'pl-mock',
        title: 'Professional: Mock Loops',
        courses: [
          standalone(
            'mock-marathon',
            'Mock Interview Marathon',
            mins(2, 0),
            'S. Vasudevan',
            ['Panel-style drills', 'Feedback loops', 'Offer negotiation basics'],
          ),
        ],
      },
    ],
    readinessTitle: 'Book a free readiness chat',
    readinessDescription:
      'Counselors map this path to your target companies and trim nodes you already satisfy via prior coursework.',
    faqs: [
      {
        question: 'Can I buy only this path?',
        answer:
          'Yes — it stacks with any technical course you already completed elsewhere; bring certificates for waiver conversations.',
      },
    ],
  },
};

export function getLearningPathExperience(slug: string): LearningPathExperience | null {
  return PATH_EXPERIENCES[slug] ?? null;
}

export function getAllPathExperienceSlugs(): string[] {
  return Object.keys(PATH_EXPERIENCES);
}

export function getRelatedPaths(slug: string, limit = 4): LearningPath[] {
  const others = LEARNING_PATHS.filter((p) => p.slug !== slug);
  const current = LEARNING_PATHS.find((p) => p.slug === slug);
  if (!current) return others.slice(0, limit);
  const sameTrack = others.filter((p) => p.track === current.track);
  const merged = [...sameTrack, ...others.filter((p) => p.track !== current.track)];
  const seen = new Set<string>();
  return merged.filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true))).slice(0, limit);
}

export function formatDuration(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
