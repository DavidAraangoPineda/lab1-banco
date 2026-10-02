import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// El proxy evita problemas de CORS: el navegador llama a /api y Vite lo reenvía al backend.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
