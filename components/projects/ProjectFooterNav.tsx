import Link from 'next/link';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import type { Project } from '@/.contentlayer/generated';

export default function ProjectFooterNav({
  previous,
  next,
}: {
  previous?: Project;
  next?: Project;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More projects"
      className="container-wide border-t-2 border-line/20 py-10 md:py-12"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {previous && (
          <Link href={previous.url} className="group">
            <p className="label mb-2 flex items-center gap-2">
              <FiArrowLeft className="h-3 w-3 transition-transform duration-300 ease-spring group-hover:-translate-x-1" />
              Previous
            </p>
            <p className="font-display text-xl text-ink transition-colors group-hover:text-accent md:text-2xl">
              {previous.title}
            </p>
          </Link>
        )}

        {next && (
          <Link
            href={next.url}
            className="group sm:text-right sm:justify-self-end"
          >
            <p className="label mb-2 flex items-center gap-2 sm:justify-end">
              Next
              <FiArrowRight className="h-3 w-3 transition-transform duration-300 ease-spring group-hover:translate-x-1" />
            </p>
            <p className="font-display text-xl text-ink transition-colors group-hover:text-accent md:text-2xl">
              {next.title}
            </p>
          </Link>
        )}
      </div>
    </nav>
  );
}
