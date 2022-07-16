/** @type {import('tailwindcss').Config} */
const colors = {
  blue: "#2196F3",
  green: "#4CAF50",
  yellow: "#FFEB3B",
  orange: "FF9800",
  red: "#f44336",
};
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [],
  theme: {
    extend: {},
  },
  plugins: [
    require("m3-tokens/tailwind")({
      source: "#448aff",
      // source: colors.blue,
    }),
  ],
  darkMode: "class",
};
