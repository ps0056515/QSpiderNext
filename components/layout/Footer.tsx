import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const SECTIONS = [
  {
    title: 'Courses',
    links: [
      { name: 'Software Testing', href: '/courses?cat=Testing' },
      { name: 'Full Stack Development', href: '/courses?cat=Development' },
      { name: 'DevOps & Cloud', href: '/courses?cat=DevOps' },
      { name: 'Data Science & AI', href: '/courses?cat=Data' },
      { name: 'Placement Prep', href: '/courses?cat=Career' },
    ],
  },
  {
    title: 'Learning Paths',
    links: [
      { name: 'Testing Engineer', href: '/learning-paths/software-testing-engineer' },
      { name: 'Full Stack Developer', href: '/learning-paths/full-stack-developer' },
      { name: 'DevOps Engineer', href: '/learning-paths/devops-engineer' },
      { name: 'Data Scientist', href: '/learning-paths/data-scientist' },
      { name: 'All Paths', href: '/learning-paths' },
    ],
  },
  {
    title: 'For Business',
    links: [
      { name: 'Corporate Training', href: '/corporate' },
      { name: 'Hire From Us', href: '/placements' },
      { name: 'Custom Programs', href: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-slate-200 bg-slate-50">
      <div className="container-x py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-ember-500 to-ember-700">
                <span className="font-display text-sm font-bold text-white">Q</span>
              </div>
              <span className="font-display text-lg font-bold text-slate-900 tracking-tight">
                QSpiders<span className="text-ember-500">.</span>
                <span className="text-slate-400 font-medium">Learn</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Industry-grade IT training with real placement outcomes. From software
              testing to AI — we turn graduates into engineers.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Twitter, Linkedin, Youtube, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-slate-50 text-slate-400 transition hover:border-ember-500/40 hover:text-ember-400"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((sec) => (
            <div key={sec.title}>
              <h3 className="font-display text-sm font-semibold text-slate-900">
                {sec.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 transition hover:text-ember-400"
                    >
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 md:flex-row md:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} QSpiders Learn. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-slate-300">
              Terms
            </Link>
            <Link href="/sitemap" className="hover:text-slate-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
