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
        paper: '#EEF0F2',
        ink: '#171A21',
        // neutral slate: warm/neutral gray (replaces blue-leaning slate)
        slate: '#5B6166',
        amber: '#C97A3D',
        line: '#CDD1D6',
        card: '#FFFFFF',
        muted: '#6B7075',
        body: '#3A3F47',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        // subtle neutral grid using the `line` token
        'blueprint-grid': "linear-gradient(#CDD1D6 0.5px, transparent 0.5px), linear-gradient(90deg, #CDD1D6 0.5px, transparent 0.5px)",
      },
      backgroundSize: {
        'grid-28': '28px 28px',
      },
    },
  },
  plugins: [],
}

export default config
