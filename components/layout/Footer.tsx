'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiEye } from 'react-icons/fi';
import { navigation, siteConfig, socialLinks } from '@/lib/site.config';

// Generate a unique session ID
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

// Get or create session ID
function getSessionId(): string {
  const stored = sessionStorage.getItem('sessionId');
  if (stored) return stored;

  const newSessionId = generateSessionId();
  sessionStorage.setItem('sessionId', newSessionId);
  return newSessionId;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const trackVisit = async () => {
      try {
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (hasVisited) {
          const response = await fetch('/api/visitors');
          const data = await response.json();
          if (!cancelled) setVisitorCount(data.count);
        } else {
          const sessionId = getSessionId();
          const pathname = window.location.pathname;
          const response = await fetch('/api/visitors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId, pathname }),
          });
          const data = await response.json();
          if (!cancelled) setVisitorCount(data.count);
          sessionStorage.setItem('hasVisited', 'true');
        }
      } catch (error) {
        console.error('Visitor tracking failed:', error);
      }
    };

    trackVisit();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="relative border-t-2 border-line/20 bg-canvas">
      <div className="container-wide py-12">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand + visitor count */}
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-2xl text-ink">
              {siteConfig.shortName}
              <span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>

            {visitorCount !== null && (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-line/20 bg-surface/60 px-3.5 py-1.5">
                <FiEye className="h-4 w-4 text-accent" />
                <span className="label !text-muted">
                  <span className="text-ink">
                    {visitorCount.toLocaleString()}
                  </span>{' '}
                  {visitorCount === 1 ? 'visit' : 'visits'}
                </span>
              </div>
            )}
          </div>

          {/* Quick links */}
          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="eyebrow">around here</h2>
            <ul className="mt-4 space-y-3">
              {navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="ink-link text-sm font-medium text-muted"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="md:col-span-4">
            <h2 className="eyebrow">say hello</h2>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {socialLinks.map((social) => {
                const external = social.href.startsWith('http');
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-2.5 rounded-lg border-2 border-line/20 bg-surface/50 px-3 py-2.5 transition-colors hover:border-accent/40"
                    aria-label={social.name}
                  >
                    <social.icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" />
                    <span className="text-sm font-medium text-ink">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-line/20 pt-6 text-center md:flex-row">
          <p className="label">
            © {currentYear} {siteConfig.name}
          </p>
          <p className="hand text-lg text-muted">made with care, and a lot of coffee</p>
        </div>
      </div>
    </footer>
  );
}
