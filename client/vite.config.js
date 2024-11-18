import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // Cambia según tu necesidad (puede ser '0.0.0.0' para redes locales)
    port: 3000,        // Puerto donde corre el servidor
    hmr: true          // Habilita HMR explícitamente
  },
})
