import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allProjects } from '@/.contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { format } from 'date-fns';
import Link from 'next/link';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allProjects.map((project: any) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = allProjects.find((p: any) => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = allProjects.find((p: any) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <article className="container-custom py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={project.date}>
              {format(new Date(project.date), 'MMMM d, yyyy')}
            </time>
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag: any) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <FiGithub className="mr-2 h-5 w-5" />
                View Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FiExternalLink className="mr-2 h-5 w-5" />
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </div>
    </article>
  );
}
