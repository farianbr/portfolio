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
          className="btn-ghost mb-8"
        >
          <FiArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        {/* Header */}
        <header className="mb-8 border-b-2 border-line/20 pb-8">
          <h1 className="mb-4 text-balance font-display text-4xl text-ink md:text-5xl">
            {post.title}
          </h1>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <time dateTime={post.date} className="label">
              {format(new Date(post.date), 'MMMM d, yyyy')}
            </time>
            <span className="label flex items-center gap-1.5">
              <FiClock className="h-3 w-3" />
              {post.readingTime}
            </span>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {post.tags.map((tag: any) => (
                <span key={tag} className="label !text-accent/80">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <MDXContent />
        </div>
      </div>
    </article>
  );
}
