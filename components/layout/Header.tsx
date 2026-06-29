'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useCommandPalette } from '@/components/providers/CommandPaletteProvider';
import ThemeToggle from '@/components/ui/ThemeToggle';
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
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-line/10 bg-canvas/70 backdrop-blur-xl'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        className="container-wide flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-2xl italic text-ink transition-opacity hover:opacity-70"
        >
          Farian<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => {
            const active = isRouteActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`ink-link text-sm font-medium ${
                  active ? '!text-accent' : 'text-muted'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/15 text-muted transition-colors hover:border-line/30 hover:text-ink"
            aria-label="Open command palette (Ctrl K)"
          >
            <FiSearch className="h-4 w-4" />
          </button>

          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line/15 text-ink transition-colors hover:border-line/30 md:hidden"
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
            className="overflow-hidden border-t border-line/10 bg-canvas/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-wide flex flex-col py-6">
              {navigation.map((item, i) => {
                const active = isRouteActive(pathname, item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-baseline gap-4 border-b border-line/10 py-4 last:border-0"
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="hand text-xl text-accent">
                      0{i + 1}
                    </span>
                    <span
                      className={`font-display text-4xl ${
                        active ? 'italic text-accent' : 'text-ink'
                      }`}
                    >
                      {item.name}
                    </span>
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
