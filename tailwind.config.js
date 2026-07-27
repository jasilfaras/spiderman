/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alchemax-red': '#E62429',
        'alchemax-green': '#39FF14',
        'alchemax-cyan': '#00F0FF',
        'pitch-black': '#050505',
      },
      fontFamily: {
        sans: ['"JetBrains Mono"', 'monospace'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-red': '0 0 10px rgba(230, 36, 41, 0.6)',
        'glow-cyan': '0 0 10px rgba(0, 240, 255, 0.6)',
        'glow-green': '0 0 10px rgba(57, 255, 20, 0.6)',
      },
      animation: {
        'radar-sweep': 'radar-sweep 4s linear infinite',
        'scanline-down': 'scanline-down 8s linear infinite',
      },
      keyframes: {
        'radar-sweep': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'scanline-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      }
    },
  },
  plugins: [],
}
