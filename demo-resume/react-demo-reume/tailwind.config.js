/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
         'sm': '320px', 
      },
    },
  },
  plugins: [require("daisyui"),
  require('tailwindcss-debug-screens'),

  ],
  daisyui: {
    themes: ["winter"],
  },

}