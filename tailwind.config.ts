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
        slate: '#3D4F7C',
        amber: '#C97A3D',
        line: '#CDD1D6',
        card: '#F8F9FA',
        muted: '#5C6470',
        body: '#3A3F47',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'blueprint-grid': "linear-gradient(#DDE1E5 0.5px, transparent 0.5px), linear-gradient(90deg, #DDE1E5 0.5px, transparent 0.5px)",
      },
      backgroundSize: {
        'grid-28': '28px 28px',
      },
    },
  },
  plugins: [],
}

export default config
