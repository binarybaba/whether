/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "color-change": {
          "0%": { backgroundColor: "#93c5fd" },
          "25%": { backgroundColor: "#e0f2fe" },
          "50%": { backgroundColor: "#f0fdfa" },
          "75%": { backgroundColor: "#f5f3ff" },
          "100%": { backgroundColor: "#93c5fd" },
        },
      },
      animation: {
        "color-change": "color-change 2s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
