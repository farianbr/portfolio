"use client";

import { motion } from "framer-motion";
import { allProjects } from "@/.contentlayer/generated";
import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiExternalLink, FiArrowRight } from "react-icons/fi";

export default function ProjectsSection() {
  const publishedProjects = allProjects
    .filter((project: any) => project.published)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3); // Only show first 3 projects

  return (
    <section id="projects" className="relative overflow-hidden py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"></div>

      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            <span className="relative">
              <span className="">Recent Projects</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Showcasing my latest work in modern web development
          </p>
        </motion.div>

        {/* Project List - Vertical Layout */}
        <div className="mx-auto max-w-4xl space-y-10">
          {publishedProjects.map((project) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:border-primary-300 dark:hover:border-primary-300 dark:hover:border-opacity-15 hover:shadow-xl dark:hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/90"
            >
              <div className="grid gap-6 md:grid-cols-5 w-full">
                {/* Image Section - More Prominent with 5:4 ratio */}
                {project.image && (
                  <Link
                    href={`/projects?project=${project.slug}`}
                    className="relative md:col-span-2 block"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 "
                      />
                    </div>
                  </Link>
                )}

                {/* Content Section */}
                <div
                  className={`flex flex-col justify-center p-6 md:p-7 ${project.image ? "md:col-span-3" : "md:col-span-5"}`}
                >
                  {/* Title */}
                  <Link href={`/projects?project=${project.slug}`}>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors hover:text-primary-600 dark:text-white dark:hover:text-primary-400 md:text-3xl">
                      {project.title}
                      <FiArrowRight className="ml-2 inline-block opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                    </h3>
                  </Link>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="mb-5 flex flex-wrap gap-2">
                      {project.tags.map((tag: any) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-all hover:border-primary-300 hover:bg-primary-100 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:border-primary-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                        aria-label="View on GitHub"
                      >
                        <FiGithub className="h-4 w-4" />
                        View Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-primary-700 hover:to-purple-700 hover:shadow-lg"
                        aria-label="View live demo"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Show More Button */}
        {allProjects.filter((p: any) => p.published).length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 to-purple-600 p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
            >
              <span className="inline-flex items-center gap-2 rounded-[10px] bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 group-hover:bg-transparent group-hover:text-white dark:bg-gray-950 dark:text-white">
                View All Projects
                <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>
        )}

        {/* Empty State */}
        {publishedProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No projects found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
