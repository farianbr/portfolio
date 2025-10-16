import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPosts } from '@/.contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { format } from 'date-fns';
import Link from 'next/link';
import { FiArrowLeft, FiClock } from 'react-icons/fi';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = allPosts.find((p: any) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <article className="container-custom py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Back Button */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <FiArrowLeft className="h-4 w-4" />
          View All Posts
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {post.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={post.date}>
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span className="flex items-center gap-1">
              <FiClock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: any) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXContent />
        </div>
      </div>
    </article>
  );
}
