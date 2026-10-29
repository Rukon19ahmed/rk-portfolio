/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#070707',
          text: '#ffffff',
          muted: '#9a9a9a',
          card: '#101010',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        light: {
          bg: '#f7f7f5',
          text: '#111111',
          muted: '#6b6b6b',
          card: '#ffffff',
          border: 'rgba(0, 0, 0, 0.06)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'pill': '9999px',
      },
      boxShadow: {
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
