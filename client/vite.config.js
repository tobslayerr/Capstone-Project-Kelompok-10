import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['html5-qrcode'],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Ganti 5000 ke port backend-mu jika berbeda
    },
  },
})
