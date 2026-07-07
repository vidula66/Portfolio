/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        neon: {
          blue: '#6366f1',
          cyan: '#06b6d4',
          purple: '#a855f7',
          pink: '#ec4899',
        },
        dark: {
          900: '#000000',
          800: '#050510',
          700: '#0a0a1a',
          600: '#0f0f25',
          500: '#161630',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'neon-pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}