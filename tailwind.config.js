/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./routers.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./assets/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize:{
        base: ['16px', '24px'],
      },
      colors:{
        purple:{
          bright:"#27053C",
        },
      },
    },
  },
  plugins: ["nativewind/babel"],
}

