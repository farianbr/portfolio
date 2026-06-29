"use client";

import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { format } from "date-fns";
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const POSTS_PER_PAGE = 10;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"date" | "readTime">("date");

  const publishedPosts = useMemo(() => {
    const filtered = allPosts.filter((post) => post.published);

    // Sort based on selected option
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        // Sort by reading time (extract number from "X min read")
        const aTime = parseInt(a.readingTime?.match(/\d+/)?.[0] || "0");
        const bTime = parseInt(b.readingTime?.match(/\d+/)?.[0] || "0");
        return aTime - bTime;
      }
    });

    return sorted;
  }, [sortBy]);

  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return publishedPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [publishedPosts, currentPage]);

  return (
    <div className="min-h-screen">
      <div className="container-wide pb-12 pt-12 md:pt-16 md:pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 border-b border-line/15 pb-6"
        >
          <p className="eyebrow mb-3">things worth writing down</p>
          <h1 className="font-display text-4xl text-ink md:text-6xl">
            The journal
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted">
            Articles, tutorials, and half-formed thoughts on web development,
            the craft of building, and whatever I&apos;m currently exploring.
          </p>
        </motion.div>

        {/* Sort Controls */}
        <div className="mx-auto mb-8 flex flex-col gap-4 border-b border-line/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="label">
            {String(publishedPosts.length).padStart(2, '0')}{" "}
            {publishedPosts.length === 1 ? "entry" : "entries"}
          </div>
          <div className="flex items-center gap-2">
            <span className="label">sort:</span>
            {(["date", "readTime"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  sortBy === opt
                    ? "border border-accent/50 bg-accent/10 text-ink"
                    : "border border-line/15 text-muted hover:border-accent/40 hover:text-ink"
                }`}
              >
                {opt === "date" ? "Date" : "Read time"}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-line/10 border-b border-line/10">
            {paginatedPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <Link
                  href={post.url}
                  className="block py-5 transition-colors hover:bg-accent/[0.03] md:py-6"
                >
                  <div className="flex flex-col gap-3 px-1 sm:px-2">
                    <div className="flex-1">
                      {/* Title */}
                      <h2 className="mb-2 font-display text-xl text-ink transition-colors group-hover:text-accent md:text-2xl">
                        {post.title}
                        <FiArrowRight className="ml-2 inline-block opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                      </h2>

                      {/* Description */}
                      <p className="mb-3 line-clamp-2 text-sm text-muted md:text-base">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="mb-1 flex flex-wrap gap-x-3 gap-y-1">
                          {post.tags.slice(0, 3).map((tag: any) => (
                            <span key={tag} className="label !text-accent/80">
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="label">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4">
                      <span className="label flex items-center gap-1.5">
                        <FiCalendar className="h-3 w-3" />
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "MMM d, yyyy")}
                        </time>
                      </span>
                      <span className="label flex items-center gap-1.5">
                        <FiClock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mx-auto mt-8 md:mt-12 flex items-center justify-center gap-1 md:gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-md border border-line/20 p-2 text-muted transition-colors hover:border-accent/50 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous page"
            >
              <FiChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            <div className="flex max-w-[200px] gap-1 overflow-x-auto md:max-w-none md:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex-shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors md:px-4 md:py-2 ${
                      currentPage === page
                        ? "border border-accent/50 bg-accent/10 text-ink"
                        : "border border-line/20 text-muted hover:border-accent/40 hover:text-ink"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-md border border-line/20 p-2 text-muted transition-colors hover:border-accent/50 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next page"
            >
              <FiChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {publishedPosts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted">No entries found. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
