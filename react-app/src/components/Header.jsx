
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(){
  const [showSearch, setShowSearch] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

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
      <nav className="navbar navbar-expand-lg shadow" data-bs-theme="dark" style={{position:'relative'}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><h1>Superfume</h1></Link>
          <button className="navbar-toggler" type="button" aria-controls="navbarColor01" aria-expanded={navOpen} aria-label="Toggle navigation" onClick={()=> setNavOpen(v => !v)}>
            <span className="navbar-toggler-icon" />
          </button>
          <div className={"collapse navbar-collapse justify-content-center" + (navOpen ? ' show' : '')} id="navbarColor01" aria-expanded={navOpen}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Inicio <span className="visually-hidden">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/shop" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Carrito</Link>
              </li>

              <li className="nav-item d-lg-none">
                <button className="nav-link btn btn-link" style={{paddingLeft:0}} onClick={()=>{ setShowSearch(true); if(window.innerWidth < 992) setNavOpen(false) }} aria-label="Buscar">Buscar</button>
              </li>

              <li className="nav-item d-lg-none">
                <Link className="nav-link" to="/login" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Login</Link>
              </li>
              <li className="nav-item d-lg-none">
                <Link className="nav-link" to="/admin" onClick={()=> { if(window.innerWidth < 992) setNavOpen(false) }}>Admin</Link>
              </li>
            </ul>
          </div>
          <div className="d-none d-lg-flex align-items-center ms-auto" style={{gap:8}}>
            <style>{`
              .header-search-input { padding:10px; height:40px; border-radius:6px; border:1px solid #e8e8e8 }
              .overlay-action-btn { height:40px; padding:8px 12px; border-radius:6px; border:1px solid #e8e8e8; display:inline-flex; align-items:center; justify-content:center }
              .overlay-action-btn.btn-primary { background:#1d242d; color:#fff; border-color:#1d242d }
            `}</style>
            <button className="btn btn-link p-2" aria-label="Buscar" title="Buscar" onClick={()=>setShowSearch(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffff" viewBox="0 0 24 24">
                <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z" />
              </svg>
            </button>
            <Link className="nav-link" to="/login" style={{padding:'6px 8px'}}>Login</Link>
            <Link className="nav-link" to="/admin" style={{padding:'6px 8px'}}>Admin</Link>
          </div>

          {showSearch && (
              <div style={{position:'absolute', left:0, right:0, top:0, height: '64px', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1050, boxShadow:'0 6px 18px rgba(0,0,0,0.12)'}}>
                <div style={{width:'90%', maxWidth:680}}>
                  <div style={{display:'flex', gap:8, alignItems:'center'}}>
                    <input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={handleKey} placeholder="Buscar Productos..." className="header-search-input" style={{flex:1}} />
                    <button className="overlay-action-btn btn btn-primary" onClick={doSearch}>Buscar</button>
                    <button className="overlay-action-btn btn btn-secondary" onClick={()=>setShowSearch(false)}>Cancelar</button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </nav>
    </header>
  )
}