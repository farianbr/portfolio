import type { ReactNode } from 'react';
import Reveal from '@/components/ui/Reveal';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  /** Right-hand slot — page actions that belong on the title line. */
  aside?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * The top of every routed page.
 *
 * Each page used to set its own padding and type scale, so moving between
 * Work, the journal and Contact shifted the title a few dozen pixels every
 * time. One component now owns the rhythm — pt-16/pt-20, eyebrow, title, lead —
 * and pages pass content, not spacing.
 */
export default function PageHeader({
  eyebrow,
  title,
  lead,
  aside,
  align = 'left',
  className = '',
}: PageHeaderProps) {
  const centred = align === 'center';

  return (
    <header
      className={`container-wide pb-6 pt-16 md:pb-8 md:pt-20 ${
        centred ? 'text-center' : ''
      } ${className}`}
    >
      <div
        className={
          aside
            ? 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'
            : ''
        }
      >
        <Reveal>
          <p className="eyebrow mb-2">{eyebrow}</p>
          <h1
            className="font-display text-ink"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', lineHeight: 0.96 }}
          >
            {title}
          </h1>
          {lead && (
            <p
              className={`mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted md:text-base ${
                centred ? 'mx-auto' : ''
              }`}
            >
              {lead}
            </p>
          )}
        </Reveal>

        {aside && <div className="shrink-0">{aside}</div>}
      </div>
    </header>
  );
}
