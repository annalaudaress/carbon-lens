/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        term: {
          bg: '#000000',
          fg: '#c0c0c0',
          green: '#00ff00',
          yellow: '#ffff00',
          cyan: '#00ffff',
          red: '#ff0000',
          blue: '#5f87ff',
          magenta: '#ff00ff',
          dim: '#555555',
          border: '#333333',
          highlight: '#1a1a2e',
          select: '#003300',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
