'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Bug,
  Code2,
  Cloud,
  BrainCircuit,
  Target,
  Building2,
  Users,
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthNav } from '@/components/layout/AuthNav';
import { signOut, useSession } from 'next-auth/react';

type MegaMenuKey = 'courses' | 'paths' | 'business' | null;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all',
        scrolled
          ? 'border-b border-slate-200 bg-slate-50/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-ember-500 to-ember-700 grid place-items-center shadow-[0_4px_14px_-2px_rgba(99,102,241,0.55)]">
              <span className="font-display text-sm font-bold text-white">Q</span>
            </div>
            <div className="absolute -inset-1 rounded-lg bg-ember-500/40 blur-md opacity-0 group-hover:opacity-100 transition" />
          </div>
          <span className="font-display text-lg font-bold text-slate-900 tracking-tight">
            QSpiders<span className="text-ember-500">.</span>
            <span className="text-slate-400 font-medium">Learn</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <MenuTrigger
            label="Courses"
            active={openMenu === 'courses'}
            onEnter={() => setOpenMenu('courses')}
          />
          <MenuTrigger
            label="Learning Paths"
            active={openMenu === 'paths'}
            onEnter={() => setOpenMenu('paths')}
          />
          <Link
            href="/placements"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Placements
          </Link>
          <Link
            href="/labs"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Labs
          </Link>
          <MenuTrigger
            label="For Business"
            active={openMenu === 'business'}
            onEnter={() => setOpenMenu('business')}
          />
          <Link
            href="/about"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <AuthNav />
          <Link href="/courses" className="btn-primary !px-4 !py-2 text-sm">
            Start Free
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mega menus */}
      {openMenu === 'courses' && <CoursesMegaMenu onClose={() => setOpenMenu(null)} />}
      {openMenu === 'paths' && <PathsMegaMenu onClose={() => setOpenMenu(null)} />}
      {openMenu === 'business' && <BusinessMegaMenu onClose={() => setOpenMenu(null)} />}

      {/* Mobile drawer */}
      {mobileOpen && <MobileDrawer onClose={() => setMobileOpen(false)} />}
    </header>
  );
}

function MenuTrigger({
  label,
  active,
  onEnter,
}: {
  label: string;
  active: boolean;
  onEnter: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      className={cn(
        'flex items-center gap-1 px-3 py-2 text-sm font-medium transition',
        active ? 'text-ember-700' : 'text-slate-600 hover:text-slate-900',
      )}
    >
      {label}
      <ChevronDown
        size={14}
        className={cn('transition', active && 'rotate-180 text-ember-400')}
      />
    </button>
  );
}

