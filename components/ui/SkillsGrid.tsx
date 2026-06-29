'use client';

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiReactquery,
  SiGit,
  SiVercel,
  SiJavascript,
  SiExpress,
  SiPrisma,
  SiSocketdotio,
  SiGraphql,
  SiFigma,
  SiKonva,
  SiAxios,
  SiZod,
  SiSendgrid,
  SiPusher,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type Skill = { name: string; icon: IconType; color: string };

const skills: Skill[] = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'currentColor' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express', icon: SiExpress, color: 'currentColor' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Prisma', icon: SiPrisma, color: '#5A67D8' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
  { name: 'TanStack Query', icon: SiReactquery, color: '#FF4154' },
  { name: 'Socket.io', icon: SiSocketdotio, color: 'currentColor' },
  { name: 'Pusher', icon: SiPusher, color: '#FF4B6A' },
  { name: 'Vercel', icon: SiVercel, color: 'currentColor' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Konva', icon: SiKonva, color: '#61DAFB' },
  { name: 'Axios', icon: SiAxios, color: '#5A29E4' },
  { name: 'Zod', icon: SiZod, color: '#3068B7' },
  { name: 'SendGrid', icon: SiSendgrid, color: '#FF7F2A' },
];

export default function SkillsGrid() {
  return (
    <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-2.5">
      {skills.map(({ name, icon: Icon, color }) => (
        <li key={name}>
          <span
            title={name}
            className="group flex items-center gap-2 rounded-full border border-line/15 bg-surface/60 px-4 py-2 text-sm font-medium text-muted transition-all duration-300 ease-spring hover:-translate-y-0.5 hover:border-accent/40 hover:text-ink"
          >
            <Icon
              aria-hidden
              className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-[var(--brand)]"
              style={{ '--brand': color } as React.CSSProperties}
            />
            {name}
          </span>
        </li>
      ))}
    </ul>
  );
}
