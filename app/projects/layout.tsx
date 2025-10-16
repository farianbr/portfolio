import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of web development projects, including full-stack applications, AI integrations, and modern web experiences.',
  keywords: [
    'Projects',
    'Portfolio',
    'Web Development',
    'Full-Stack',
    'React',
    'Next.js',
    'TypeScript',
  ],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
