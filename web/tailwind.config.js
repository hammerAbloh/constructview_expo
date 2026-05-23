/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'cv-dark': '#0B0F19',
        'cv-blue': '#00D1FF',
        'cv-green': '#00FF88',
        'cv-gray': '#1E293B',
        'cv-card': '#121827',
      },
      boxShadow: {
        'glow-blue': '0 0 25px rgba(0, 209, 255, 0.35)',
        'glow-green': '0 0 25px rgba(0, 255, 136, 0.25)',
        'card': '0 4px 30px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}