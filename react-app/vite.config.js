import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  publicDir: '../assets',
  test: {
    environment: 'jsdom',
    globals: true,       
  },
})

