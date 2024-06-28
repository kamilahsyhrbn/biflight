/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        moveIcon: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(-150%)", opacity: "0" },
          "51%": { transform: "translateY(150%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        moveIcon: "moveIcon 2s infinite",
      },
    },
  },
  plugins: [],
};
