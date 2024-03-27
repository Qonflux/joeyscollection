/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{ts,vue}',
    './components/**/*.{ts,vue}'
  ],
  theme: {
    extend: {
      width: {
        100: '25rem'
      },
    },
  },
  plugins: [],
}
