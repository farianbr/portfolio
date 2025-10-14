import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Post } from '@/.contentlayer/generated';
import { FiClock } from 'react-icons/fi';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card group h-full transition-transform hover:scale-105">
      {/* Image */}
      {post.image && (
        <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-110"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col">
        <div className="mb-2 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMM d, yyyy')}
          </time>
          <span className="flex items-center gap-1">
            <FiClock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>

        <Link href={post.url} className="group">
          <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
            {post.title}
          </h3>
        </Link>

        <p className="mb-4 flex-1 text-gray-600 dark:text-gray-400">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: any) => (
              <span
                key={tag}
                className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
