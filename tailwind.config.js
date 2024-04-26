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
        header: "#F0F0F0",
        "table-header": "#F3F3F3",
        text: "#000000",
        gray: "#69686A",
      },
    },
    fontFamily: {
      "work-sans": ["Work Sans", "sans-serif"],
      lato: ["Lato", "sans-serif"],
    },
  },
  plugins: [],
};
