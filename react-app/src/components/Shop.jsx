import React, { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import * as perfumeService from '../services/perfume'

export default function Shop(){
  const CART_KEY = 'superfume_cart_v1'
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' })

  function readCart(){
    try{
      const raw = localStorage.getItem(CART_KEY)
      if(!raw) return []
      return JSON.parse(raw)
    }catch(e){ return [] }
  }

  function writeCart(cart){
    try{
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
      
      window.dispatchEvent(new Event('cart_updated'))
    }catch(e){ console.error('cart write error', e) }
  }

  function addToCart(product, qty = 1){
    const availableStock = product.stock ?? 0
    if (availableStock <= 0) {
      setModal({ isOpen: true, title: 'Sin stock', message: 'Producto sin stock disponible' })
      return
    }

    const current = readCart()
    const idx = current.findIndex(i => i.id === product.id)
    const price = product.precio ?? product.price ?? 0
    
    if(idx >= 0){
      const newQty = current[idx].qty + qty
      if (newQty > availableStock) {
        setModal({ isOpen: true, title: 'Stock insuficiente', message: `Solo hay ${availableStock} unidades disponibles en stock` })
        return
      }
      current[idx].qty = newQty
      current[idx].total = current[idx].qty * price
      current[idx].stock = availableStock // actualizar stock
    }else{
      if (qty > availableStock) {
        setModal({ isOpen: true, title: 'Stock insuficiente', message: `Solo hay ${availableStock} unidades disponibles en stock` })
        return
      }
      current.push({ 
        id: product.id, 
        nombre: product.nombre || product.title || '', 
        precio: price, 
        img: product.imagenUrl || product.img || product.image || '/img/producto_01.jpg', 
        qty: qty, 
        total: price * qty,
        stock: availableStock
      })
    }
    writeCart(current)
    setModal({ isOpen: true, title: '¡Agregado!', message: 'Item agregado al carrito' })
  }

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await perfumeService.list()
        console.log('Productos cargados:', data)
        setProducts(data || [])
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('query') || ''
  const initialGender = searchParams.get('gender') || 'Todos'
  const initialFragancia = searchParams.get('fragancia') || 'Todos'
  const initialNotas = searchParams.get('notas') || ''
  const initialPerfil = searchParams.get('perfil') || ''

  const [query, setQuery] = useState(initialQuery)
  const [gender, setGender] = useState(initialGender)
  const [fragancia, setFragancia] = useState(initialFragancia)
  const [notas, setNotas] = useState(initialNotas)
  const [perfil, setPerfil] = useState(initialPerfil)
  const [brand, setBrand] = useState('Todos')
  const [sortBy, setSortBy] = useState('featured')

  // Sincronizar el estado query con los parámetros de la URL cuando cambian
  useEffect(() => {
    const urlQuery = searchParams.get('query') || ''
    setQuery(urlQuery)
  }, [searchParams])

  const brands = useMemo(()=>['Todos', ...Array.from(new Set(products.map(p=>p.marca || p.brand)))], [products])
  const fragancias = useMemo(()=>['Todos', ...Array.from(new Set(products.map(p=>p.fragancia).filter(Boolean)))], [products])

  const filtered = useMemo(()=>{
    let list = products.slice()
    if(query && query.trim()){
      const q = query.trim().toLowerCase()
      list = list.filter(p => (p.nombre || p.title || '').toLowerCase().includes(q) || (p.descripcion || p.desc || '').toLowerCase().includes(q))
    }
    if(gender !== 'Todos') list = list.filter(p => (p.genero || p.gender) === gender)
    if(brand !== 'Todos') list = list.filter(p => (p.marca || p.brand) === brand)
    if(fragancia !== 'Todos') list = list.filter(p => p.fragancia === fragancia)
    if(notas) list = list.filter(p => p.notas && p.notas.toLowerCase().includes(notas.toLowerCase()))
    if(perfil) list = list.filter(p => p.perfil && p.perfil.toLowerCase().includes(perfil.toLowerCase()))

    switch(sortBy){
      case 'price-asc': list.sort((a,b)=> (a.precio ?? a.price) - (b.precio ?? b.price)); break
      case 'price-desc': list.sort((a,b)=> (b.precio ?? b.price) - (a.precio ?? a.price)); break
      case 'az': list.sort((a,b)=> (a.nombre || a.title || '').localeCompare(b.nombre || b.title || '')); break
      case 'za': list.sort((a,b)=> (b.nombre || b.title || '').localeCompare(a.nombre || a.title || '')); break
      default: break
    }
    return list
  },[products, query, gender, brand, fragancia, notas, perfil, sortBy])

  const getProductImage = (p) => p?.imagenUrl || p?.image || p?.img || '/img/producto_01.jpg'

  useEffect(()=>{
    const params = {}
    if(query) params.query = query
    if(gender !== 'Todos') params.gender = gender
    if(fragancia !== 'Todos') params.fragancia = fragancia
    if(notas) params.notas = notas
    if(perfil) params.perfil = perfil
    setSearchParams(params)
  },[query, gender, fragancia, notas, perfil, setSearchParams])

  return (
    <div className="container py-5">
      <div className="row">
        <aside className="col-lg-3 mb-4">
          <div className="card p-3 mb-3 border border-custom">
            <h5 className="heading-custom">Categorías</h5>
            <div className="mb-3">
              <div className="d-flex flex-column gap-2" role="group" aria-label="Género">
                <button type="button" className={"btn btn-sm category-btn " + (gender==='Todos' ? 'btn-dark' : 'btn-outline-dark')} onClick={()=>setGender('Todos')}>Todos</button>
                <button type="button" className={"btn btn-sm category-btn " + (gender==='Hombre' ? 'btn-dark' : 'btn-outline-dark')} onClick={()=>setGender('Hombre')}>Hombre</button>
                <button type="button" className={"btn btn-sm category-btn " + (gender==='Mujer' ? 'btn-dark' : 'btn-outline-dark')} onClick={()=>setGender('Mujer')}>Mujer</button>
                <button type="button" className={"btn btn-sm category-btn " + (gender==='Unisex' ? 'btn-dark' : 'btn-outline-dark')} onClick={()=>setGender('Unisex')}>Unisex</button>
              </div>
            </div>
            <div>
              <label className="form-label">Marca</label>
              <div className="d-flex flex-column gap-2">
                {brands.map(b=> (
                  <button key={b} type="button" className={"btn btn-sm category-btn " + (brand===b ? 'btn-dark' : 'btn-outline-dark')} onClick={()=>setBrand(b)}>{b}</button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="col-lg-9">
          <div className="d-flex mb-3 align-items-center justify-content-between">
            <div>
              <strong>Mostrando {filtered.length} productos</strong>
            </div>
            <div className="toolbar-row">
              <label className="me-2">Ordenar</label>
              <select className="form-select form-control-sm" style={{borderColor: '#000', color: '#000'}} value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio ↑</option>
                <option value="price-desc">Precio ↓</option>
                <option value="az">Nombre A-Z</option>
                <option value="za">Nombre Z-A</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando productos...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No se encontraron productos</p>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
            {filtered.map(p=> (
              <div key={p.id} className="col-6 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="product-thumb">
                    <img src={getProductImage(p)} alt={p.nombre || p.title} className="product-img" />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{p.nombre || p.title}</h6>
                    <p className="text-muted small mb-2 flex-1">{p.desc}</p>
                    <div className="d-flex flex-column gap-2">
                      <div className="fw-700">${(p.precio ?? p.price).toLocaleString()}</div>
                      <div className="d-flex gap-2">
                        <Link to={`/product/${p.id}`} className="btn btn-sm btn-outline-dark flex-1 product-btn">Ver</Link>
                        <button className="btn btn-sm btn-outline-dark flex-1 product-btn" onClick={()=> addToCart(p)}>Añadir</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </section>
      </div>
      
      {modal.isOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h4 className="mt-0">{modal.title}</h4>
            <p>{modal.message}</p>
            <div className="modal-actions">
              <button className="btn btn-dark" onClick={() => setModal({ ...modal, isOpen: false })}>Continuar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

