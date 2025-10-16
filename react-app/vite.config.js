import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración de Vite
// publicDir apunta a la carpeta "assets" en el root del workspace para reutilizar los archivos estáticos existentes
export default defineConfig({
  plugins: [react()],
  publicDir: '../assets'
})
