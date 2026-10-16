import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        ink: '#171717',
        darkbg: '#2B1C13',
        slate: '#5D626B',
        amber: '#C95B00',
        line: '#E7E5E2',
        card: '#FFFFFF',
        muted: '#5D626B',
        body: '#343A43',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'blueprint-grid': "linear-gradient(rgba(201,91,0,.07) 0.5px, transparent 0.5px), linear-gradient(90deg, rgba(201,91,0,.07) 0.5px, transparent 0.5px)",
      },
      backgroundSize: {
        'grid-28': '32px 32px',
      },
      borderRadius: {
        card: '1.2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(45,29,18,.04)',
      },
    },
  },
  plugins: [],
}

export default config
