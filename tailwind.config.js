/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          950: '#0A0A0A',
          900: '#111111',
          800: '#1A1A1A',
          700: '#2E2E2E',
        },
        accent: {
          DEFAULT: '#FF4D00',
          dim: '#D63F00',
          glow: '#FF4D0033',
        },
        pop: {
          DEFAULT: '#FF4D00',
          dim: '#D63F00',
        },
        // Tiffany blue-green — the announcement bar's highlight only.
        tiffany: {
          DEFAULT: '#0ABAB5',
          dim: '#089B97',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A3A3A3',
          muted: '#6B6B6B',
        },
      },
      spacing: {
        // Fixed header: navbar (4rem) + announcement bar (2.5rem).
        header: '6.5rem',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      // Hard edges everywhere. `full` is kept for dots and the scrollbar thumb.
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
        full: '9999px',
      },
      boxShadow: {
        // Offset blocks instead of glows.
        'hard': '6px 6px 0 0 #FF4D00',
        'hard-sm': '4px 4px 0 0 #FF4D00',
        'hard-light': '6px 6px 0 0 #2E2E2E',
      },
      letterSpacing: {
        brutal: '-0.045em',
        label: '0.18em',
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease-out forwards',
        'marquee': 'marquee 25s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.4)' },
        },
      },
    },
  },
  plugins: [],
}
