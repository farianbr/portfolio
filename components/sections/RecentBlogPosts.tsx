"use client";

import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { allPosts } from "@/.contentlayer/generated";
import {
  FiClock,
  FiCalendar,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";

export default function RecentBlogPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const publishedPosts = allPosts
    .filter((post: any) => post.published)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = publishedPosts.slice(
    startIndex,
    startIndex + postsPerPage
  );

  return (
    <section id="blog" className="section scroll-mt-24">
      <div className="container-wide relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <p className="eyebrow mb-3">straight from the notebook</p>
          <h2 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
            Writing &amp; notes
          </h2>
        </motion.div>

        {/* Blog List */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-line/10 border-y border-line/10">
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="group"
              >
                <Link href={post.url} className="block py-5 transition-colors hover:bg-accent/[0.03]">
                  <div className="flex items-start justify-between gap-4 px-1 sm:px-2">
                    <div className="flex-1">
                      {/* Meta Info */}
                      <div className="mb-1.5 flex flex-wrap items-center gap-4">
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

                      {/* Title */}
                      <h3 className="mb-1.5 font-display text-xl text-ink transition-colors group-hover:text-accent sm:text-2xl">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-2 line-clamp-2 text-sm text-muted">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {post.tags.slice(0, 4).map((tag: any) => (
                            <span key={tag} className="label !text-accent/80">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 pt-1">
                      <FiChevronRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 flex items-center justify-center gap-2"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-line/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded-full px-4 py-2 text-sm transition-colors ${
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
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="rounded-full border border-line/20 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
