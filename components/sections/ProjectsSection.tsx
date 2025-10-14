'use client';

import { motion } from 'framer-motion';
import { allProjects } from '@/.contentlayer/generated';
import ProjectCard from '@/components/ui/ProjectCard';

export default function ProjectsSection() {
  const publishedProjects = allProjects
    .filter((project: any) => project.published)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section id="projects" className="bg-gray-50 py-16 dark:bg-gray-900/50 md:py-24">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            A collection of projects I&apos;ve worked on, showcasing my skills in
            web development and software engineering.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {publishedProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {publishedProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No projects found. Check back soon!
            </p>
          </div>
        )}

        {/* View All Link - if you want to keep individual project detail pages */}
        {publishedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Want to see more details? Check out individual project pages above.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
