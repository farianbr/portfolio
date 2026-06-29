import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

/**
 * Single source of truth for site-wide constants: identity, navigation,
 * social links, and SEO defaults. Importing from here keeps these values
 * consistent across the header, footer, hero, contact page, and metadata.
 */

export const siteConfig = {
  name: 'Farian Bin Rahman',
  shortName: 'Farian',
  role: 'Full-Stack Developer',
  // A specific, recruiter-facing value proposition (not a generic tagline).
  tagline:
    'I design and build fast, reliable web applications — from real-time collaboration tools to data-rich dashboards.',
  description:
    'Full-stack developer focused on clean architecture, thoughtful UX, and performance. I build production-grade web apps with React, Next.js, and TypeScript.',
  // Update to the production domain when deployed.
  url: 'https://farian.me',
  email: 'farianrahman1000@gmail.com',
  locale: 'en_US',
  resume: '/resume/Farian_Bin_Rahman_Resume.pdf',
  ogImage: '/images/profile.png',
} as const;

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
] as const;

export type SocialLink = {
  name: string;
  href: string;
  icon: IconType;
  username?: string;
};

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/farianbr',
    icon: FiGithub,
    username: 'farianbr',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/farianb/',
    icon: FiLinkedin,
    username: 'farianb',
  },
  {
    name: 'X',
    href: 'https://x.com/IamFarian',
    icon: FaXTwitter,
    username: 'IamFarian',
  },
  {
    name: 'Email',
    href: `mailto:${siteConfig.email}`,
    icon: FiMail,
  },
];
