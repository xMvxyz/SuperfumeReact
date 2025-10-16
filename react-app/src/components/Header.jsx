import React from 'react'
import { Link } from 'react-router-dom'

// Header simple que reutiliza las clases CSS existentes de la plantilla
export default function Header(){
  return (
    <header className="site-header">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <nav>
              <Link to="/" className="brand">Superfume</Link>
              <span style={{marginLeft: '1rem'}} />
              <Link to="/shop" style={{marginLeft:20}}>Tienda</Link>
              <Link to="/about" style={{marginLeft:20}}>Conócenos</Link>
              <Link to="/contact" style={{marginLeft:20}}>Contacto</Link>
              <Link to="/cart" style={{marginLeft:20}}>Carrito</Link>
              <Link to="/login" style={{marginLeft:20}}>Login</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
