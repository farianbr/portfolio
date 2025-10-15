"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiCode } from "react-icons/fi";
import SkillsGrid from "@/components/ui/SkillsGrid";
import { useTheme } from "next-themes";

export default function AboutSection() {
  const { theme } = useTheme();

  return (
    <section id="about" className="pb-16 md:pb-24">
      <div className="container-custom">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About Me
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 sm:text-lg">
              Building the future, one line of code at a time
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16"
          >
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl hover:border-primary-100 dark:border-gray-800 dark:from-gray-900 dark:to-gray-900/50 md:p-12">
              <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                {/* Profile Image */}
                <div className="flex justify-center md:col-span-2">
                  <div className="relative">
                    {/* Decorative gradient ring */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 opacity-20 blur-lg"></div>

                    {/* Image container */}
                    <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white shadow-xl dark:border-gray-800 sm:h-56 sm:w-56">
                      <Image
                        src="/images/profile.png"
                        alt="Farian Bin Rahman"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Floating badge */}
                    <div className="absolute -bottom-2 -right-2 rounded-full bg-primary-600 p-3 shadow-lg">
                      <FiCode className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Bio Text */}
                <div className="flex flex-col justify-center space-y-4 md:col-span-3">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                    <span className="h-px w-8 bg-primary-600"></span>
                    Nice to meet you
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                    Farian Bin Rahman
                  </h3>

                  <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg">
                    A passionate <strong>full-stack developer</strong> with a
                    love for creating intelligent, modern web experiences that
                    solve real-world problems.
                  </p>

                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
                    I specialize in building scalable web applications using
                    modern technologies. My approach combines clean
                    architecture, exceptional user experiences, and performance
                    optimization.
                  </p>

                  {/* Quick highlights removed per request */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
              Skills & Technologies
            </h3>
            <SkillsGrid />
          </motion.div>

          {/* GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-8 text-center text-2xl font-bold sm:text-3xl">
              GitHub Activity
            </h3>
            {/* Combined GitHub Section */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              {/* GitHub Stats */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <img
                  src={
                    theme === "dark"
                      ? "https://github-readme-stats.vercel.app/api?username=farianbr&show_icons=true&count_private=true&theme=dark&hide_border=true&bg_color=111827&title_color=60a5fa&icon_color=60a5fa&text_color=d1d5db"
                      : "https://github-readme-stats.vercel.app/api?username=farianbr&show_icons=true&count_private=true&theme=default&hide_border=true&bg_color=ffffff&title_color=3b82f6&icon_color=3b82f6&text_color=374151"
                  }
                  alt="GitHub Stats"
                  className="mx-auto"
                  loading="lazy"
                />

                <img
                  src={
                    theme === "dark"
                      ? "https://github-readme-streak-stats.herokuapp.com/?user=farianbr&theme=dark&hide_border=true&background=111827&ring=60a5fa&fire=60a5fa&currStreakLabel=d1d5db&sideLabels=d1d5db&currStreakNum=d1d5db&sideNums=d1d5db&dates=6b7280"
                      : "https://github-readme-streak-stats.herokuapp.com/?user=farianbr&theme=default&hide_border=true&background=ffffff&ring=3b82f6&fire=3b82f6&currStreakLabel=374151&sideLabels=374151&currStreakNum=374151&sideNums=374151&dates=6b7280"
                  }
                  alt="GitHub Streak"
                  className="mx-auto"
                  loading="lazy"
                />
              </div>

              {/* Contribution Graph */}
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                <img
                  src={
                    theme === "dark"
                      ? "https://ghchart.rshah.org/314a7d/farianbr"
                      : "https://ghchart.rshah.org/3b82f6/farianbr"
                  }
                  alt="GitHub Contribution Chart"
                  className="mx-auto w-full max-w-4xl"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
