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
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        'laptop-md': '1100px', 
        'medium': '400px', 
        'mediummore': '500px', 
        'low': '340px', 
      },
      fontFamily: {
        'playfair-display': ['"Playfair Display"', 'serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

