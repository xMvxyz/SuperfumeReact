import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer" style={{marginTop:40}}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>© {new Date().getFullYear()} Superfume. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