function CoursesMegaMenu({ onClose }: { onClose: () => void }) {
  const categories = [
    {
      title: 'Software Testing',
      icon: Bug,
      items: [
        { name: 'Manual Testing', href: '/courses/manual-software-testing' },
        { name: 'Selenium Automation', href: '/courses/selenium-automation-testing' },
        { name: 'API Testing (Postman)', href: '/courses/api-testing-postman' },
      ],
    },
    {
      title: 'Development',
      icon: Code2,
      items: [
        { name: 'Core & Advanced Java', href: '/courses/core-advanced-java' },
        { name: 'Python Full Stack', href: '/courses/python-full-stack' },
        { name: 'MERN Stack', href: '/courses/mern-stack' },
      ],
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      items: [
        { name: 'DevOps Engineering', href: '/courses/devops-engineering' },
        { name: 'AWS Cloud Practitioner', href: '/courses/aws-cloud-practitioner' },
      ],
    },
    {
      title: 'Data & AI',
      icon: BrainCircuit,
      items: [
        { name: 'Data Science & ML', href: '/courses/data-science-ml' },
        { name: 'SQL & Databases', href: '/courses/sql-database' },
      ],
    },
  ];

  return (
    <MegaShell onClose={onClose}>
      <div className="grid grid-cols-4 gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.title}>
              <div className="mb-4 flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-ember-500/10 text-ember-400 ring-1 ring-ember-500/20">
                  <Icon size={16} />
                </div>
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  {cat.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((it) => (
                  <li key={it.href}>
                    <Link
                      href={it.href}
                      onClick={onClose}
                      className="block text-sm text-slate-400 hover:text-slate-900 transition"
                    >
                      {it.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5">
        <p className="text-xs text-slate-500">
          Over 100+ industry-relevant technologies across live and self-paced formats.
        </p>
        <Link href="/courses" onClick={onClose} className="btn-ghost">
          Browse all courses →
        </Link>
      </div>
    </MegaShell>
  );
}

function PathsMegaMenu({ onClose }: { onClose: () => void }) {
  const tracks = [
    { name: 'Software Testing Engineer', href: '/learning-paths/software-testing-engineer', icon: Bug },
    { name: 'Full Stack Developer', href: '/learning-paths/full-stack-developer', icon: Code2 },
    { name: 'DevOps Engineer', href: '/learning-paths/devops-engineer', icon: Cloud },
    { name: 'Data Scientist', href: '/learning-paths/data-scientist', icon: BrainCircuit },
    { name: 'Placement Readiness', href: '/learning-paths/placement-readiness', icon: Target },
    { name: 'Java Track', href: '/learning-paths/java-track', icon: GraduationCap },
  ];

  return (
    <MegaShell onClose={onClose}>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {tracks.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              onClick={onClose}
              className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="grid h-10 w-10 flex-none place-items-center rounded-md bg-gradient-to-br from-ember-500/20 to-ember-600/5 text-ember-400 ring-1 ring-ember-500/20">
                <Icon size={18} />
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-slate-900 group-hover:text-ember-300">
                  {t.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Career-ready sequence with live mentorship
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </MegaShell>
  );
}

function BusinessMegaMenu({ onClose }: { onClose: () => void }) {
  const items = [
    {
      name: 'Corporate Training',
      desc: 'Custom upskilling programs for engineering teams.',
      href: '/corporate',
      icon: Building2,
    },
    {
      name: 'Hire From Us',
      desc: 'Trained, interview-ready talent from our placement pool.',
      href: '/placements',
      icon: Users,
    },
    {
      name: 'Contact Sales',
      desc: 'Talk to our partnerships team.',
      href: '/contact',
      icon: Phone,
    },
  ];

  return (
    <MegaShell onClose={onClose}>
      <div className="grid grid-cols-3 gap-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-5 transition hover:border-ember-500/40 hover:bg-ember-500/[0.04]"
            >
              <Icon size={20} className="text-ember-400" />
              <h3 className="mt-3 font-display text-base font-semibold text-slate-900">
                {it.name}
              </h3>
              <p className="mt-1 text-xs text-slate-400">{it.desc}</p>
            </Link>
          );
        })}
      </div>
    </MegaShell>
  );
}

function MegaShell({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-x-0 top-full hidden lg:block"
      onMouseLeave={onClose}
    >
      <div className="container-x pt-2">
        <div className="gradient-border rounded-xl border border-slate-200 bg-slate-100/95 p-6 shadow-2xl backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession();
  const links = [
    { name: 'Courses', href: '/courses' },
    { name: 'Learning Paths', href: '/learning-paths' },
    { name: 'Labs', href: '/labs' },
    { name: 'Placements', href: '/placements' },
    { name: 'Corporate', href: '/corporate' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];
  return (
    <div className="lg:hidden border-t border-slate-200 bg-slate-50/95 backdrop-blur-xl">
      <nav className="container-x flex flex-col py-4">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="py-3 text-base font-medium text-slate-700 hover:text-ember-600"
          >
            {l.name}
          </Link>
        ))}
        <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-slate-200">
          {session?.user ? (
            <>
              {(session.user.role === 'TRAINER' || session.user.role === 'ADMIN') && (
                <Link
                  href="/trainer"
                  onClick={onClose}
                  className="btn-secondary w-full text-center"
                >
                  Trainer
                </Link>
              )}
              {session.user.role === 'ADMIN' && (
                <Link
                  href="/admin/review"
                  onClick={onClose}
                  className="btn-secondary w-full text-center"
                >
                  Admin review
                </Link>
              )}
              <Link
                href="/dashboard"
                onClick={onClose}
                className="btn-secondary w-full text-center"
              >
                Dashboard
              </Link>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  signOut({ callbackUrl: '/' });
                }}
                className="btn-secondary w-full"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link href="/login" onClick={onClose} className="btn-secondary flex-1 text-center">
              Sign in
            </Link>
          )}
          <Link href="/courses" onClick={onClose} className="btn-primary w-full text-center">
            Start Free
          </Link>
        </div>
      </nav>
    </div>
  );
}
