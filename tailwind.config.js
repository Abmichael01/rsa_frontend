/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "roboto": ["Roboto", "san-serif"],
        "anta": ["Anta"],
        "quicksand": ["Quicksand"]
      },
      fontWeight: {
        100: '100',
        200: '200',
        300: '300',
        400: '400',
        500: '500',
        600: '600',
        700: '700',
        800: '800',
        900: '900',
      },
      colors: {
        primary: {
          50: '#fdfdfe', // Lightest shade
          100: '#ebe9f0',
          200: '#d3cddc',
          300: '#b8b2c8',
          400: '#9d97b4',
          500: '#827ca0', // Base color
          600: '#6a628c',
          700: '#514e78',
          800: '#393a64',
          900: '#1f1f50', 
        }
        
      }
    },
  },
  plugins: [],
}

