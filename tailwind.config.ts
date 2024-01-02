/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        temper: {
          grey: '#F4F4F4',
          purple: '#6356B1',
          green: '#26FF90',
        },
      },
    },
  },
  plugins: [],
};
