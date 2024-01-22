/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "backg-light":"#fbfaea",
        "red-primary":"#ae320c",
        "orange-primary":"#fc9b00",
      }
    },
  },
  plugins: [],
}
