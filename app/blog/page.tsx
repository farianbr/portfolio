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
  FiBookOpen,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container-custom pb-12 pt-6 md:pt-8 md:pb-16">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center my-8 md:my-12"
        >
          <section className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Blog & Insights
            </h1>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Technical articles, tutorials, and insights on web development,
              best practices, and the latest technologies I'm exploring.
            </p>

            <div className="mt-6 flex justify-center">
              <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></div>
            </div>
          </section>
        </motion.div>

        {/* Sort Controls */}
        <div className="mx-auto mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {publishedPosts.length}{" "}
            {publishedPosts.length === 1 ? "post" : "posts"}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Sort by:
            </span>
            <button
              onClick={() => setSortBy("date")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sortBy === "date"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              Date
            </button>
            <button
              onClick={() => setSortBy("readTime")}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                sortBy === "readTime"
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              Read Time
            </button>
          </div>
        </div>

        {/* Posts List - Simple Design */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {paginatedPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group py-4 md:py-6 first:pt-0 last:pb-0"
              >
                <Link
                  href={post.url}
                  className="block transition-all hover:pl-2"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex-1">
                      {/* Title */}
                      <h2 className="mb-2 text-lg md:text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        {post.title}
                        <FiArrowRight className="ml-2 inline-block opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                      </h2>

                      {/* Description */}
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 md:text-base line-clamp-2">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag: any) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-2 md:px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="rounded-full bg-gray-100 px-2 md:px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "MMM d, yyyy")}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span>{post.readingTime}</span>
                      </div>
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
              className="rounded-lg border border-gray-300 p-1.5 md:p-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Previous page"
            >
              <FiChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            <div className="flex gap-1 md:gap-2 overflow-x-auto max-w-[200px] md:max-w-none">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-colors flex-shrink-0 ${
                      currentPage === page
                        ? "bg-primary-600 text-white"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
              className="rounded-lg border border-gray-300 p-1.5 md:p-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Next page"
            >
              <FiChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {publishedPosts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              No posts found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
