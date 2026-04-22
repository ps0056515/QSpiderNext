'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { PageLoaderFrame } from '@/components/ui/PageLoaderFrame';

/**
 * Shows the loader as soon as the user clicks an in-app link, until the
 * next route segment commits (pathname updates). Skips new-tab / external links.
 */
export function NavigationLoader() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;
    setPending(false);
  }, [pathname]);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const el = (e.target as HTMLElement | null)?.closest?.('a[href]');
      if (!el || !(el instanceof HTMLAnchorElement)) return;
      if (el.target === '_blank' || el.hasAttribute('download')) return;

      const raw = el.getAttribute('href');
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;

      let nextPathname: string;
      try {
        const u = new URL(el.href, window.location.href);
        if (u.origin !== window.location.origin) return;
        nextPathname = u.pathname;
      } catch {
        return;
      }

      if (nextPathname === pathnameRef.current) return;
      setPending(true);
    };

    document.addEventListener('click', onClickCapture, true);
    return () => document.removeEventListener('click', onClickCapture, true);
  }, []);

  if (!pending) return null;
  return <PageLoaderFrame label="Loading…" />;
}
