/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["poppins", "sans-serif"],
      },
      screens: {
        extraSm: { raw: "(max-width: 480px)" },
      },
    },
  },
  plugins: [],
};
