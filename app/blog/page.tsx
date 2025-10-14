import type { Metadata } from 'next';
import { allPosts } from '@/.contentlayer/generated';
import BlogCard from '@/components/ui/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Read my thoughts on web development, software engineering, and technology. Learn about React, Next.js, TypeScript, and more.',
};

export default function BlogPage() {
  const publishedPosts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container-custom py-16 md:py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Blog
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Thoughts, tutorials, and insights on web development and technology.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {publishedPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Empty State */}
      {publishedPosts.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No posts found. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
