import type { Config } from 'tailwindcss';

/**
 * Design tokens — Apple-inspired, warm & restrained.
 *
 * - `primary`  : the single accent (warm sand / taupe). 600 is tuned so white
 *                text on it and accent text on white both pass WCAG AA.
 * - `gray`     : overridden to a warm neutral scale (stone-like) so every
 *                existing `gray-*` utility instantly reads warm, not cold-blue.
 *
 * Keeping these names lets the whole site re-skin from one place with no churn.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Single accent — warm sand / taupe
        primary: {
          50: '#faf6ef',
          100: '#f1e8d8',
          200: '#e3d1b0',
          300: '#d0b483',
          400: '#b9965b',
          500: '#a07f45',
          600: '#876a39', // interactive base — AA against white (5.0:1)
          700: '#6b5430',
          800: '#4f3e25',
          900: '#3a2e1d',
          950: '#221b11',
        },
        // Warm neutral scale (replaces Tailwind's cool default gray)
        gray: {
          50: '#faf9f7',
          100: '#f4f2ee',
          200: '#e8e4dd',
          300: '#d6d0c6',
          400: '#a8a094',
          500: '#797165',
          600: '#5c554b',
          700: '#46413a',
          800: '#2b2823',
          900: '#1a1813',
          950: '#100f0c',
        },
        // Journal token system (CSS-var driven; warm paper light + dark)
        canvas: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--bg-2) / <alpha-value>)',
        ink: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        thread: 'rgb(var(--thread) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        hand: ['var(--font-hand)', 'cursive'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      boxShadow: {
        // Very soft, layered — never heavy
        soft: '0 1px 2px rgba(16, 15, 12, 0.04), 0 4px 16px rgba(16, 15, 12, 0.05)',
        'soft-lg':
          '0 2px 6px rgba(16, 15, 12, 0.05), 0 12px 32px rgba(16, 15, 12, 0.07)',
      },
      transitionTimingFunction: {
        // Apple-like easing
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee 38s linear infinite reverse',
        blink: 'blink 1.1s steps(1) infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
