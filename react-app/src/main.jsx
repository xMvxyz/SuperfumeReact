import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Importar CSS desde la carpeta assets ubicada en el root del repo.
// Vite está configurado para exponer `../assets` como publicDir, de modo que `/css/...` y `/img/...` funcionan.
import '/css/bootstrap.min.css'
import '/css/templatemo.css'
import '/css/custom.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
