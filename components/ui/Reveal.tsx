'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

// Pre-created motion components — created once, never per render, so children
// are never remounted when the parent re-renders.
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  li: motion.li,
} as const;

type MotionTagName = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  /** Render as a different element (e.g. 'section', 'li'). Defaults to div. */
  as?: MotionTagName;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance for the upward slide. */
  y?: number;
  className?: string;
  /** Animate on scroll into view (default) vs immediately on mount. */
  once?: boolean;
}

/**
 * A single, reduced-motion-aware reveal animation used across the site.
 * When the user prefers reduced motion, content appears instantly with no
 * transform — replacing the dozens of ad-hoc `motion.div` blocks that
 * previously ignored the preference.
 */
export default function Reveal({
  children,
  as,
  delay = 0,
  y = 16,
  className,
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = MOTION_TAGS[as ?? 'div'];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}
