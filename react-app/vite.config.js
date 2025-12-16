import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  // Base URL dinámica: '/SuperfumeReact/' para GH Pages, '/' para producción en AWS/Spring Boot
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  },
  publicDir: 'public/assets',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,       
  },
})