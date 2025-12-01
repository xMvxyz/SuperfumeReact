import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  // GitHub Pages base URL (nombre del repositorio) - solo en producción
  base: process.env.NODE_ENV === 'production' ? '/SuperfumeReact/' : '/',
  plugins: [react()],
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

