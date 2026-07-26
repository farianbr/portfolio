import Link from 'next/link';
import Image from 'next/image';
import { FiArrowUpRight, FiExternalLink } from 'react-icons/fi';

import { publishedProjects, featuresOf, galleryOf, stackSummary } from '@/lib/projects';
import Reveal from '@/components/ui/Reveal';

/**
 * Home-page work section.
 *
 * Three equal cards say "pick one at random". This gives the lead project the
 * room to make its case — including the titles of the decisions inside it,
 * which is the actual reason to click — and lists the rest by name. Hierarchy
 * is the recommendation.
 */
export default function ProjectsSection() {
  const projects = publishedProjects();

  if (projects.length === 0) return null;

  const [lead, ...rest] = projects;
  const leadShot = galleryOf(lead)[0];
  const leadImage = leadShot?.src ?? lead.imageLaptopView ?? lead.image;
  const leadFeatures = featuresOf(lead).slice(0, 3);

  return (
    <section id="projects" className="section scroll-mt-24">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-2">selected work</p>
          <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
            Built end to end
          </h2>
        </Reveal>

        {/* Lead project */}
        <Reveal delay={0.05} className="mt-10">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Link
                href={lead.url}
                className="group block"
                aria-label={`${lead.title} — read the write-up`}
                tabIndex={-1}
              >
                {leadShot ? (
                  <div className="overflow-hidden rounded-xl border-2 border-line/20 bg-surface shadow-hard transition-shadow duration-500 ease-spring group-hover:shadow-hard-lg">
                    <div className="flex items-center gap-1.5 border-b-2 border-line/20 px-3.5 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-ink/15" />
                      <span className="h-2 w-2 rounded-full bg-ink/15" />
                      <span className="h-2 w-2 rounded-full bg-ink/15" />
                    </div>
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={leadShot.src}
                        alt={leadShot.alt}
                        fill
                        sizes="(min-width: 1024px) 780px, 100vw"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                ) : (
                  leadImage && (
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={leadImage}
                        alt={`${lead.title} preview`}
                        fill
                        sizes="(min-width: 1024px) 780px, 100vw"
                        className="object-contain"
                      />
                    </div>
                  )
                )}
              </Link>
            </div>

            <div className="lg:col-span-5">
              <p className="label mb-3 !text-accent/90">
                {lead.caseStudy ? 'case study' : 'write-up'}
              </p>

              <h3 className="font-display text-3xl text-ink md:text-[2.75rem]">
                <Link href={lead.url} className="group inline-flex items-start gap-2 transition-colors hover:text-accent">
                  {lead.title}
                  <FiArrowUpRight className="mt-1.5 h-5 w-5 shrink-0 text-accent opacity-0 transition-all duration-300 ease-spring group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </h3>

              <p className="mt-4 leading-relaxed text-muted">
                {lead.tagline || lead.description}
              </p>

              {leadFeatures.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {leadFeatures.map((feature) => (
                    <li
                      key={feature.name}
                      className="flex gap-3 font-medium text-[1.02rem] leading-snug text-ink/85"
                    >
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      {feature.name}
                    </li>
                  ))}
                </ul>
              )}

              <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
                {stackSummary(lead, 5).map((item) => (
                  <li
                    key={item}
                    className="chip !text-[0.7rem] font-mono"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={lead.url} className="btn-primary">
                  Read the write-up
                  <FiArrowUpRight className="h-4 w-4" />
                </Link>
                {lead.demo && (
                  <a
                    href={lead.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <FiExternalLink className="h-4 w-4" />
                    Try it
                  </a>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* The rest, by name */}
        {rest.length > 0 && (
          <div className="mt-14">
            <p className="eyebrow mb-2">also on the shelf</p>
            <ul>
              {rest.map((project, index) => (
                <Reveal as="li" key={project.slug} delay={index * 0.04}>
                  <Link
                    href={project.url}
                    className="group grid items-baseline gap-x-6 gap-y-2 border-b-2 border-line/20 py-6 md:grid-cols-12"
                  >
                    <span className="hand text-xl text-accent md:col-span-1">
                      {String(index + 2).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-2xl text-ink transition-colors duration-300 group-hover:text-accent md:col-span-4 md:text-[1.75rem]">
                      {project.title}
                    </h3>
                    <p className="text-[0.95rem] leading-relaxed text-muted md:col-span-6">
                      {project.tagline || project.description}
                    </p>
                    <FiArrowUpRight className="hidden h-5 w-5 justify-self-end text-accent opacity-0 transition-all duration-300 ease-spring group-hover:translate-x-0.5 group-hover:opacity-100 md:col-span-1 md:block" />
                  </Link>
                </Reveal>
              ))}
            </ul>

            <Reveal className="mt-8">
              <Link href="/projects" className="btn-secondary">
                All work
                <FiArrowUpRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
