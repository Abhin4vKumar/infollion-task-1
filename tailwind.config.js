/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      xs:'380px',
      sm:'640px',
      md:'768px',
      lg:'960px',
      xl:'1200px',
    },
    fontFamily:{
      primary:"var(--font-jetbrainsMono)",
    },
    extend: {
      colors:{
        primary:'#0c0c0c',
        accent:{
          DEFAULT:'#986931',
          hover:'#b8884e',
        },
        highlight:{
          DEFAULT:'#5e3e17',
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}