import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { CommandPaletteProvider } from '@/components/providers/CommandPaletteProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/ui/CommandPalette';
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Farian Bin Rahman - Full-Stack Developer',
    template: '%s | Farian Bin Rahman',
  },
  description:
    'Full-stack developer passionate about building intelligent, modern web experiences with clean architecture and exceptional user experiences.',
  keywords: [
    'Farian Bin Rahman',
    'Full-Stack Developer',
    'Web Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
  ],
  authors: [{ name: 'Farian Bin Rahman' }],
  creator: 'Farian Bin Rahman',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/images/profile.png', type: 'image/png' }
    ],
    apple: '/images/profile.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://farian.dev',
    title: 'Farian Bin Rahman - Full-Stack Developer',
    description:
      'Full-stack developer passionate about building intelligent, modern web experiences.',
    siteName: 'Farian Bin Rahman',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farian Bin Rahman - Full-Stack Developer',
    description:
      'Full-stack developer passionate about building intelligent, modern web experiences.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/images/profile.png" type="image/png" />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <a href="#main-content" className="skip-to-main">
          Skip to main content
        </a>
        <ThemeProvider>
          <CommandPaletteProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <CommandPalette />
            <ScrollToTop />
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
