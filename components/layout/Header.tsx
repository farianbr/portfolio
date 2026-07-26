'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useCommandPalette } from '@/components/providers/CommandPaletteProvider';
import { navigation } from '@/lib/site.config';

function isRouteActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open } = useCommandPalette();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b-2 border-line bg-canvas'
          : 'border-b-2 border-transparent'
      }`}
    >
      {/**
       * Three-column grid, not `justify-between`: the wordmark and the actions
       * group are different widths, so space-between would centre the nav
       * between *them* rather than on the page. Equal `1fr` rails pin the
       * middle column to the true page centre whatever the sides weigh.
       */}
      <nav
        className="container-wide grid h-16 grid-cols-[1fr_auto] items-center gap-3 sm:h-20 md:grid-cols-[1fr_auto_1fr]"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 justify-self-start transition-transform duration-150 hover:-translate-y-0.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-line bg-zing text-base text-zing-ink shadow-hard-sm">
            <span className="font-display">F</span>
          </span>
          <span className="font-display hidden text-lg text-ink sm:block">
            Farian
          </span>
        </Link>

        {/* Desktop nav — bordered pills */}
        <div className="hidden items-center gap-2 justify-self-center md:flex">
          {navigation.map((item) => {
            const active = isRouteActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full border-2 border-line px-4 py-1.5 text-xs font-bold uppercase tracking-[0.1em] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-hard-sm ${
                  active
                    ? 'bg-zing text-zing-ink shadow-hard-sm'
                    : 'bg-surface text-ink'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-self-end">
          {/* Reads as a search field where there's room for one, and collapses
              to an icon on phones — where a keyboard hint is meaningless. */}
          <button
            onClick={open}
            className="flex h-10 w-10 items-center justify-center gap-2 rounded-xl border-2 border-line bg-surface text-ink transition-all duration-150 hover:-translate-y-0.5 hover:shadow-hard-sm md:w-auto md:justify-start md:px-3"
            aria-label="Search"
          >
            <FiSearch className="h-4 w-4 shrink-0" />
            <span className="hidden text-xs font-bold text-muted md:inline">
              Search
            </span>
            <kbd className="ml-2 hidden rounded-md border-2 border-line/30 px-1.5 py-0.5 font-mono text-[0.65rem] font-bold text-muted md:inline">
              Ctrl K
            </kbd>
          </button>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-line bg-surface text-ink transition-all duration-150 hover:-translate-y-0.5 hover:shadow-hard-sm md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t-2 border-line bg-canvas md:hidden"
          >
            <div className="container-wide flex flex-col gap-2 py-4">
              {navigation.map((item, i) => {
                const active = isRouteActive(pathname, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl border-2 border-line px-4 py-2.5 shadow-hard-sm ${
                      active ? 'bg-zing text-zing-ink' : 'bg-surface text-ink'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="label !text-inherit opacity-60">
                      0{i + 1}
                    </span>
                    <span className="font-display text-lg">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
