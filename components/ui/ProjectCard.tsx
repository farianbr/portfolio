import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Project } from '@/.contentlayer/generated';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="card group h-full transition-transform hover:scale-105">
      {/* Image */}
      {project.image && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={project.date}>
            {format(new Date(project.date), 'MMM d, yyyy')}
          </time>
        </div>

        <Link href={project.url} className="group">
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 flex-1 text-gray-600 dark:text-gray-400">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag: any) => (
              <span
                key={tag}
                className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              aria-label="View on GitHub"
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
              className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              aria-label="View live demo"
            >
              <FiExternalLink className="h-4 w-4" />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
