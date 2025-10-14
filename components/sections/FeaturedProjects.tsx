import Link from 'next/link';
import { allProjects } from '@/.contentlayer/generated';
import ProjectCard from '@/components/ui/ProjectCard';

export default function FeaturedProjects() {
  const featuredProjects = allProjects
    .filter((project: any) => project.published)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Check out some of my recent work
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects" className="btn-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
