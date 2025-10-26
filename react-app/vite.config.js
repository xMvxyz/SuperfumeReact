import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  // Base path for GitHub Pages. Update to your repository name if different.
  base: '/SuperfumeReact/',
  plugins: [react()],
  publicDir: '../assets',
  test: {
    environment: 'jsdom',
    globals: true,       
  },
})

