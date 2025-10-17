import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')

  // La regex proporcionada (sin la bandera global en uso de test)
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i

  function validateEmail(value){
    if(!value) return 'El correo es obligatorio.'
    if(!emailRegex.test(value)) return 'Ingresa un correo válido.'
    return ''
  }

  function handleEmailBlur(){
    const err = validateEmail(email.trim())
    setEmailError(err)
  }

  function handleSubmit(e){
    e.preventDefault()
    const err = validateEmail(email.trim())
    setEmailError(err)
    if(err) return

    // aquí iría la lógica de autenticación; por ahora navegamos a home
    navigate('/')
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
      <div className="login-container">
        <div className="login-header mb-4"><h2>Iniciar Sesión</h2></div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group mb-3">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              placeholder="Ingresa tu correo"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              onBlur={handleEmailBlur}
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>

          <div className="login-actions d-flex gap-2">
            <button type="submit" className="btn btn-login btn-success">Entrar</button>
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
