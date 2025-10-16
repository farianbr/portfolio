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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
