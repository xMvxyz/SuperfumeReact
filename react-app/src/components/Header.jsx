
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as userService from '../services/usuario'

export default function Header(){
  const [showSearch, setShowSearch] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadUser()
    window.addEventListener('storage', loadUser)
    return () => window.removeEventListener('storage', loadUser)
  }, [])

  useEffect(() => {
    function handleClickOutside(e) {
      if (showUserMenu && !e.target.closest('.user-icon-btn') && !e.target.closest('.user-menu-dropdown')) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserMenu])

  function loadUser() {
    try {
      const auth = localStorage.getItem('superfume_auth_v1')
      if (auth) {
        const authData = JSON.parse(auth)
        setUser(authData.user)
      } else {
        setUser(null)
      }
    } catch (e) {
      setUser(null)
    }
  }

  async function handleLogout() {
    await userService.logout()
    setUser(null)
    setShowUserMenu(false)
    navigate('/')
  }

  function handleUserClick() {
    if (user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'administrador') {
      navigate('/admin')
    } else {
      setShowUserMenu(!showUserMenu)
    }
  }

  function doSearch(){
    setShowSearch(false)
    if(searchQuery && searchQuery.trim()){
      navigate(`/shop?query=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/shop')
    }
  }

  function handleKey(e){
    if(e.key === 'Enter') doSearch()
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white" data-bs-theme="light" style={{position:'relative', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><h1 style={{color: '#000', margin: 0}}>Superfume</h1></Link>
          <button className="navbar-toggler" type="button" aria-controls="navbarColor01" aria-expanded={navOpen} aria-label="Toggle navigation" onClick={()=> setNavOpen(v => !v)}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className={"collapse navbar-collapse" + (navOpen ? ' show' : '')} id="navbarColor01" aria-expanded={navOpen} style={{justifyContent: 'center'}}>
            <ul className="navbar-nav" style={{margin: '0 auto'}}>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/shop" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/contact" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/cart" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Carrito</Link>
              </li>

              <li className="nav-item d-lg-none">
                <button className="nav-link text-dark btn btn-link" style={{paddingLeft:0}} onClick={()=>{ setShowSearch(true); if(window.innerWidth < 992) setNavOpen(false) }} aria-label="Buscar">Buscar</button>
              </li>

              {user ? (
                <>
                  <li className="nav-item d-lg-none">
                    <span className="nav-link text-dark">Hola, {user.nombre}</span>
                  </li>
                  {(user.role?.toLowerCase() === 'admin' || user.role?.toLowerCase() === 'administrador') && (
                    <li className="nav-item d-lg-none">
                      <Link className="nav-link text-dark" to="/admin" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Panel Admin</Link>
                    </li>
                  )}
                  <li className="nav-item d-lg-none">
                    <button className="nav-link text-dark btn btn-link" style={{paddingLeft:0}} onClick={handleLogout}>Cerrar Sesión</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item d-lg-none">
                    <Link className="nav-link text-dark" to="/login" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Login</Link>
                  </li>
                  <li className="nav-item d-lg-none">
                    <Link className="nav-link text-dark" to="/register" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Registrarse</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="d-none d-lg-flex align-items-center ms-auto" style={{gap:8, position:'relative'}}>
            <style>{`
              .header-search-input { padding:10px; height:40px; border-radius:6px; border:1px solid #e8e8e8 }
              .overlay-action-btn { height:40px; padding:8px 12px; border-radius:6px; border:1px solid #e8e8e8; display:inline-flex; align-items:center; justify-content:center }
              .overlay-action-btn.btn-primary { background:#1d242d; color:#fff; border-color:#1d242d }
              .user-menu-dropdown {
                position: absolute;
                top: 50px;
                right: 0;
                background: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 16px;
                min-width: 200px;
                z-index: 1000;
              }
              .user-icon-btn {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #000;
                color: white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-weight: bold;
                font-size: 16px;
              }
              .user-icon-btn:hover {
                background: #333;
              }
            `}</style>
            <button className="btn btn-link p-2" aria-label="Buscar" title="Buscar" onClick={()=>setShowSearch(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" viewBox="0 0 24 24">
                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
              </svg>
            </button>
            
            {user ? (
              <>
                <button 
                  className="user-icon-btn" 
                  onClick={handleUserClick}
                  title={user.role?.toLowerCase() === 'admin' || user.role?.toLowerCase() === 'administrador' ? 'Ir al Panel Admin' : user.nombre}
                >
                  {user.nombre?.charAt(0).toUpperCase() || 'U'}
                </button>
                
                {showUserMenu && user.role?.toLowerCase() !== 'admin' && user.role?.toLowerCase() !== 'administrador' && (
                  <div className="user-menu-dropdown">
                    <div style={{padding: '8px 0', borderBottom: '1px solid #dee2e6', marginBottom: '12px'}}>
                      <strong>{user.nombre}</strong>
                      <div style={{fontSize: '12px', color: '#6c757d'}}>{user.correo}</div>
                    </div>
                    <button 
                      className="btn btn-danger w-100"
                      style={{borderRadius: '5px', padding: '10px'}}
                      onClick={handleLogout}
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link className="nav-link text-dark" to="/login" style={{padding:'6px 8px'}}>Iniciar Sesión</Link>
                <Link className="nav-link text-dark" to="/register" style={{padding:'6px 8px'}}>Registrarse</Link>
              </>
            )}
          </div>

          {showSearch && (
              <div style={{position:'absolute', left:0, right:0, top:0, height: '100%', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1050, backgroundColor:'#fff', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
                <div style={{width:'90%', maxWidth:600}}>
                  <div style={{display:'flex', gap:12, alignItems:'center'}}>
                    <input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={handleKey} placeholder="Buscar productos..." className="header-search-input" style={{flex:1}} />
                    <button className="btn btn-dark" onClick={doSearch} aria-label="Buscar" title="Buscar" style={{height:40, width:40, padding:0, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'5px'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
                      </svg>
                    </button>
                    <button className="btn btn-secondary" onClick={()=>setShowSearch(false)} aria-label="Cancelar" title="Cerrar" style={{height:40, width:40, padding:0, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'5px'}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.364 5.636L12 12.071 5.636 5.707 4.222 7.121 10.586 13.485 4.222 19.849 5.636 21.263 12 14.899 18.364 21.263 19.778 19.849 13.414 13.485 19.778 7.121z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </nav>
    </header>
  )
}