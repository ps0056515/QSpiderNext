# QSpiders Learn — Next.js 14 Scaffold

A production-ready website scaffold combining the **KodeKloud** visual system (dark theme, mega-menu, course-card grid, stats/instructors/testimonials sections) with **QSpiders** content (Software Testing, Java, Python, DevOps, Data Science, placements, corporate training).

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with custom design tokens (`ink` / `ember` / `volt` palettes)
- **lucide-react** for icons
- **Space Grotesk** (display) + **Inter** (body) + **JetBrains Mono** (code)

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server (default port 3000, or use `npm run dev:3007` for 3007)
npm run dev

# 3. Open the URL shown in the terminal (e.g. http://localhost:3000 or :3007)
```

Build for production:

```bash
npm run build
npm run start
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Tailwind + custom CSS (grain, gradients)
│   ├── courses/
│   │   ├── page.tsx            # Course catalog with filter + search
│   │   └── [slug]/page.tsx     # Dynamic course detail page
│   ├── learning-paths/
│   │   └── page.tsx            # All learning paths (career + topic)
│   ├── placements/page.tsx     # Placement stats, partners, stories
│   ├── corporate/page.tsx      # Corporate training
│   ├── about/page.tsx          # Company story + centers
│   └── contact/page.tsx        # Contact form + info
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with mega-menu + mobile drawer
│   │   └── Footer.tsx
│   ├── sections/               # Homepage section blocks
│   │   ├── Hero.tsx            # Terminal-style hero with radial glow
│   │   ├── StatsStrip.tsx
│   │   ├── FeaturedCourses.tsx
│   │   ├── LearningPaths.tsx
│   │   ├── Instructors.tsx
│   │   ├── Testimonials.tsx
│   │   ├── HiringPartners.tsx
│   │   └── CTABand.tsx
│   └── ui/                     # Reusable primitives
│       ├── CourseCard.tsx
│       ├── PageHeader.tsx
│       └── ContactForm.tsx
│
├── lib/
│   ├── data.ts                 # ALL content lives here — single source of truth
│   └── utils.ts                # cn() helper
│
├── tailwind.config.ts          # Custom theme
├── next.config.js
├── tsconfig.json
└── package.json
```

## Customizing Content

All copy, course data, learning paths, instructors, stats, testimonials, hiring partners, and offline centers are exported from **`lib/data.ts`**. To change anything shown on the site, edit that one file.

Add a new course:

```ts
// lib/data.ts
export const COURSES: Course[] = [
  // ...existing
  {
    slug: 'your-course-slug',
    title: 'Your Course Title',
    category: 'Testing',          // or Development / DevOps & Cloud / Data & AI / Career
    level: 'Associate',           // Beginner | Associate | Professional
    hours: 60,
    instructor: 'Name',
    description: 'One-paragraph description.',
    tags: ['Tag1', 'Tag2'],
    featured: true,               // optional: show on homepage
    certPrep: true,               // optional: show "Cert Prep" badge
  },
];
```

The course detail page, catalog page, and homepage will pick it up automatically — no other code changes needed. The `[slug]/page.tsx` uses `generateStaticParams` from `COURSES`, so new courses become statically-rendered routes at build time.

## Design System

Custom Tailwind tokens live in `tailwind.config.ts`:

- **`ink-950` → `ink-600`** — near-black backgrounds, from deepest to surface
- **`ember-300` → `ember-700`** — primary warm accent (QSpiders-inspired orange)
- **`volt-300` → `volt-700`** — secondary cool accent (cyan/teal for tech feel)

Shared component classes in `app/globals.css`:

- `.container-x` — centered max-width container with responsive padding
- `.btn-primary` / `.btn-secondary` / `.btn-ghost` — button variants
- `.card-surface` — elevated card with gradient border on hover
- `.chip` — small tag pill
- `.section-heading` / `.section-eyebrow` — consistent section typography
- `.gradient-border` — animated conic-style border for mega-menus and hero card

## What's Wired Up

✅ Dark theme with custom palette and typography
✅ Mega-menu navigation (Courses / Learning Paths / For Business)
✅ Mobile drawer navigation
✅ Scroll-aware navbar (transparent → solid on scroll)
✅ Animated terminal-style hero
✅ Client-side category filter + search on `/courses`
✅ Dynamic course detail pages with `generateStaticParams`
✅ Static pages: placements, corporate, about, contact
✅ Contact form with validation and success state
✅ Responsive layouts (mobile → 4K)
✅ Accessible focus states, keyboard escape on menus

## Next Steps / TODO

Things a real production deployment would add:

- Hook the contact form up to a real endpoint (e.g. Resend, Formspree, or `/api/contact`)
- Add `app/learning-paths/[slug]/page.tsx` for individual path pages (mirror the course detail pattern)
- Replace placeholder stats (`STATS` array) with actual numbers
- Add a CMS integration (Sanity, Contentlayer) if editors need non-technical updates
- Add Open Graph images and structured data for SEO
- Set up analytics (GA4, Plausible, or Posthog)
- Authentication flow if you build a learning platform portion

## License

This is a scaffold — adapt and ship. Content text is illustrative and not affiliated with the actual QSpiders or KodeKloud companies.
