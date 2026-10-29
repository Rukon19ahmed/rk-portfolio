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
          card: '#101010',
          'card-hover': '#161616',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(255, 255, 255, 0.18)',
          muted: '#8e8e93',
          text: '#ffffff',
        },
        light: {
          bg: '#f7f7f5',
          card: '#ffffff',
          'card-hover': '#fafafa',
          border: 'rgba(0, 0, 0, 0.08)',
          'border-hover': 'rgba(0, 0, 0, 0.16)',
          muted: '#66666e',
          text: '#0d0d11',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Inter Tight"', 'Inter', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        signature: ['"Mrs Saint Delafield"', 'Caveat', 'cursive'],
      },
      borderRadius: {
        'card': '16px',
        'badge': '9999px',
      },
      boxShadow: {
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'card-dark-hover': '0 8px 30px -4px rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.18)',
        'card-light': '0 2px 12px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        'card-light-hover': '0 10px 25px -3px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [],
}
