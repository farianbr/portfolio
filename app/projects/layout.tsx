import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Full-stack projects built end to end, written up as case studies — the data-model and realtime decisions behind each one, and what they cost.',
  keywords: [
    'Case studies',
    'Full-stack projects',
    'Realtime',
    'React',
    'Node',
    'PostgreSQL',
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
