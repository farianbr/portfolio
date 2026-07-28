import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';

import { publishedProjects, stackSummary } from '@/lib/projects';
import Reveal from '@/components/ui/Reveal';
import PageHeader from '@/components/ui/PageHeader';

/**
 * The work index — a ledger, not a card wall.
 *
 * One row per project: number, name, the one-line version, what it's built
 * with, and a small preview. Rows are kept tight enough that the whole list
 * fits in a screen or two — scanning the column of names is the point, and a
 * row that fills the viewport stops being a list.
 */
export default function ProjectsPage() {
  const projects = publishedProjects();

  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="selected work"
        title="Work"
        lead="Built end to end."
      />

      <div className="container-wide pb-12">
        <ul className="border-b-2 border-line/20">
          {projects.map((project, index) => {
            const preview = project.imageLaptopView || project.image;

            return (
              <Reveal as="li" key={project.slug} delay={0.03}>
                <div className="group relative grid items-center gap-x-6 gap-y-3 border-t-2 border-line/20 py-4 md:grid-cols-12">
                  {/* The whole row is the link. It's an overlay rather than a
                      wrapper so the Live/Source anchors can sit above it —
                      nesting them inside another <a> isn't valid. */}
                  <Link
                    href={project.url}
                    aria-label={`${project.title} — read the write-up`}
                    className="absolute inset-0 z-0"
                  />

                  {/* Preview leads on phones — a thumb-scroller reads the
                      picture before the paragraph — and moves right at md. */}
                  {preview && (
                    <div className="pointer-events-none order-first md:order-none md:col-span-3 md:col-start-10 md:row-start-1 md:justify-self-end">
                      <div className="relative aspect-[16/10] w-full max-w-[220px] md:w-[240px]">
                        <Image
                          src={preview}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 22vw, 55vw"
                          className="object-contain transition-transform duration-700 ease-spring group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="pointer-events-none md:col-span-9 md:col-start-1 md:row-start-1">
                    <div className="mb-0.5 flex flex-wrap items-center gap-x-3">
                      <span className="hand text-base text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="label">
                        {format(new Date(project.date), 'MMM yyyy')}
                      </span>

                      {/* Lifted above the row link so they stay separately
                          clickable and keyboard-reachable. */}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost pointer-events-auto relative z-10 !gap-1 !text-[0.7rem]"
                        >
                          <FiExternalLink className="h-3 w-3" />
                          Live
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost pointer-events-auto relative z-10 !gap-1 !text-[0.7rem]"
                        >
                          <FiGithub className="h-3 w-3" />
                          Source
                        </a>
                      )}
                    </div>

                    <h2 className="flex items-start gap-2 font-display text-[1.4rem] text-ink transition-colors duration-300 group-hover:text-accent sm:text-[1.6rem] md:text-[1.85rem]">
                      {project.title}
                      <FiArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent opacity-0 transition-all duration-300 ease-spring group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </h2>

                    <p className="mt-1 line-clamp-2 max-w-2xl text-[0.875rem] leading-relaxed text-muted">
                      {project.tagline || project.description}
                    </p>

                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {stackSummary(project, 3).map((item) => (
                        <li
                          key={item}
                          className="chip !px-2.5 !py-0.5 !text-[0.65rem] font-mono"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
