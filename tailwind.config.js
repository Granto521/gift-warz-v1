/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fire-500': '#f97316', // orange-500
        'ice-400': '#60a5fa', // blue-400
      },
    },
  },
  plugins: [],
};
 