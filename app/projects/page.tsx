"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { allProjects } from "@/.contentlayer/generated";
import Image from "next/image";
import { format } from "date-fns";
import {
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiTag,
  FiChevronDown,
} from "react-icons/fi";
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
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);

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
    setIsProjectListOpen(false); // Close dropdown on mobile
  };

  const MDXContent = useMDXComponent(selectedProject?.body.code || "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container-custom pb-12 pt-6 md:pt-8 md:pb-16">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Side - Compact Project List (Desktop) / Expandable Dropdown (Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-64"
          >
            {/* Mobile Dropdown Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsProjectListOpen(!isProjectListOpen)}
                className="w-full rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm transition-all dark:border-gray-800 dark:bg-gray-900/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">
                      {selectedProject?.title}
                    </h3>
                  </div>
                  <FiChevronDown
                    className={`ml-2 h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${
                      isProjectListOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Mobile Dropdown List */}
              <AnimatePresence>
                {isProjectListOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="max-h-[60vh] overflow-y-auto p-2">
                      <div className="mb-2 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        All Projects ({publishedProjects.length})
                      </div>
                      {publishedProjects.map((project) => (
                        <button
                          key={project.slug}
                          onClick={() => handleOnClickProject(project)}
                          className={`w-full rounded-lg border p-3 text-left transition-all mb-2 ${
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
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop List - Always Visible */}
            <div className="hidden lg:block space-y-2">
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
              <div className="border-b border-gray-200 p-4 md:p-6 lg:p-8 dark:border-gray-800">
                <div className="mb-3 md:mb-4 flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <time dateTime={selectedProject?.date}>
                      {format(
                        new Date(selectedProject?.date || new Date()),
                        "MMMM d, yyyy"
                      )}
                    </time>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
                    {selectedProject?.title}
                  </h2>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {selectedProject?.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border border-gray-200 bg-white/70 backdrop-blur-sm text-gray-700 dark:bg-gray-800/60 dark:border-gray-700 dark:text-gray-200 transition-transform duration-150 hover:translate-y-[-1px] hover:shadow-sm"
                      >
                        <FiGithub className="h-4 w-4" />
                        <span className="hidden sm:inline">Source</span>
                      </a>
                    )}

                    {selectedProject?.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open live demo"
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-sm transition-transform duration-150 hover:translate-y-[-1px] hover:brightness-105"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        <span className="hidden sm:inline">Live</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {selectedProject?.tags && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <FiTag className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                    {selectedProject.tags.map((tag: any) => (
                      <span
                        key={tag}
                        className="rounded-full border border-primary-200 bg-primary-50 px-2 md:px-3 py-0.5 md:py-1 text-xs md:text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Content (MDX) */}
              <div className="bg-gradient-to-b from-transparent via-gray-50/30 to-transparent dark:via-gray-800/10 p-4 md:p-6 lg:p-8 dark:border-gray-800">
                {/* Project Image */}
                {selectedProject?.image && (
                  <div className="relative mb-6 md:mb-8 lg:mb-10 aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg">
                    <Image
                      src={
                        selectedProject.imageMultiView || selectedProject.image
                      }
                      alt={selectedProject.title}
                      fill
                      className="object-contain p-2 transition-transform duration-500"
                      priority
                    />
                  </div>
                )}

                {/* MDX Content with better styling */}
                <div className="prose max-w-none">
                  <MDXContent />
                </div>

                {/* Additional Info Section */}
                <div className="mt-8 md:mt-12 grid gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-200 dark:border-gray-800 sm:grid-cols-2">
                  {/* GitHub Stats or Additional Info */}
                  <div className="rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="mb-3 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                      Project Links
                    </h3>
                    <div className="space-y-2 md:space-y-3">
                      {selectedProject?.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiGithub className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                          <span>Source Code</span>
                        </a>
                      )}
                      {selectedProject?.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiExternalLink className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="rounded-lg bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 p-4 md:p-6 border border-primary-200 dark:border-primary-800">
                    <h3 className="mb-3 text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject?.tags &&
                        selectedProject.tags.map((tag: any) => (
                          <span
                            key={tag}
                            className="rounded-md bg-white dark:bg-gray-900 px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
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
