"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiCode } from "react-icons/fi";
import SkillsGrid from "@/components/ui/SkillsGrid";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function AboutSection() {
  const { resolvedTheme } = useTheme();
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [streakLoaded, setStreakLoaded] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent theme flash: only use resolvedTheme after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

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
            className="mb-16 text-center"
          >
            
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              <span className="relative">
                About{" "}
                  Me
                
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
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
                <div className="relative mx-auto">
                  {!statsLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary-600 border-gray-200" />
                    </div>
                  )}
                  <Image
                    src={`/api/github-stats?type=stats&theme=${mounted ? resolvedTheme : 'light'}`}
                    alt="GitHub Stats"
                    className={`mx-auto transition-opacity duration-200 ${statsLoaded ? "opacity-100" : "opacity-0"}`}
                    width={400}
                    height={160}
                    unoptimized
                    onLoad={() => setStatsLoaded(true)}
                  />
                </div>

                <div className="relative mx-auto">
                  {!streakLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-primary-600 border-gray-200" />
                    </div>
                  )}
                  <Image
                    src={`/api/github-stats?type=streak&theme=${mounted ? resolvedTheme : 'light'}`}
                    alt="GitHub Streak"
                    className={`mx-auto transition-opacity duration-200 ${streakLoaded ? "opacity-100" : "opacity-0"}`}
                    width={400}
                    height={120}
                    unoptimized
                    onLoad={() => setStreakLoaded(true)}
                  />
                </div>
              </div>

              {/* Contribution Graph */}
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                <div className="relative mx-auto w-full max-w-4xl">
                  {!chartLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-primary-600 border-gray-200" />
                    </div>
                  )}
                  <Image
                    src={`/api/github-stats?type=chart&theme=${mounted ? resolvedTheme : 'light'}`}
                    alt="GitHub Contribution Chart"
                    className={`mx-auto w-full transition-opacity duration-200 ${chartLoaded ? "opacity-100" : "opacity-0"}`}
                    width={1200}
                    height={220}
                    unoptimized
                    onLoad={() => setChartLoaded(true)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
