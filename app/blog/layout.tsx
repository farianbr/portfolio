import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Technical articles, tutorials, and insights on web development, best practices, and the latest technologies.',
  keywords: [
    'Blog',
    'Web Development',
    'Tutorials',
    'Technical Writing',
    'Programming',
    'TypeScript',
    'React',
    'Next.js',
  ],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
