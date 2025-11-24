/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e7f5ed",
          100: "#c7e6d5",
          200: "#a4d7ba",
          300: "#7ac89c",
          400: "#51ba7d",
          500: "#2ba25f",
          600: "#1e804d",
          700: "#16663d",
          800: "#0f4c2d",
          900: "#0a3722",
        },
        charcoal: "#101418",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(16,20,24,0.15)",
      },
    },
  },
  plugins: [],
};
