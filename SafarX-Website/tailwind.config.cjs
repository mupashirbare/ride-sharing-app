/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Include React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
