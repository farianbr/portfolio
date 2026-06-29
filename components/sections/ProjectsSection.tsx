import { allProjects, type Project } from '@/.contentlayer/generated';
import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiArrowUpRight } from 'react-icons/fi';
import Reveal from '@/components/ui/Reveal';

function getFeaturedProjects(): Project[] {
  return allProjects
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}

export default function ProjectsSection() {
  const projects = getFeaturedProjects();
  const totalPublished = allProjects.filter((p) => p.published).length;

  return (
    <section id="projects" className="section scroll-mt-24">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-3">some things I&apos;ve built</p>
          <h2 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
            Selected work
          </h2>
        </Reveal>

        <div className="mt-12 space-y-8">
          {projects.map((project, index) => (
            <Reveal key={project.slug} as="article" delay={index * 0.05}>
              <div className="card group grid gap-0 overflow-hidden p-0 md:grid-cols-5">
                {/* Visual */}
                {project.image && (
                  <Link
                    href={`/projects?project=${project.slug}`}
                    className="relative flex items-center justify-center overflow-hidden border-b border-line/10 bg-canvas p-6 md:col-span-2 md:border-b-0 md:border-r"
                    aria-label={`View ${project.title}`}
                  >
                    <div className="relative aspect-[5/3] w-full">
                      <Image
                        src={project.imageLaptopView || project.image}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(min-width: 768px) 40vw, 90vw"
                        className="object-contain transition-transform duration-500 ease-spring group-hover:scale-[1.03]"
                      />
                    </div>
                    <span className="hand absolute left-4 top-3 text-2xl text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </Link>
                )}

                {/* Content */}
                <div
                  className={`flex flex-col justify-center p-6 sm:p-8 ${
                    project.image ? 'md:col-span-3' : 'md:col-span-5'
                  }`}
                >
                  <Link
                    href={`/projects?project=${project.slug}`}
                    className="group/title"
                  >
                    <h3 className="flex items-start gap-2 font-display text-2xl text-ink transition-colors group-hover/title:text-accent md:text-3xl">
                      {project.title}
                      <FiArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-accent opacity-0 transition-all duration-300 ease-spring group-hover:opacity-100" />
                    </h3>
                  </Link>

                  <p className="mt-3 leading-relaxed text-muted">
                    {project.description}
                  </p>

                  {project.tags?.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                      {project.tags.map((tag) => (
                        <li key={tag} className="label !text-accent/80">
                          #{tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/projects?project=${project.slug}`}
                      className="btn-primary"
                    >
                      Read more
                      <FiArrowUpRight className="h-4 w-4" />
                    </Link>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        aria-label={`${project.title} source on GitHub`}
                      >
                        <FiGithub className="h-4 w-4" />
                        Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        aria-label={`${project.title} live demo`}
                      >
                        <FiExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {totalPublished > projects.length && (
          <Reveal className="mt-10 text-center">
            <Link href="/projects" className="btn-secondary">
              See all projects
              <FiArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        )}

        {projects.length === 0 && (
          <p className="py-12 text-center text-muted">
            Nothing here yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
