"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { allProjects } from "@/.contentlayer/generated";
import Image from "next/image";
import { format } from "date-fns";
import {
  FiGithub,
  FiExternalLink,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";
import { useMDXComponent } from "next-contentlayer2/hooks";

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

  const initialProject = projectSlug
    ? publishedProjects.find((p) => p.slug === projectSlug) ||
      publishedProjects[0]
    : publishedProjects[0];

  const [selectedProject, setSelectedProject] = useState(initialProject);
  const [isProjectListOpen, setIsProjectListOpen] = useState(false);

  useEffect(() => {
    if (projectSlug) {
      const project = publishedProjects.find((p) => p.slug === projectSlug);
      if (project) setSelectedProject(project);
    }
  }, [projectSlug, publishedProjects]);

  const handleOnClickProject = (project: any) => {
    navigate(`/projects?project=${project.slug}`);
    setSelectedProject(project);
    setIsProjectListOpen(false);
  };

  const MDXContent = useMDXComponent(selectedProject?.body.code || "");

  const listItemClass = (active: boolean) =>
    `w-full rounded-lg border p-3 text-left transition-colors ${
      active
        ? "border-accent/50 bg-accent/10"
        : "border-line/15 bg-surface/40 hover:border-accent/30"
    }`;

  const listTitleClass = (active: boolean) =>
    `mb-1 line-clamp-2 font-display text-base ${
      active ? "text-accent" : "text-ink"
    }`;

  return (
    <div className="min-h-screen">
      <div className="container-wide pb-12 pt-12 md:pb-16 md:pt-16">
        <div className="mb-10">
          <p className="eyebrow mb-3">the full collection</p>
          <h1 className="font-display text-4xl text-ink md:text-6xl">
            Projects
          </h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left — project index */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:w-64 lg:flex-shrink-0"
          >
            {/* Mobile dropdown */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsProjectListOpen(!isProjectListOpen)}
                className="card flex w-full items-center justify-between p-4 text-left"
                aria-expanded={isProjectListOpen}
              >
                <span className="line-clamp-1 font-display text-lg text-ink">
                  {selectedProject?.title}
                </span>
                <FiChevronDown
                  className={`ml-2 h-5 w-5 flex-shrink-0 text-accent transition-transform ${
                    isProjectListOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isProjectListOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="card mt-2 overflow-hidden p-0"
                  >
                    <div className="max-h-[60vh] space-y-2 overflow-y-auto p-2">
                      <p className="eyebrow px-2 py-1">all {publishedProjects.length}</p>
                      {publishedProjects.map((project) => {
                        const active = selectedProject?.slug === project.slug;
                        return (
                          <button
                            key={project.slug}
                            onClick={() => handleOnClickProject(project)}
                            className={listItemClass(active)}
                          >
                            <h3 className={listTitleClass(active)}>
                              {project.title}
                            </h3>
                            <p className="label">
                              {format(new Date(project.date), "MMM yyyy")}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop list */}
            <div className="hidden space-y-2 lg:sticky lg:top-24 lg:block">
              <p className="eyebrow mb-4">all {publishedProjects.length}</p>
              {publishedProjects.map((project, index) => {
                const active = selectedProject?.slug === project.slug;
                return (
                  <motion.button
                    key={project.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.04 * index }}
                    onClick={() => handleOnClickProject(project)}
                    className={listItemClass(active)}
                  >
                    <h3 className={listTitleClass(active)}>{project.title}</h3>
                    <p className="label">
                      {format(new Date(project.date), "MMM yyyy")}
                    </p>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Right — detail */}
          <motion.main
            key={selectedProject?.slug}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="min-w-0 flex-1"
          >
            <article className="card overflow-hidden p-0">
              {/* Header */}
              <div className="border-b border-line/10 p-5 md:p-7 lg:p-8">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <span className="label flex items-center gap-1.5">
                    <FiCalendar className="h-3 w-3" />
                    <time dateTime={selectedProject?.date}>
                      {format(
                        new Date(selectedProject?.date || new Date()),
                        "MMMM d, yyyy"
                      )}
                    </time>
                  </span>
                </div>

                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <h2 className="font-display text-3xl text-ink md:text-4xl">
                    {selectedProject?.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProject?.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                        className="btn-secondary !px-4 !py-2"
                      >
                        <FiGithub className="h-4 w-4" />
                        Source
                      </a>
                    )}
                    {selectedProject?.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open live demo"
                        className="btn-primary !px-4 !py-2"
                      >
                        <FiExternalLink className="h-4 w-4" />
                        Live
                      </a>
                    )}
                  </div>
                </div>

                {selectedProject?.tags && selectedProject.tags.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {selectedProject.tags.map((tag: any) => (
                      <span key={tag} className="label !text-accent/80">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 md:p-7 lg:p-8">
                {selectedProject?.image && (
                  <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-lg border border-line/10 bg-canvas">
                    <Image
                      src={
                        selectedProject.imageMultiView || selectedProject.image
                      }
                      alt={selectedProject.title}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-contain p-2"
                      priority
                    />
                  </div>
                )}

                <div className="prose max-w-none">
                  <MDXContent />
                </div>

                {/* Footer info */}
                <div className="mt-10 grid gap-4 border-t border-line/10 pt-8 sm:grid-cols-2 md:gap-6">
                  <div className="rounded-lg border border-line/15 bg-surface/40 p-5">
                    <h3 className="eyebrow mb-3">find it here</h3>
                    <div className="space-y-2">
                      {selectedProject?.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                        >
                          <FiGithub className="h-4 w-4 flex-shrink-0" />
                          Source code
                        </a>
                      )}
                      {selectedProject?.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                        >
                          <FiExternalLink className="h-4 w-4 flex-shrink-0" />
                          Live demo
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg border border-accent/20 bg-accent/[0.05] p-5">
                    <h3 className="eyebrow mb-3">built with</h3>
                    <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                      {selectedProject?.tags?.map((tag: any) => (
                        <span key={tag} className="label !text-ink">
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
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-line/20 border-t-accent" />
            <p className="hand mt-4 text-xl text-muted">loading…</p>
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
