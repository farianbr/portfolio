"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { allProjects } from "@/.contentlayer/generated";
import Image from "next/image";
import { format } from "date-fns";
import { FiGithub, FiExternalLink, FiCalendar, FiTag } from "react-icons/fi";
import { useMDXComponent } from "next-contentlayer2/hooks";
import { useRouter } from "next/navigation";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const navigate = useRouter().push;

  const projectSlug = searchParams.get("project");

  const publishedProjects = allProjects
    .filter((project: any) => project.published)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  // Find project by slug or default to first
  const initialProject = projectSlug
    ? publishedProjects.find((p) => p.slug === projectSlug) ||
      publishedProjects[0]
    : publishedProjects[0];

  const [selectedProject, setSelectedProject] = useState(initialProject);

  // Update selected project when query parameter changes
  useEffect(() => {
    if (projectSlug) {
      const project = publishedProjects.find((p) => p.slug === projectSlug);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [projectSlug, publishedProjects]);

  const handleOnClickProject = (project: any) => {
    navigate(`/projects?project=${project.slug}`);
    setSelectedProject(project);
  };

  const MDXContent = useMDXComponent(selectedProject?.body.code || "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container-custom pb-12 pt-6 md:pt-8 md:pb-16">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Side - Compact Project List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-64"
          >
            <div className="space-y-2">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Projects ({publishedProjects.length})
              </div>

              {publishedProjects.map((project, index) => (
                <motion.button
                  key={project.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  onClick={() => handleOnClickProject(project)}
                  className={`group w-full rounded-lg border p-3 text-left transition-all ${
                    selectedProject?.slug === project.slug
                      ? "border-primary-400 bg-primary-50 shadow-sm dark:border-primary-600 dark:bg-primary-900/20"
                      : "border-gray-200 bg-white hover:border-primary-200 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-800"
                  }`}
                >
                  <h3
                    className={`mb-1 text-sm font-semibold line-clamp-2 ${
                      selectedProject?.slug === project.slug
                        ? "text-primary-700 dark:text-primary-400"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {format(new Date(project.date), "MMM yyyy")}
                  </p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Project Detail */}
          <motion.main
            key={selectedProject?.slug}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
              {/* Project Header */}
              <div className="border-b border-gray-200 p-6 dark:border-gray-800 md:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="h-4 w-4" />
                    <time dateTime={selectedProject?.date}>
                      {format(
                        new Date(selectedProject?.date || new Date()),
                        "MMMM d, yyyy"
                      )}
                    </time>
                  </div>
                </div>

                <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                  {selectedProject?.title}
                </h1>

                <p className="mb-6 text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {selectedProject?.description}
                </p>

                {/* Tags */}
                {selectedProject?.tags && selectedProject.tags.length > 0 && (
                  <div className="mb-6 flex flex-wrap items-center gap-2">
                    <FiTag className="h-4 w-4 text-gray-400" />
                    {selectedProject.tags.map((tag: any) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {selectedProject?.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                    >
                      <FiGithub className="h-5 w-5" />
                      View Source
                    </a>
                  )}
                  {selectedProject?.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:from-primary-700 hover:to-purple-700 hover:shadow-lg"
                    >
                      <FiExternalLink className="h-5 w-5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content (MDX) */}
              <div className="p-6 dark:border-gray-800 md:p-8">
                {/* Project Image */}
                {selectedProject?.image && (
                  <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="prose prose-gray max-w-none dark:prose-invert lg:prose-lg">
                  <MDXContent />
                </div>
              </div>
            </article>
          </motion.main>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading projects...
            </p>
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
