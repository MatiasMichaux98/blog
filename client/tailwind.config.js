/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Color para encabezados, pie de página, y menú de navegación
        carbon: '#333333',
        
        // Color para fondo de contenido principal y formularios
        pureWhite: '#FFFFFF',
        
        // Color para botones de llamada a la acción, bordes o íconos
        softGold: '#C5A880',
        softGoldHover:'#968062'
      },
    },
  },
  plugins: [],
}

