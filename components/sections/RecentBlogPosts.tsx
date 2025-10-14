import Link from 'next/link';
import { allPosts } from '@/.contentlayer/generated';
import BlogCard from '@/components/ui/BlogCard';

export default function RecentBlogPosts() {
  const recentPosts = allPosts
    .filter((post: any) => post.published)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-24">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Recent Blog Posts
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Thoughts on web development, technology, and more
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog" className="btn-primary">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}
