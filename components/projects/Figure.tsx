'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FiMaximize2, FiX } from 'react-icons/fi';

interface FigureProps {
  src: string;
  alt: string;
  /** 'browser' wraps the shot in a window chrome; 'phone' in a device outline. */
  frame?: 'browser' | 'phone';
  /** CSS aspect-ratio for the frame. Defaults per frame type. */
  ratio?: string;
  /** Wider layout slot — drives the `sizes` hint, not the frame itself. */
  span?: 'full' | 'half';
  priority?: boolean;
  className?: string;
}

const DEFAULT_RATIO = {
  browser: '16 / 10',
  phone: '414 / 896',
} as const;

/**
 * A screenshot in a restrained frame, click-to-enlarge.
 *
 * Screenshots are the substance of a case study, and at column width the
 * detail that makes them worth showing is unreadable — so every shot opens
 * full-viewport. The frame is deliberately quiet: enough edge to read as a
 * window, not enough to compete with what's inside it.
 */
export default function Figure({
  src,
  alt,
  frame = 'browser',
  ratio,
  span = 'full',
  priority = false,
  className = '',
}: FigureProps) {
  const [zoomed, setZoomed] = useState(false);
  const reduce = useReducedMotion() ?? false;

  const close = useCallback(() => setZoomed(false), []);

  useEffect(() => {
    if (!zoomed) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [zoomed, close]);

  const aspectRatio = ratio ?? DEFAULT_RATIO[frame];
  const sizes =
    span === 'full'
      ? '(min-width: 1024px) 1024px, 100vw'
      : '(min-width: 1024px) 500px, 100vw';

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomed(true)}
        aria-label={`Enlarge: ${alt}`}
        className={`group relative block w-full overflow-hidden text-left transition-shadow duration-500 ease-spring ${
          frame === 'phone'
            ? 'mx-auto max-w-[300px] rounded-[2rem] border-[6px] border-ink/80 bg-ink/80 shadow-hard-lg'
            : 'rounded-xl border-2 border-line/20 bg-surface shadow-hard hover:shadow-hard-lg'
        } ${className}`}
      >
        {frame === 'browser' && (
          <span className="flex items-center gap-1.5 border-b-2 border-line/20 px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
            <span className="h-2 w-2 rounded-full bg-ink/15" />
          </span>
        )}

        <span
          className={`relative block w-full ${
            frame === 'phone' ? 'overflow-hidden rounded-[1.6rem]' : ''
          }`}
          style={{ aspectRatio }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover object-top"
          />
        </span>

        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-canvas opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
        >
          <FiMaximize2 className="h-3.5 w-3.5" />
        </span>
      </button>

      <AnimatePresence>
        {zoomed && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-canvas/20 text-canvas transition-colors hover:border-canvas/60"
            >
              <FiX className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: reduce ? 1 : 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduce ? 1 : 0.98, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full"
              style={{ maxWidth: 'min(1600px, 100%)', maxHeight: '88vh', aspectRatio }}
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
