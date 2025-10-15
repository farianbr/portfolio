'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowRight,
  FiDownload,
} from 'react-icons/fi';
import AnimatedBackground from '@/components/ui/AnimatedBackground';

export default function Hero() {

  return (
    <section className="relative -top-[72px] min-h-screen overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="container-custom relative z-10 flex min-h-screen items-center">
        <div className="mx-auto max-w-4xl text-center">
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-600/20 bg-primary-50/50 px-4 py-2 text-sm font-medium text-primary-700 backdrop-blur-sm dark:border-primary-400/20 dark:bg-primary-900/20 dark:text-primary-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500"></span>
            </span>
            Available for new opportunities
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Farian Bin Rahman
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-xl md:text-2xl"
          >
            Full-Stack Developer & Designer
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg"
          >
            I craft beautiful, performant web experiences that solve real problems.
            Specializing in modern web technologies and user-centered design.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="#projects"
              className="btn-primary group inline-flex items-center"
            >
              View My Work
              <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="btn-secondary inline-flex items-center"
            >
              <FiMail className="mr-2" />
              Get In Touch
            </Link>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center text-sm font-medium text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <FiDownload className="mr-2" />
              Download Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://github.com/farianbinrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white/50 text-gray-600 backdrop-blur-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
              aria-label="GitHub"
            >
              <FiGithub className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://linkedin.com/in/farianbinrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white/50 text-gray-600 backdrop-blur-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="https://twitter.com/farianbinrahman"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white/50 text-gray-600 backdrop-blur-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
              aria-label="Twitter"
            >
              <FiTwitter className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
            <a
              href="mailto:farian@example.com"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white/50 text-gray-600 backdrop-blur-sm transition-all hover:border-primary-600 hover:text-primary-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400 dark:hover:border-primary-400 dark:hover:text-primary-400"
              aria-label="Email"
            >
              <FiMail className="h-5 w-5 transition-transform group-hover:scale-110" />
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <Link
              href="#about"
              className="flex flex-col items-center gap-2 text-sm text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
            >
              <span className="hidden sm:inline">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-6 w-4 rounded-full border-2 border-current"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mx-auto mt-1 h-1.5 w-1.5 rounded-full bg-current"
                />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
