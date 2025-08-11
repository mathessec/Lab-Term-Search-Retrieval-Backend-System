import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API requests during dev if VITE_API_BASE_URL is not set
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
