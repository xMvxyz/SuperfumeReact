import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  // Use relative base so built files reference assets relatively (works well for GitHub Pages).
  base: './',
  plugins: [react()],
  publicDir: '../assets',
  test: {
    environment: 'jsdom',
    globals: true,       
  },
})

