/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #FFFFFF, #ECE9E6)',
        'back-category': 'linear-gradient(to bottom, #2F80ED, #56CCF2);'
      },
      screens: {
        'laptop-md': '1100px', 
        'medium': '400px', 
      },
      fontFamily: {
        'playfair-display': ['"Playfair Display"', 'serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

