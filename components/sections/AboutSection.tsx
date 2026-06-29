'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import SkillsGrid from '@/components/ui/SkillsGrid';
import Reveal from '@/components/ui/Reveal';

const githubAssets = [
  { type: 'stats', label: 'GitHub Stats', width: 400, height: 160 },
  { type: 'streak', label: 'GitHub Streak', width: 400, height: 120 },
] as const;

export default function AboutSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = mounted ? resolvedTheme : 'dark';
  const markLoaded = (key: string) =>
    setLoaded((prev) => ({ ...prev, [key]: true }));

  return (
    <section id="about" className="section scroll-mt-24">
      <div className="container-wide">
        <Reveal>
          <p className="eyebrow mb-3">a little about me</p>
          <h2 className="font-display text-4xl text-ink sm:text-5xl md:text-6xl">
            The person behind the code
          </h2>
        </Reveal>

        {/* Bio */}
        <Reveal delay={0.05} className="mb-20 mt-12">
          <div className="grid items-center gap-10 md:grid-cols-5 md:gap-14">
            {/* Polaroid portrait */}
            <div className="flex justify-center md:col-span-2">
              <figure className="-rotate-2 rounded-sm border border-line/10 bg-surface p-3 pb-5 shadow-soft-lg transition-transform duration-500 ease-spring hover:rotate-0">
                <div className="relative aspect-square w-48 overflow-hidden sm:w-60 md:w-full">
                  <Image
                    src="/images/profile.png"
                    alt="Portrait of Farian Bin Rahman"
                    fill
                    sizes="(min-width: 768px) 35vw, 240px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="hand mt-3 text-center text-xl text-muted">
                  that&apos;s me — somewhere in Dhaka
                </figcaption>
              </figure>
            </div>

            {/* Bio text */}
            <div className="space-y-5 md:col-span-3">
              <h3 className="font-display text-2xl text-ink sm:text-3xl">
                Hi, I&apos;m Farian.
              </h3>
              <p className="font-serif text-lg leading-relaxed text-ink/90 md:text-xl">
                I&apos;m a full-stack developer who turns ambiguous problems into{' '}
                <span className="italic text-accent">clear, reliable products.</span>
              </p>
              <p className="leading-relaxed text-muted">
                I build scalable web applications with modern technologies,
                pairing clean architecture with careful attention to user
                experience and performance — so the things I ship feel fast,
                obvious, and durable. When I&apos;m not shipping, I&apos;m
                usually reading, refactoring something that didn&apos;t need it,
                or chasing a better cup of coffee.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal delay={0.05} className="mb-20">
          <p className="eyebrow mb-7 text-center">things I build with</p>
          <SkillsGrid />
        </Reveal>

        {/* GitHub Activity */}
        <Reveal delay={0.05}>
          <p className="eyebrow mb-7 text-center">what I&apos;ve been up to</p>
          <div className="card p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {githubAssets.map((asset) => (
                <div key={asset.type} className="relative mx-auto">
                  {!loaded[asset.type] && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line/20 border-t-accent" />
                    </div>
                  )}
                  <Image
                    src={`/api/github-stats?type=${asset.type}&theme=${theme}`}
                    alt={asset.label}
                    className={`mx-auto transition-opacity duration-300 ${
                      loaded[asset.type] ? 'opacity-100' : 'opacity-0'
                    }`}
                    width={asset.width}
                    height={asset.height}
                    style={{ width: 'auto', height: 'auto' }}
                    unoptimized
                    onLoad={() => markLoaded(asset.type)}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-line/10 pt-6">
              <div className="relative mx-auto w-full max-w-4xl">
                {!loaded.chart && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-line/20 border-t-accent" />
                  </div>
                )}
                <Image
                  src={`/api/github-stats?type=chart&theme=${theme}`}
                  alt="GitHub contribution chart"
                  className={`mx-auto w-full transition-opacity duration-300 ${
                    loaded.chart ? 'opacity-100' : 'opacity-0'
                  }`}
                  width={1200}
                  height={220}
                  style={{ width: 'auto', height: 'auto' }}
                  unoptimized
                  onLoad={() => markLoaded('chart')}
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
