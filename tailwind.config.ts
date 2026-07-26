import type { Config } from 'tailwindcss';

/**
 * Design tokens — forest & lime, neo-brutalist.
 *
 * Every colour is CSS-var driven so the palette lives in one place
 * (`styles/globals.css`) and this file only names it. Single theme: there is
 * no dark variant, so no `darkMode` key and no `dark:` variants anywhere.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Single theme — no dark variant, no toggle.
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--bg-2) / <alpha-value>)',
        ink: 'rgb(var(--fg) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        // Bright fills — only ever used as backgrounds, paired with *-ink
        zing: 'rgb(var(--zing) / <alpha-value>)',
        'zing-ink': 'rgb(var(--zing-ink) / <alpha-value>)',
        pop: 'rgb(var(--pop) / <alpha-value>)',
        'pop-ink': 'rgb(var(--pop-ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Arial Black', 'sans-serif'],
        hand: ['var(--font-hand)', 'cursive'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      boxShadow: {
        // Hard offset shadows — no blur, no spread. The defining trait.
        'hard-sm': '2px 2px 0 0 rgb(var(--shadow))',
        hard: '4px 4px 0 0 rgb(var(--shadow))',
        'hard-lg': '7px 7px 0 0 rgb(var(--shadow))',
      },
      transitionTimingFunction: {
        // Apple-like easing
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
