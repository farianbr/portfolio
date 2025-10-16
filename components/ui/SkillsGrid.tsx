"use client";

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiVercel,
  SiJavascript,
  SiExpress,
  SiPrisma,
  SiRedis,
  SiGraphql,
  SiFigma,
  SiVite,
} from 'react-icons/si';
import { SiAmazonwebservices } from 'react-icons/si';

const skills = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: '#000000' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'AWS', icon: SiAmazonwebservices, color: '#FF9900' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
];

export default function SkillsGrid() {
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
    visible: boolean;
  }>({ text: '', x: 0, y: 0, visible: false });

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // ensure portal exists (client-only)
    return () => {};
  }, []);

  function showTooltip(e: React.MouseEvent, text: string) {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top, visible: true });
  }

  function hideTooltip() {
    setTooltip((t) => ({ ...t, visible: false }));
  }

  return (
    <div ref={containerRef} className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3">
      {skills.map((skill) => (
        <div
          key={skill.name}
          onMouseEnter={(e) => showTooltip(e, skill.name)}
          onMouseMove={(e) => showTooltip(e, skill.name)}
          onMouseLeave={hideTooltip}
          onFocus={(e) => showTooltip(e as any, skill.name)}
          onBlur={hideTooltip}
          role="button"
          tabIndex={0}
          aria-label={skill.name}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white transition-all hover:scale-110 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:h-14 sm:w-14"
        >
          <skill.icon
            className="h-5 w-5 sm:h-6 sm:w-6"
            style={{
              color: skill.color === '#000000' ? 'currentColor' : skill.color,
            }}
          />
        </div>
      ))}

      {typeof document !== 'undefined' && tooltip.visible
        ? createPortal(
            <div
              style={{
                position: 'fixed',
                left: tooltip.x,
                top: tooltip.y - 10,
                transform: 'translate(-50%, -100%)',
                pointerEvents: 'none',
                zIndex: 9999,
                opacity: tooltip.visible ? 1 : 0,
                transition: 'opacity 200ms ease-in-out',
              }}
            >
              <div className="animate-in fade-in slide-in-from-bottom-1 duration-200 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-xl dark:bg-gray-100 dark:text-gray-900">
                {tooltip.text}
                <div 
                  className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"
                  style={{ marginTop: '-1px' }}
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
