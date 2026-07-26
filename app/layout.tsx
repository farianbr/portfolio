import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import {
  Archivo_Black,
  Space_Grotesk,
  Caveat,
  JetBrains_Mono,
} from 'next/font/google';
import { CommandPaletteProvider } from '@/components/providers/CommandPaletteProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/ui/CommandPalette';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { siteConfig, socialLinks } from '@/lib/site.config';

// Display & headings — heavy, wide, unapologetic
const display = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
});

// Body & UI — a geometric grotesk with enough personality to sit next to it
const sans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Handwritten asides
const hand = Caveat({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

// Code blocks only
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  keywords: [
    siteConfig.name,
    'Full-Stack Developer',
    'Web Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Portfolio',
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: `${siteConfig.name} — Portfolio`,
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.description,
    creator: '@IamFarian',
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#f5faf0',
};

// JSON-LD structured data — helps search engines & rich results.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  sameAs: socialLinks
    .filter((s) => !s.href.startsWith('mailto:'))
    .map((s) => s.href),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${hand.variable} ${jetbrainsMono.variable} font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
          <CommandPaletteProvider>
            <div className="relative z-[1] flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <CommandPalette />
            <ScrollToTop />
          </CommandPaletteProvider>
      </body>
    </html>
  );
}
