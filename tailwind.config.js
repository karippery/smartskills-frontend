/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e0f2fe',  // Light blue
          300: '#7dd3fc',  // Medium blue
          500: '#0ea5e9',  // Blue
          700: '#0369a1',  // Dark blue
          900: '#0c4a6e',  // Very dark blue
        },
      },
    },
  },
  plugins: [],
}