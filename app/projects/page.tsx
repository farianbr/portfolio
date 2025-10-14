import type { Metadata } from 'next';
import { allProjects } from '@/.contentlayer/generated';
import ProjectCard from '@/components/ui/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of web development projects, featuring modern web applications built with React, Next.js, and TypeScript.',
};

export default function ProjectsPage() {
  const publishedProjects = allProjects
    .filter((project: any) => project.published)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container-custom py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A collection of projects I&apos;ve worked on, showcasing my skills in
          web development and software engineering.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {publishedProjects.map((project: any) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {publishedProjects.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No projects found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
