import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  // GitHub Pages base URL (nombre del repositorio)
  base: '/SuperfumeReact/',
  plugins: [react()],
  publicDir: '../assets',
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

