import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for collaborations, projects, or just to say hello. I\'m always open to discussing new opportunities.',
  keywords: [
    'Contact',
    'Get in Touch',
    'Hire',
    'Collaboration',
    'Web Developer',
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
