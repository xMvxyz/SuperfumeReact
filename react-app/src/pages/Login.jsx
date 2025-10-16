import React from 'react'
import { Link } from 'react-router-dom'

export default function Login(){
  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
      <div className="login-container">
        <div className="login-header mb-4"><h2>Iniciar Sesión</h2></div>
        <form>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" className="form-control" placeholder="Ingresa tu correo" />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" className="form-control" placeholder="Ingresa tu contraseña" />
          </div>

          <div className="login-actions d-flex gap-2">
            <Link to="/" className="btn btn-login btn-success">Entrar</Link>
            <button type="button" className="btn btn-secondary">Registrarse</button>
          </div>

          <div className="extra-links mt-3">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  )
}
