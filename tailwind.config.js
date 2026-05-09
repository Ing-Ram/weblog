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
          950: '#080B12',
          900: '#0D1117',
          800: '#161B22',
          700: '#21262D',
        },
        accent: {
          DEFAULT: '#00D9FF',
          dim: '#00A8C8',
          glow: '#00D9FF33',
        },
        pop: {
          DEFAULT: '#FF2D78',
          dim: '#CC1A58',
        },
        text: {
          primary: '#F0F6FC',
          secondary: '#8B949E',
          muted: '#484F58',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'accent-glow': '0 0 30px rgba(0, 217, 255, 0.15)',
        'card-hover': '0 8px 40px rgba(0, 217, 255, 0.08)',
      },
      backgroundImage: {
        'hero-grid': `linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)`,
        'gradient-accent': 'linear-gradient(135deg, #00D9FF 0%, #FF2D78 100%)',
      },
      backgroundSize: {
        'hero-grid': '60px 60px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'marquee': 'marquee 25s linear infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
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
