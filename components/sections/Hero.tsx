'use client';

import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { siteConfig, socialLinks } from '@/lib/site.config';

const FACTS = [
  { k: 'Based in', v: 'Dhaka, Bangladesh' },
  { k: 'What I do', v: siteConfig.role },
  { k: 'Currently', v: 'Open to new work', live: true },
];

export default function Hero() {
  const reduce = useReducedMotion() ?? false;

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: reduce ? 0 : i, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* faint ink wash, top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[42vmin] w-[42vmin] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: 'radial-gradient(circle, rgb(var(--accent)), transparent 70%)' }}
      />

      {/* Main intro — vertically centered */}
      <div className="container-wide relative flex w-full flex-1 flex-col justify-center pb-12 pt-28">
        <motion.p
          custom={0.1}
          variants={rise}
          initial="hidden"
          animate="show"
          className="hand text-2xl text-accent sm:text-3xl"
        >
          hello, I&apos;m
        </motion.p>

        <motion.h1
          id="hero-heading"
          custom={0.2}
          variants={rise}
          initial="hidden"
          animate="show"
          className="font-display mt-2 text-ink"
          style={{ fontSize: 'clamp(3rem, 11vw, 8.5rem)', lineHeight: 0.92 }}
        >
          Farian{' '}
          <span className="relative inline-block italic">
            Bin Rahman
            <svg
              aria-hidden="true"
              viewBox="0 0 320 24"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full text-accent sm:-bottom-3 sm:h-4"
            >
              <motion.path
                d="M3 14 C 70 4, 130 22, 200 12 S 300 6, 317 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                initial={reduce ? undefined : { pathLength: 0 }}
                animate={reduce ? undefined : { pathLength: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: 'easeInOut' }}
              />
            </svg>
          </span>
        </motion.h1>

        <motion.p
          custom={0.4}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-2xl font-serif text-lg leading-relaxed text-muted md:text-xl"
        >
          {siteConfig.role} — {siteConfig.tagline}
        </motion.p>

        <motion.div
          custom={0.55}
          variants={rise}
          initial="hidden"
          animate="show"
          className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-4"
        >
          <Link href="/projects" className="btn-primary group">
            View work
            <FiArrowRight className="h-4 w-4 transition-transform duration-300 ease-spring group-hover:translate-x-1" />
          </Link>
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Resume
          </a>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:ml-1">
            {socialLinks
              .filter((s) => s.href.startsWith('http'))
              .map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ink-link text-sm font-medium"
                >
                  {s.name}
                </a>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom index card — quick facts */}
      <motion.div
        custom={0.8}
        variants={rise}
        initial="hidden"
        animate="show"
        className="container-wide relative w-full pb-14"
      >
        <dl className="grid gap-6 border-t border-line/15 pt-6 sm:grid-cols-3">
          {FACTS.map((f) => (
            <div key={f.k}>
              <dt className="label mb-1.5">{f.k}</dt>
              <dd className="flex items-center gap-2 font-serif text-base text-ink md:text-lg">
                {f.live && (
                  <span className="relative flex h-2 w-2">
                    {!reduce && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                    )}
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                )}
                {f.v}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
