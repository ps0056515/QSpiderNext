// Central content source for the site. All QSpiders-inspired content lives here
// so copy changes are one-file edits.

export type Level = 'Beginner' | 'Associate' | 'Professional';

export type Course = {
  slug: string;
  title: string;
  category: string;
  level: Level;
  hours: number;
  instructor: string;
  description: string;
  tags: string[];
  featured?: boolean;
  certPrep?: boolean;
};

export const COURSES: Course[] = [
  {
    slug: 'selenium-automation-testing',
    title: 'Selenium Automation Testing',
    category: 'Testing',
    level: 'Associate',
    hours: 80,
    instructor: 'Subba Raju',
    description:
      'Master web automation with Selenium WebDriver, TestNG, Maven, and framework design. Includes hands-on labs on real applications.',
    tags: ['Selenium', 'Java', 'TestNG', 'Maven'],
    featured: true,
    certPrep: true,
  },
  {
    slug: 'manual-software-testing',
    title: 'Manual Software Testing',
    category: 'Testing',
    level: 'Beginner',
    hours: 60,
    instructor: 'Anitha Kumari',
    description:
      'Foundations of SDLC, STLC, test case design, defect lifecycle, and test management tools used across the industry.',
    tags: ['Manual QA', 'SDLC', 'STLC', 'JIRA'],
    featured: true,
  },
  {
    slug: 'core-advanced-java',
    title: 'Core & Advanced Java',
    category: 'Development',
    level: 'Associate',
    hours: 120,
    instructor: 'Durga Prasad',
    description:
      'Java fundamentals through advanced topics: OOP, collections, multithreading, JDBC, Servlets, and Spring Boot basics.',
    tags: ['Java', 'OOP', 'Spring Boot'],
    featured: true,
    certPrep: true,
  },
  {
    slug: 'python-full-stack',
    title: 'Python Full Stack Development',
    category: 'Development',
    level: 'Associate',
    hours: 110,
    instructor: 'Rashmi N.',
    description:
      'Python, Django, REST APIs, React integration, and deployment. Build and ship three production-grade projects.',
    tags: ['Python', 'Django', 'REST', 'React'],
    featured: true,
  },
  {
    slug: 'devops-engineering',
    title: 'DevOps Engineering',
    category: 'DevOps & Cloud',
    level: 'Professional',
    hours: 90,
    instructor: 'Karthik S.',
    description:
      'Linux, Git, Jenkins, Docker, Kubernetes, Terraform, and Ansible — with CI/CD pipeline projects on AWS.',
    tags: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform'],
    featured: true,
    certPrep: true,
  },
  {
    slug: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    category: 'DevOps & Cloud',
    level: 'Beginner',
    hours: 45,
    instructor: 'Harish Bhat',
    description:
      'Covers core AWS services, billing, security, and the AWS Well-Architected Framework. Prepares you for CLF-C02.',
    tags: ['AWS', 'Cloud', 'CLF-C02'],
    certPrep: true,
  },
  {
    slug: 'data-science-ml',
    title: 'Data Science & Machine Learning',
    category: 'Data & AI',
    level: 'Associate',
    hours: 130,
    instructor: 'Dr. Priya Menon',
    description:
      'Statistics, pandas, scikit-learn, deep learning with PyTorch, and end-to-end capstone projects with real datasets.',
    tags: ['Python', 'ML', 'PyTorch', 'pandas'],
    featured: true,
  },
  {
    slug: 'mern-stack',
    title: 'MERN Stack Development',
    category: 'Development',
    level: 'Associate',
    hours: 95,
    instructor: 'Arjun Pillai',
    description:
      'MongoDB, Express, React, and Node. Build a job board, e-commerce store, and chat app from scratch.',
    tags: ['MongoDB', 'Express', 'React', 'Node'],
  },
  {
    slug: 'api-testing-postman',
    title: 'API Testing with Postman & RestAssured',
    category: 'Testing',
    level: 'Associate',
    hours: 35,
    instructor: 'Neha Reddy',
    description:
      'REST API concepts, manual testing with Postman, automation with RestAssured, and contract testing basics.',
    tags: ['API', 'Postman', 'RestAssured'],
  },
  {
    slug: 'sql-database',
    title: 'SQL & Database Fundamentals',
    category: 'Data & AI',
    level: 'Beginner',
    hours: 40,
    instructor: 'Meera Iyer',
    description:
      'Relational theory, MySQL, PostgreSQL, joins, indexing, transactions, and query optimization for interviews.',
    tags: ['SQL', 'MySQL', 'PostgreSQL'],
  },
  {
    slug: 'aptitude-placement-prep',
    title: 'Aptitude & Placement Preparation',
    category: 'Career',
    level: 'Beginner',
    hours: 50,
    instructor: 'S. Vasudevan',
    description:
      'Quantitative aptitude, logical reasoning, verbal ability, and mock interviews for product and service companies.',
    tags: ['Aptitude', 'Interview', 'HR'],
    featured: true,
  },
  {
    slug: 'soft-skills-communication',
    title: 'Soft Skills & Communication',
    category: 'Career',
    level: 'Beginner',
    hours: 30,
    instructor: 'Lakshmi Rao',
    description:
      'Business communication, GD, presentations, email etiquette, and interview storytelling frameworks.',
    tags: ['Communication', 'GD', 'HR'],
  },
];

