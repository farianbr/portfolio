'use client';

import Image from 'next/image';
import { useState } from 'react';
import SkillsGrid from '@/components/ui/SkillsGrid';
import Reveal from '@/components/ui/Reveal';

export default function StackSection() {
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  // Single-theme site, so the upstream cards are always requested light.
  const theme = 'light';
  const markLoaded = (key: string) =>
    setLoaded((prev) => ({ ...prev, [key]: true }));
  // Without this, a dead upstream leaves the placeholder spinner turning
  // forever — which is how the retired stats card looked for months.
  const markFailed = (key: string) =>
    setFailed((prev) => ({ ...prev, [key]: true }));

  const everythingFailed = failed.streak && failed.chart;

  return (
    <section id="stack" className="section scroll-mt-24">
      <div className="container-wide">
        {/* Skills */}
        <Reveal delay={0.05} className="mb-14">
          <p className="eyebrow mb-5 text-center">things I build with</p>
          <SkillsGrid />
        </Reveal>

        {/* GitHub Activity */}
        {!everythingFailed && (
          <Reveal delay={0.05}>
            <p className="eyebrow mb-5 text-center">what I&apos;ve been up to</p>
            <div className="card p-5 sm:p-7">
              {!failed.streak && (
                <div className="relative mx-auto w-fit">
                  {!loaded.streak && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line/20 border-t-accent" />
                    </div>
                  )}
                  <Image
                    src={`/api/github-stats?type=streak&theme=${theme}`}
                    alt="GitHub contribution streak"
                    className={`mx-auto transition-opacity duration-300 ${
                      loaded.streak ? 'opacity-100' : 'opacity-0'
                    }`}
                    width={495}
                    height={195}
                    style={{ width: 'auto', height: 'auto' }}
                    unoptimized
                    onLoad={() => markLoaded('streak')}
                    onError={() => markFailed('streak')}
                  />
                </div>
              )}

              {!failed.chart && (
                <div
                  className={
                    failed.streak ? '' : 'mt-6 border-t border-line/10 pt-6'
                  }
                >
                  {/* A year of commits squeezed into 375px is unreadable, so
                      on phones it keeps its width and scrolls instead. */}
                  <div className="relative mx-auto w-full max-w-4xl overflow-x-auto">
                    {!loaded.chart && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-2 border-line/20 border-t-accent" />
                      </div>
                    )}
                    <Image
                      src={`/api/github-stats?type=chart&theme=${theme}`}
                      alt="GitHub contribution chart"
                      className={`mx-auto h-auto w-full min-w-[560px] transition-opacity duration-300 ${
                        loaded.chart ? 'opacity-100' : 'opacity-0'
                      }`}
                      width={1200}
                      height={220}
                      unoptimized
                      onLoad={() => markLoaded('chart')}
                      onError={() => markFailed('chart')}
                    />
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
