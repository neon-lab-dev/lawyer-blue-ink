// tailwind.config.js
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#17124A",
        "tab-container": "#EBEBFF",
        "button-container": "#F3F2FF",
        success: "#52C21D",
        error: "#E83535",
        "tab-activation": "#0098EA",
        background: "#FFFFFF",
        headerLeft: "#E5E5FF",
        header: "#F0F0F0",
        "table-header": "#F3F3F3",
        text: "#000000",
        gray: "#69686A",
        border: "#D0D0D0",
      },
      fontFamily: {
        "work-sans": ["Work Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [
    // Custom scrollbar plugin
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          '::-webkit-scrollbar': {
            width: '6px', // Thinner scrollbar
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#c9c9c9', // Grey color for scrollbar thumb
            borderRadius: '10px', // Optional rounded corners
          },
          '::-webkit-scrollbar-track': {
            background: 'transparent', // Transparent track
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
