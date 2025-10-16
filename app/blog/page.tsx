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
      <div className="container-custom pb-12 pt-4 md:pt-4 md:pb-16">
        {/* Sort Controls */}
        <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
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
            {paginatedPosts.map((post) => (
              <article
                key={post.slug}
                className="group py-6 first:pt-0 last:pb-0"
              >
                <Link
                  href={post.url}
                  className="block transition-all hover:pl-2"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      {/* Title */}
                      <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        {post.title}
                        <FiArrowRight className="ml-2 inline-block opacity-0 transition-all group-hover:translate-x-2 group-hover:opacity-100" />
                      </h2>

                      {/* Description */}
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 md:text-base">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag: any) => (
                            <span
                              key={tag}
                              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Meta Info */}
                    <div className="flex shrink-0 flex-col items-start gap-2 text-sm text-gray-500 dark:text-gray-400 md:items-end md:text-right">
                      <div className="flex items-center gap-1.5">
                        <FiCalendar className="h-4 w-4" />
                        <time dateTime={post.date}>
                          {format(new Date(post.date), "MMM d, yyyy")}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FiClock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mx-auto mt-12 flex max-w-4xl items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 p-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Previous page"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-primary-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 p-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Next page"
            >
              <FiChevronRight className="h-5 w-5" />
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
