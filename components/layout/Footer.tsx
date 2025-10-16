'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart, FiEye } from 'react-icons/fi';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: FiLinkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: FiTwitter },
  { name: 'Email', href: 'mailto:contact@farian.dev', icon: FiMail },
];

const footerLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    // Prevent double tracking
    if (isTracking) return;
    setIsTracking(true);

    // Track visitor and get count from API
    const trackVisit = async () => {
      try {
        // Check if this user has visited in this session
        const hasVisitedThisSession = sessionStorage.getItem('hasVisited');
        
        if (!hasVisitedThisSession) {
          // Increment visitor count
          const response = await fetch('/api/visitors', { method: 'POST' });
          const data = await response.json();
          setVisitorCount(data.count);
          sessionStorage.setItem('hasVisited', 'true');
        } else {
          // Just get the count
          const response = await fetch('/api/visitors');
          const data = await response.json();
          setVisitorCount(data.count);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
        // Fallback to localStorage
        const storedCount = localStorage.getItem('visitorCount');
        setVisitorCount(storedCount ? parseInt(storedCount, 10) : 0);
      }
    };
    
    trackVisit();
  }, []); // Empty dependency array

  return (
    <footer className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:border-gray-800 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-40 top-0 h-60 w-60 rounded-full bg-primary-200/20 blur-3xl dark:bg-primary-900/10"></div>
        <div className="absolute -right-40 bottom-0 h-60 w-60 rounded-full bg-purple-200/20 blur-3xl dark:bg-purple-900/10"></div>
      </div>

      <div className="container-custom relative py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="mb-4 inline-block text-2xl font-bold text-gray-900 dark:text-white"
            >
              Farian<span className="text-primary-600">.</span>
            </Link>
            <p className="mb-6 max-w-sm text-base leading-relaxed text-gray-600 dark:text-gray-400">
              Full-stack developer passionate about building intelligent, modern
              web experiences with clean architecture and exceptional user experiences.
            </p>
            
            {/* Visitor Counter */}
            {visitorCount !== null && (
              <div className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-2 dark:border-primary-800 dark:bg-primary-900/30">
                <FiEye className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {visitorCount.toLocaleString()}
                  </span> {visitorCount === 1 ? 'visit' : 'visits'}
                </span>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-base text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Connect With Me
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-primary-300 hover:bg-primary-50 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-primary-700 dark:hover:bg-primary-900/20"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-gray-600 transition-colors group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {social.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Farian Bin Rahman. All rights reserved.
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              Made with <FiHeart className="h-4 w-4 text-red-500" /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
