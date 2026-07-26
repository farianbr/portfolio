'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiSocketdotio,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { siteConfig } from '@/lib/site.config';

/**
 * Portrait ringed by the stack.
 *
 * Geometry, in units where the container is 100 wide (so it's all one scale):
 *   container   6:5, i.e. 83.33 tall
 *   disc        60 across, bottom-anchored -> centre at (50, 53.33)
 *   orbit       radius 42, so tiles clear the disc edge by 12 units
 *   tiles at    170deg 140deg 105deg 75deg 40deg 10deg
 *
 * `left` is a percentage of width but `top` is a percentage of *height*, so
 * the y values below are already divided by 83.33 — that conversion is why
 * the pairs don't look symmetrical.
 *
 * The orbit radius and the container height are chosen together so a tile's
 * own size still fits: tiles are positioned by percentage but sized in pixels,
 * and an earlier version put the top pair at `top: 5.9%` — which on a short
 * phone-width container resolved to 15px, less than half a 44px tile, so they
 * hung off the top edge and collided with the buttons above. The 12-unit gap
 * and the 6:5 ratio leave room for a 48px tile at every size used here.
 */
type OrbitTile = {
  icon: IconType;
  label: string;
  left: string;
  top: string;
  /** Brand colour, used for the icon glyph only. */
  color: string;
};

const ORBIT: OrbitTile[] = [
  { icon: SiTypescript, label: 'TypeScript', left: '8.6%', top: '55.2%', color: '#3178C6' },
  { icon: SiReact, label: 'React', left: '17.8%', top: '31.6%', color: '#087EA4' },
  { icon: SiNextdotjs, label: 'Next.js', left: '39.1%', top: '15.3%', color: '#06301E' },
  { icon: SiSocketdotio, label: 'Socket.IO', left: '60.9%', top: '15.3%', color: '#06301E' },
  { icon: SiNodedotjs, label: 'Node.js', left: '82.2%', top: '31.6%', color: '#417E38' },
  { icon: SiPostgresql, label: 'PostgreSQL', left: '91.4%', top: '55.2%', color: '#31648C' },
];

export default function Hero() {
  const reduce = useReducedMotion() ?? false;

  const rise: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: reduce ? 0 : i,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const pop: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.5 },
    show: (i: number = 0) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: reduce ? 0 : i,
        ease: [0.34, 1.56, 0.64, 1],
      },
    }),
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pb-10 pt-4 sm:pb-16 sm:pt-8"
    >
      <div className="container-wide">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            custom={0.05}
            variants={rise}
            initial="hidden"
            animate="show"
            className="hand text-xl text-accent sm:text-2xl"
          >
            hey there —
          </motion.p>

          <motion.h1
            id="hero-heading"
            custom={0.15}
            variants={rise}
            initial="hidden"
            animate="show"
            className="font-display mt-1 text-ink"
            style={{ fontSize: 'clamp(2.6rem, 9vw, 5rem)', lineHeight: 0.95 }}
          >
            I&apos;m Farian
          </motion.h1>

          <motion.p
            custom={0.28}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mx-auto mt-3 max-w-xl text-[0.92rem] font-medium leading-relaxed text-muted sm:mt-4 sm:text-lg"
          >
            A full-stack developer in Dhaka. I build web products end to end —
            the canvas and the socket server, the schema and the migration
            behind it.
          </motion.p>

          <motion.div
            custom={0.4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6"
          >
            <Link href="/projects" className="btn-primary group">
              See the work
              <FiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Resume
            </a>
          </motion.div>
        </div>

        {/**
         * Portrait + stack ring.
         *
         * Positioning lives on plain wrappers and animation on the child:
         * Framer Motion writes `transform` inline, so a Tailwind
         * `-translate-x-1/2` on the *same* element gets overwritten the moment
         * it animates `scale` — which silently knocks everything off centre.
         */}
        <div className="relative mx-auto mt-6 aspect-[6/5] w-full max-w-[300px] sm:mt-8 sm:max-w-[460px]">
          {/* Lime disc */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 aspect-square w-[60%] -translate-x-1/2"
          >
            <motion.div
              custom={0.45}
              variants={pop}
              initial="hidden"
              animate="show"
              className="h-full w-full rounded-full border-2 border-line bg-zing"
            />
          </div>

          {/* Portrait, sunk into the disc so the lime reads as a ring */}
          <div className="absolute bottom-[3%] left-1/2 aspect-square w-[52%] -translate-x-1/2">
            <motion.div
              custom={0.55}
              variants={pop}
              initial="hidden"
              animate="show"
              className="relative h-full w-full overflow-hidden rounded-full border-2 border-line bg-ink"
            >
              <Image
                src="/images/profile.png"
                alt={`${siteConfig.name}, ${siteConfig.role}`}
                fill
                sizes="(min-width: 640px) 240px, 160px"
                className="object-cover object-top"
                priority
              />
            </motion.div>
          </div>

          {/* The stack, orbiting */}
          {ORBIT.map((tile, index) => (
            <div
              key={tile.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: tile.left, top: tile.top }}
            >
              <motion.span
                custom={0.65 + index * 0.07}
                variants={pop}
                initial="hidden"
                animate="show"
                title={tile.label}
                /* Tiles stay white so the brand logos keep their contrast —
                   the border and shadow are pinned to ink for the same
                   reason. */
                className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#06301E] bg-white shadow-[3px_3px_0_0_#06301E] sm:h-12 sm:w-12 sm:rounded-2xl"
              >
                <tile.icon
                  aria-hidden="true"
                  className="h-4 w-4 sm:h-6 sm:w-6"
                  style={{ color: tile.color }}
                />
                <span className="sr-only">{tile.label}</span>
              </motion.span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
