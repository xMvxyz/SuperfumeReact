import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <nav className="navbar navbar-expand-lg shadow" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><h1>Superfume</h1></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Inicio <span className="visually-hidden">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Cart">Carrito</Link>
              </li>
              <form className="d-flex">
                <input className="form-control me-sm-2" type="search" placeholder="Buscar..." />
                <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
              </form>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to="#">Action</Link>
                  <Link className="dropdown-item" to="#">Another action</Link>
                  <Link className="dropdown-item" to="#">Something else here</Link>
                  <div className="dropdown-divider" />
                  <Link className="dropdown-item" to="#">Separated link</Link>
                </div>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </header>
  )
}
