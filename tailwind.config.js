/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "Segoe UI", "sans-serif"],
        handwritten: ["'Segoe Script'", "'Bradley Hand ITC'", "cursive"]
      },
      colors: {
        night: "#10030a",
        wine: "#3a0717",
        rose: "#ff3d77",
        blush: "#ffc2d6",
        gold: "#ffd36f",
        velvet: "#7a143d"
      },
      boxShadow: {
        glow: "0 0 38px rgba(255, 61, 119, 0.42)",
        gold: "0 0 32px rgba(255, 211, 111, 0.3)"
      }
    }
  },
  plugins: []
};