export type LearningPath = {
  slug: string;
  title: string;
  description: string;
  courseCount: number;
  hours: number;
  icon: string; // lucide icon name
  track: 'Topic' | 'Career';
};

export const LEARNING_PATHS: LearningPath[] = [
  {
    slug: 'software-testing-engineer',
    title: 'Software Testing Engineer',
    description:
      'Manual + Selenium + API testing + frameworks. The classic QSpiders path into QA jobs.',
    courseCount: 6,
    hours: 220,
    icon: 'Bug',
    track: 'Career',
  },
  {
    slug: 'full-stack-developer',
    title: 'Full Stack Developer',
    description:
      'Front-end, back-end, databases, and deployment. MERN or Python-Django tracks.',
    courseCount: 8,
    hours: 280,
    icon: 'Code2',
    track: 'Career',
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    description:
      'Linux, CI/CD, containers, Kubernetes, IaC, and cloud. End-to-end platform skills.',
    courseCount: 7,
    hours: 240,
    icon: 'Cloud',
    track: 'Career',
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    description:
      'Stats foundations through ML and deep learning. Includes capstone and interview prep.',
    courseCount: 6,
    hours: 260,
    icon: 'BrainCircuit',
    track: 'Career',
  },
  {
    slug: 'java-track',
    title: 'Java Track',
    description:
      'From core Java to Spring Boot microservices. Strong fit for service-company roles.',
    courseCount: 4,
    hours: 180,
    icon: 'Coffee',
    track: 'Topic',
  },
  {
    slug: 'python-track',
    title: 'Python Track',
    description:
      'Python, scripting, web frameworks, and data libraries. The flexible modern stack.',
    courseCount: 5,
    hours: 200,
    icon: 'FileCode',
    track: 'Topic',
  },
  {
    slug: 'cloud-track',
    title: 'Cloud Track (AWS · Azure · GCP)',
    description:
      'Cloud fundamentals and architect-level services across the big three providers.',
    courseCount: 6,
    hours: 190,
    icon: 'CloudCog',
    track: 'Topic',
  },
  {
    slug: 'placement-readiness',
    title: 'Placement Readiness',
    description:
      'Aptitude, DSA basics, soft skills, and mock interviews. Built for fresh graduates.',
    courseCount: 4,
    hours: 140,
    icon: 'Target',
    track: 'Career',
  },
];

export const INSTRUCTORS = [
  {
    name: 'Subba Raju',
    role: 'Principal Trainer · Automation Testing',
    bio: 'Industry veteran with 18+ years in test automation. Has trained over 40,000 students and built frameworks used at Tier-1 service firms.',
    avatar: 'SR',
  },
  {
    name: 'Durga Prasad',
    role: 'Lead Trainer · Java & Backend',
    bio: 'Java champion and former tech lead at a global consulting company. Known for turning absolute beginners into confident backend engineers.',
    avatar: 'DP',
  },
  {
    name: 'Dr. Priya Menon',
    role: 'Head of Data & AI Curriculum',
    bio: 'PhD in applied ML with publications in CVPR and NeurIPS workshops. Bridges research rigor with hands-on, industry-ready instruction.',
    avatar: 'PM',
  },
  {
    name: 'Karthik S.',
    role: 'Senior Trainer · DevOps & Cloud',
    bio: 'Ex-SRE at a hyperscale fintech. Certified on AWS, Azure, GCP, and CKA. Runs the platform engineering cohort.',
    avatar: 'KS',
  },
];

export const STATS = [
  { label: 'Students Placed', value: '7,50,000+' },
  { label: 'Hiring Partners', value: '2,500+' },
  { label: 'Training Centers', value: '90+' },
  { label: 'Technologies Taught', value: '100+' },
];

export const TESTIMONIALS = [
  {
    name: 'Rahul V.',
    role: 'SDET at a Fortune 500',
    quote:
      'The Selenium course plus aptitude training genuinely changed my career trajectory. Cleared three interviews inside a month.',
  },
  {
    name: 'Anjali M.',
    role: 'Full Stack Developer',
    quote:
      'I came in from a non-CS branch. The Python full stack path gave me real projects to show, and the placement cell did the rest.',
  },
  {
    name: 'Faisal K.',
    role: 'Cloud Engineer at a Global Bank',
    quote:
      'The DevOps track is relentless in the best way. Mock interviews felt harder than the real thing — which is exactly the point.',
  },
];

export const HIRING_PARTNERS = [
  'Infosys',
  'TCS',
  'Wipro',
  'Accenture',
  'Capgemini',
  'Cognizant',
  'HCL',
  'Tech Mahindra',
  'Mindtree',
  'LTIMindtree',
  'IBM',
  'Oracle',
];

export const OFFLINE_CENTERS = [
  { city: 'Bengaluru', address: 'BTM Layout · Marathahalli · Electronic City' },
  { city: 'Hyderabad', address: 'Ameerpet · Kukatpally · Dilsukhnagar' },
  { city: 'Chennai', address: 'Velachery · T. Nagar · OMR' },
  { city: 'Pune', address: 'Kothrud · Hinjewadi' },
  { city: 'Mumbai', address: 'Andheri · Thane' },
  { city: 'Noida', address: 'Sector 62 · Sector 18' },
];
