'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { allPosts } from '@/.contentlayer/generated';
import { FiClock, FiArrowRight, FiCalendar, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';

export default function RecentBlogPosts() {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  
  const publishedPosts = allPosts
    .filter((post: any) => post.published)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const totalPages = Math.ceil(publishedPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = publishedPosts.slice(startIndex, startIndex + postsPerPage);

  return (
    <section id="blog" className="relative overflow-hidden py-12 md:py-16">
      {/* Background decoration */}
      
      <div className="container-custom relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 dark:border-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
            <FiClock className="h-4 w-4" />
            Latest Articles
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            From the Blog
            
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-400 sm:text-lg">
            Insights, tutorials, and thoughts on web development and technology
          </p>
        </motion.div>

        {/* Blog List */}
        <div className="mx-auto max-w-4xl">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {currentPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                className="group py-5 first:pt-0 last:pb-0"
              >
                <Link href={post.url} className="block">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {/* Meta Info */}
                      <div className="mb-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FiCalendar className="h-3.5 w-3.5" />
                          <time dateTime={post.date}>
                            {format(new Date(post.date), 'MMM d, yyyy')}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <FiClock className="h-3.5 w-3.5" />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-1.5 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 sm:text-xl">
                        {post.title}
                      </h3>

                      {/* Description */}
                      <p className="mb-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {post.description}
                      </p>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.slice(0, 4).map((tag: any) => (
                            <span
                              key={tag}
                              className="text-xs font-medium text-primary-600 dark:text-primary-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Arrow Icon */}
                    <div className="flex-shrink-0 pt-1">
                      <FiChevronRight className="h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
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
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Previous
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* View All Button */}
          {publishedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <Link
                href="/blog"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 p-[2px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/50"
              >
                <span className="inline-flex items-center gap-2 rounded-[10px] bg-white px-8 py-4 text-base font-semibold text-gray-900 transition-all duration-300 group-hover:bg-transparent group-hover:text-white dark:bg-gray-950 dark:text-white">
                  View All Articles
                  <FiArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
