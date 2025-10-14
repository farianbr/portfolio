import Link from 'next/link';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: FiLinkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: FiTwitter },
  { name: 'Email', href: 'mailto:contact@farian.dev', icon: FiMail },
];

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container-custom py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="mb-4 block text-xl font-bold text-gray-900 dark:text-white"
            >
              Farian<span className="text-primary-600">.</span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Full-stack developer passionate about building intelligent, modern
              web experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-primary-100 hover:text-primary-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-primary-900/20 dark:hover:text-primary-400"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center dark:border-gray-800">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Farian Bin Rahman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
