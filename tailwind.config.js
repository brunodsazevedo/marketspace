/** @type {import('tailwindcss').Config} */

const colors = require('./src/theme/colors')
const fontFamily = require('./src/theme/font-family')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,

      fontFamily,
    },
  },
  plugins: [],
}

