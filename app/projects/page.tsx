import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';

import { publishedProjects, stackSummary } from '@/lib/projects';
import Reveal from '@/components/ui/Reveal';

/**
 * The work index — a ledger, not a card wall.
 *
 * Each project gets one row: number, name, the one-line version, what it's
 * built with, and a preview. Scanning the column of names should be enough to
 * pick one; everything else on the row is there to help you skip it.
 */
export default function ProjectsPage() {
  const projects = publishedProjects();

  return (
    <div className="min-h-screen">
      <header className="container-wide pb-4 pt-20 md:pt-28">
        <p className="eyebrow mb-2">selected work</p>
        <h1
          className="font-display text-ink"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', lineHeight: 0.96 }}
        >
          Work
        </h1>
        <p className="mt-5 max-w-2xl font-medium text-base leading-relaxed text-muted md:text-lg">
          {projects.length} projects built end to end — the strongest first.
        </p>
      </header>

      <div className="container-wide pb-8">
        <ul>
          {projects.map((project, index) => {
            const preview = project.imageLaptopView || project.image;

            return (
              <Reveal as="li" key={project.slug} delay={0.04}>
                <div className="group relative border-t-2 border-line/20 py-7 md:py-10">
                  <Link
                    href={project.url}
                    className="grid items-center gap-4 md:grid-cols-12 md:gap-10"
                    aria-label={`${project.title} — read the write-up`}
                  >
                    {/* Preview leads on phones — a thumb-scroller reads the
                        picture before the paragraph — and moves right at md. */}
                    {preview && (
                      <div className="order-first md:order-none md:col-span-5 md:col-start-8 md:row-start-1">
                        <div className="relative aspect-[16/10] w-full">
                          <Image
                            src={preview}
                            alt={`${project.title} preview`}
                            fill
                            sizes="(min-width: 768px) 40vw, 100vw"
                            className="object-contain transition-transform duration-700 ease-spring group-hover:scale-[1.03]"
                          />
                        </div>
                      </div>
                    )}

                    <div className="md:col-span-6 md:col-start-2 md:row-start-1">
                      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="hand text-xl text-accent">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="label">
                          {format(new Date(project.date), 'MMM yyyy')}
                        </span>
                        {project.caseStudy && (
                          <span className="label !text-accent/90">
                            · case study
                          </span>
                        )}
                      </div>

                      <h2 className="flex items-start gap-2 font-display text-[1.75rem] text-ink transition-colors duration-300 group-hover:text-accent sm:text-3xl md:text-[2.4rem]">
                        {project.title}
                        <FiArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-accent opacity-0 transition-all duration-300 ease-spring group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </h2>

                      <p className="mt-2.5 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-base">
                        {project.tagline || project.description}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
                        {stackSummary(project).map((item) => (
                          <li
                            key={item}
                            className="chip !text-[0.7rem] font-mono"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>

                  {/* Outside the card link so these stay separately reachable. */}
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 md:ml-[8.333%] md:pl-4">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                      >
                        <FiExternalLink className="h-3.5 w-3.5" />
                        Live
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost"
                      >
                        <FiGithub className="h-3.5 w-3.5" />
                        Source
                      </a>
                    )}
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
