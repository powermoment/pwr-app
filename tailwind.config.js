const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        pwr: "#E6C37D",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
