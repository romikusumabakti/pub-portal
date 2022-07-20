/** @type {import('tailwindcss').Config} */
const colors = {
  blue: "#2196F3",
  green: "#4CAF50",
  yellow: "#FFEB3B",
  orange: "FF9800",
  red: "#f44336",
};
const googleColors = {
  blue: "#4285F4",
  purple: "#966494",
  red: "#EA4335",
  yellow: "#EA8600",
  green: "#34A853",
  teal: "#3B96A3",
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
    }),
  ],
  darkMode: "class",
};
