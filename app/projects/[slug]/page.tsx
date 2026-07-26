import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer2/hooks';

import {
  featuresOf,
  findProject,
  galleryOf,
  projectNeighbours,
  publishedProjects,
  stackOf,
} from '@/lib/projects';
import { siteConfig } from '@/lib/site.config';
import Reveal from '@/components/ui/Reveal';
import ProjectMasthead from '@/components/projects/ProjectMasthead';
import FeatureList from '@/components/projects/FeatureList';
import Walkthrough from '@/components/projects/Walkthrough';
import StackList from '@/components/projects/StackList';
import ProjectFooterNav from '@/components/projects/ProjectFooterNav';

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return publishedProjects().map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = findProject(params.slug);

  if (!project) return { title: 'Project not found' };

  const description = project.tagline || project.description;

  return {
    title: project.title,
    description,
    alternates: { canonical: project.url },
    openGraph: {
      title: `${project.title} — ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${project.url}`,
      images: [project.image ?? siteConfig.ogImage],
      type: 'article',
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = findProject(params.slug);

  if (!project) notFound();

  const MDXContent = useMDXComponent(project.body.code);
  const { previous, next } = projectNeighbours(project.slug);
  const hero = project.imageLaptopView || project.image;

  return (
    <div className="min-h-screen">
      <ProjectMasthead project={project} />

      {/* Opening object — the app as a thing on a desk, before any prose. */}
      {hero && (
        <div className="container-wide relative pt-8 md:pt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/3 h-[30vmin] w-[60vmin] -translate-x-1/2 rounded-full opacity-[0.07] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse, rgb(var(--accent)), transparent 70%)',
            }}
          />
          <Reveal className="relative mx-auto max-w-2xl">
            <Image
              src={hero}
              alt={`${project.title} running on a laptop`}
              width={1506}
              height={900}
              sizes="(min-width: 768px) 672px, 100vw"
              className="h-auto w-full"
              priority
            />
          </Reveal>
        </div>
      )}

      {project.caseStudy ? (
        <>
          <FeatureList features={featuresOf(project)} />
          <Walkthrough shots={galleryOf(project)} />
          <StackList stack={stackOf(project)} />
        </>
      ) : (
        /* Not migrated yet — render the MDX write-up and its tags. */
        <>
          <section className="container-wide py-12 md:py-16">
            <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-3">
                <p className="eyebrow mb-3 lg:sticky lg:top-28">what it is</p>
              </Reveal>
              <Reveal delay={0.05} className="lg:col-span-9">
                <div className="prose max-w-[68ch]">
                  <MDXContent />
                </div>
              </Reveal>
            </div>
          </section>

          {project.tags.length > 0 && (
            <StackList
              stack={[{ group: 'Built with', items: [...project.tags] }]}
            />
          )}
        </>
      )}

      <ProjectFooterNav previous={previous} next={next} />
    </div>
  );
}
