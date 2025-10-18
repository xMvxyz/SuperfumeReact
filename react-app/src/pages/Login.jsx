import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    // Simular petición (reemplaza con tu API)
    await new Promise(r => setTimeout(r, 700))
    setLoading(false)

    // ejemplo: guardar flag de sesión (solo demo)
    if(remember) localStorage.setItem('sfm_remember_email', email)
    navigate('/')
  }

  return (
    <div style={{minHeight:'72vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
      <style>{`
        /* Match colors from templatemo.css: dark primary and accents */
        .login-card{ width:100%; max-width:420px; border-radius:12px; box-shadow:0 18px 50px rgba(15,23,30,0.35); overflow:hidden}
        .login-top{ background:linear-gradient(90deg,#1d242d,#2d343f); color:white; padding:22px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center }
        .login-body{ padding:22px; background:#ffffff }
        .login-body label{ color: #1d242d; font-weight:500 }
        .form-control:focus{ box-shadow:none; border-color:#1d242d }
        .btn-primary-custom{ background:#1d242d; border:none }
        .btn-primary-custom:hover{ filter:brightness(1.06) }
        .btn-outline-secondary{ border-color:#cfd6e1 }
      `}</style>

      <div className="login-card">
        <div className="login-top">
          <h3 style={{margin:0}}>Bienvenido</h3>
          <div style={{opacity:0.95, marginTop:6}}>Inicia sesión para continuar</div>
        </div>
        <div className="login-body">
          <form onSubmit={handleSubmit} noValidate>
            <div style={{marginBottom:12}}>
              <label style={{display:'block', fontSize:13, marginBottom:6}}>Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="tu@gmail.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                disabled={loading}
              />
              {errors.email && <div style={{color:'crimson', marginTop:6, fontSize:13}}>{errors.email}</div>}
            </div>

            <div style={{marginBottom:12}}>
              <label style={{display:'block', fontSize:13, marginBottom:6}}>Contraseña</label>
              <div style={{display:'flex', alignItems:'center', gap:8}}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                  disabled={loading}
                />
                <button type="button" className="btn btn-outline-secondary" onClick={()=>setShowPassword(s=>!s)} style={{whiteSpace:'nowrap'}}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {errors.password && <div style={{color:'crimson', marginTop:6, fontSize:13}}>{errors.password}</div>}
            </div>

            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
              <label style={{display:'flex', alignItems:'center', gap:8}}>
                <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
                <span style={{fontSize:13}}>Recuérdame</span>
              </label>
              <a href="#" style={{fontSize:13}}>¿Olvidaste tu contraseña?</a>
            </div>

            <div style={{display:'flex', gap:8}}>
              <button className="btn btn-primary-custom btn-lg" type="submit" disabled={loading} style={{flex:1, color:'white'}}>
                {loading ? 'Ingresando...' : 'Entrar'}
              </button>
              <button type="button" className="btn btn-outline-secondary btn-lg" onClick={()=>navigate('/register')} disabled={loading} style={{flex:1}}>Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
