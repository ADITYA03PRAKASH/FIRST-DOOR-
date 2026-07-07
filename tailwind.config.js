/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          light: '#1e3e75',
          DEFAULT: '#0F2B5B',
          dark: '#081735',
        },
        gold: {
          light: '#fbf7ed',
          DEFAULT: '#C6922E',
          hover: '#a5741e',
        },
        brandText: '#1F2937',
        brandBgLight: '#F8F9FB',
      },
      fontFamily: {
        headings: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 30px rgba(15, 43, 91, 0.05)',
        'premium-hover': '0 20px 40px rgba(15, 43, 91, 0.1)',
      },
    },
  },
  plugins: [],
}
