import Link from 'next/link';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import type { Project } from '@/.contentlayer/generated';
import { stackSummary } from '@/lib/projects';

/**
 * The top of a project page: what it is, what my part in it was, and the two
 * links a visitor actually wants. The spec row is deliberately dry — a
 * recruiter reading three of these in a row should be able to compare them
 * without reading any prose.
 */
export default function ProjectMasthead({ project }: { project: Project }) {
  const live = project.status?.toLowerCase() === 'live';

  const specs = [
    { k: 'My role', v: project.role },
    { k: 'Timeline', v: project.timeline },
    { k: 'Core stack', v: stackSummary(project, 3).join(' · ') },
  ].filter((spec) => Boolean(spec.v));

  return (
    <header className="container-wide relative pt-16 md:pt-20">
      <Link href="/projects" className="btn-ghost mb-6">
        <FiArrowLeft className="h-4 w-4" />
        All work
      </Link>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="mb-2 flex items-center gap-4">
            <p className="eyebrow">case study</p>
            {project.status && (
              <span className="label flex items-center gap-2 !text-ink/70">
                {live && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                )}
                {project.status}
              </span>
            )}
          </div>

          <h1
            className="font-display text-ink"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 4.5rem)', lineHeight: 0.96 }}
          >
            {project.title}
          </h1>

          {project.tagline && (
            <p className="mt-4 max-w-2xl font-medium text-base leading-relaxed text-muted md:text-lg">
              {project.tagline}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-end gap-3 lg:col-span-4 lg:justify-end">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FiExternalLink className="h-4 w-4" />
              Open it
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FiGithub className="h-4 w-4" />
              Read the source
            </a>
          )}
        </div>
      </div>

      {specs.length > 0 && (
        <dl className="mt-7 grid gap-x-8 gap-y-4 border-t-2 border-line/20 pt-5 sm:grid-cols-3">
          {specs.map((spec) => (
            <div key={spec.k}>
              <dt className="label mb-1">{spec.k}</dt>
              <dd className="font-medium text-[0.95rem] text-ink md:text-base">
                {spec.v}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
