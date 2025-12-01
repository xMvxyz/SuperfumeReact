import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '../services/usuario'

export default function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function validate(){
    const e = {}
    if(!email || !email.trim()) e.email = 'El correo es obligatorio.'
    else if(!emailRegex.test(email.trim())) e.email = 'Ingresa un correo válido.'
    if(!password || password.length < 6) e.password = 'La contraseña debe tener al menos 6 caracteres.'
    return e
  }

  async function handleSubmit(e){
    e.preventDefault()
    const eerrors = validate()
    setErrors(eerrors)
    if(Object.keys(eerrors).length) return

    setLoading(true)
    try{
      const res = await users.login({ email: email.trim(), password })
      const role = res?.user?.role || 'cliente'
      if(remember) localStorage.setItem('sfm_remember_email', email)
      setLoading(false)
      if(role === 'admin') navigate('/admin')
      else navigate('/shop')
    }catch(err){
      setLoading(false)
      const message = err?.message || 'Error autenticando'
      setErrors({ form: message })
    }
  }

  return (
    <div className="login-page-wrap">
      <div className="login-card">
        <div className="login-top">
          <h3 className="m-0">Bienvenido</h3>
          <div className="login-subtext">Inicia sesión para continuar</div>
        </div>
        <div className="login-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-12">
              <label className="label-13">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="tu@gmail.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                disabled={loading}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="mb-12">
              <label className="label-13">Contraseña</label>
              <div className="field-row">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary nowrap"
                  onClick={()=>setShowPassword(s=>!s)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>

            <div className="row-between mb-12">
              <label className="remember-wrap">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e=>setRemember(e.target.checked)}
                />
                <span className="remember-text">Recuérdame</span>
              </label>
              <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
            </div>

            {errors.form && <div className="error-text mb-8">{errors.form}</div>}

            <div className="btn-row">
              <button
                className="btn btn-sm btn-outline-info me-2 flex-1 btn-enter"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'Entrar'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg flex-1"
                onClick={()=>navigate('/register')}
                disabled={loading}
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
