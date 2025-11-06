"use client";

import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiReactquery ,
  SiGit,
  SiVercel,
  SiJavascript,
  SiExpress,
  SiPrisma,
  SiSocketdotio ,
  SiGraphql,
  SiFigma,
  SiKonva,
  SiAxios,
  SiZod,
  SiSendgrid,
  SiPusher,
} from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", icon: SiExpress, color: "#000000" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "TanStack Query", icon: SiReactquery , color: "#FF4154" },
  { name: "Socket.io", icon: SiSocketdotio , color: "#010101" },
  { name: "Pusher", icon: SiPusher, color: "#FF4B6A" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Konva", icon: SiKonva, color: "#61DAFB" },
  { name: "Axios", icon: SiAxios, color: "#5A29E4" },
  { name: "Zod", icon: SiZod, color: "#000000" },
  { name: "SendGrid", icon: SiSendgrid, color: "#FF7F2A" },
];

export default function SkillsGrid() {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-4">
      {skills.map(({ name, icon: Icon, color }) => (
        <div
          key={name}
          title={name}
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-transform hover:scale-110 hover:shadow-md dark:border-gray-800 dark:bg-gray-900
          h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 lg:h-14 lg:w-14"
        >
          <Icon
            className="h-5 w-5 sm:h-5.5 sm:w-5.5 md:h-6 md:w-6 lg:h-7 lg:w-7"
            style={{ color: color === "#000000" ? "currentColor" : color }}
          />
        </div>
      ))}
      <span className=" my-4 text-gray-500 dark:text-gray-400">more updating...</span>
    </div>
  );
}
