import React, { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const SAMPLE_PRODUCTS = [
  {id:1,nombre:'Dior Poison', desc:'Dior Poison EDT 100ML', precio:124990, img:'/img/tienda_01.jpg', genero:'Mujer', marca:'Dior'},
  {id:2,nombre:'Sweet Dream', desc:'Sweet Dream EDT 80ML', precio:14990, img:'/img/tienda_02.jpg', genero:'Mujer', marca:'Generic'},
  {id:3,nombre:'Dance', desc:'Shakira Dance Edt 50Ml Vap', precio:20000, img:'/img/tienda_03.jpg', genero:'Mujer', marca:'Shakira'},
  {id:4,nombre:'Dolce Garden', desc:'Dolce Garden Edp 75 Ml', precio:130000, img:'/img/tienda_04.jpg', genero:'Mujer', marca:'Dolce & Gabbana'},
  {id:5,nombre:'Hugo Boss Bottled Infinite', desc:'Bottled Infinite Edp 100ml', precio:81990, img:'/img/tienda_05.jpg', genero:'Hombre', marca:'Hugo Boss'},
  {id:6,nombre:'Stronger With You', desc:'Stronger With You EDP 100ML', precio:150990, img:'/img/tienda_06.jpg', genero:'Hombre', marca:'Emporio'},
  {id:7,nombre:'Burberry Hero', desc:'Burberry Hero Parfum Intense 100ml', precio:189990, img:'/img/tienda_07.jpg', genero:'Hombre', marca:'Burberry'},
  {id:8,nombre:'Victoria Secret Tease', desc:'Perfume Victoria Secret Tease 100ml', precio:112990, img:'/img/tienda_08.jpg', genero:'Mujer', marca:'Victoria Secret'},
  {id:9,nombre:'Le Beau', desc:'Le Beau Jean Paul Gaultier 125ML EDP Intense', precio:199990, img:'/img/tienda_09.jpg', genero:'Hombre', marca:'Jean Paul Gaultier'},
]

export default function Shop(){
  const CART_KEY = 'superfume_cart_v1'

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
      // notify other tabs/components
      window.dispatchEvent(new Event('cart_updated'))
    }catch(e){ console.error('cart write error', e) }
  }

  function addToCart(product, qty = 1){
    const current = readCart()
    const idx = current.findIndex(i => i.id === product.id)
    const price = product.precio ?? product.price ?? 0
    if(idx >= 0){
      current[idx].qty += qty
      current[idx].total = current[idx].qty * price
    }else{
      current.push({ id: product.id, nombre: product.nombre || product.title || '', precio: price, img: product.img || product.image || '/img/producto_01.jpg', qty: qty, total: price * qty })
    }
    writeCart(current)
  }
  const mergeWithSamples = (adminList)=>{
    if(!Array.isArray(adminList) || adminList.length === 0) return SAMPLE_PRODUCTS.slice()
    const merged = SAMPLE_PRODUCTS.slice()
    adminList.forEach(a => {
      const idx = merged.findIndex(m => m.id === a.id)
      if(idx >= 0) merged[idx] = a
      else merged.push(a)
    })
    return merged
  }

  const [products, setProducts] = useState(()=>{
    try{
      const raw = localStorage.getItem('superfume_products_v1')
      if(raw){
        const parsed = JSON.parse(raw)
        return mergeWithSamples(parsed)
      }
    }catch(e){}
    return SAMPLE_PRODUCTS.slice()
  })

  useEffect(()=>{
    const onStorage = (e)=>{
      if(e.key === 'superfume_products_v1'){
        try{
          const parsed = JSON.parse(e.newValue)
          setProducts(mergeWithSamples(parsed))
        }catch(err){}
      }
    }
    window.addEventListener('storage', onStorage)
    return ()=> window.removeEventListener('storage', onStorage)
  },[])

  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('query') || ''
  const [query, setQuery] = useState(initialQuery)
  const [gender, setGender] = useState('Todos')
  const [brand, setBrand] = useState('Todos')
  const [sortBy, setSortBy] = useState('featured')

  const brands = useMemo(()=>['Todos', ...Array.from(new Set(products.map(p=>p.marca || p.brand)))], [products])

  const filtered = useMemo(()=>{
    let list = products.slice()
    if(query && query.trim()){
      const q = query.trim().toLowerCase()
      list = list.filter(p => (p.nombre || p.title || '').toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }
    if(gender !== 'Todos') list = list.filter(p => (p.genero || p.gender) === gender)
    if(brand !== 'Todos') list = list.filter(p => (p.marca || p.brand) === brand)

    switch(sortBy){
      case 'price-asc': list.sort((a,b)=> (a.precio ?? a.price) - (b.precio ?? b.price)); break
      case 'price-desc': list.sort((a,b)=> (b.precio ?? b.price) - (a.precio ?? a.price)); break
      case 'az': list.sort((a,b)=> (a.nombre || a.title || '').localeCompare(b.nombre || b.title || '')); break
      case 'za': list.sort((a,b)=> (b.nombre || b.title || '').localeCompare(a.nombre || a.title || '')); break
      default: break
    }
    return list
  },[products, query, gender, brand, sortBy])

  const getProductImage = (p) => p?.image || p?.img || '/img/producto_01.jpg'

  useEffect(()=>{
    if(query) setSearchParams({ query })
    else setSearchParams({})
  },[query, setSearchParams])

  return (
    <div className="container py-5">
      <div className="row">
        <aside className="col-lg-3 mb-4">
          <div className="card p-3 mb-3 border border-custom">
            <h5 className="heading-custom">Categorías</h5>
            <div className="mb-3">
              <div className="d-flex gap-8" role="group" aria-label="Género">
                <button type="button" className={"btn btn-sm me-2 flex-1 " + (gender==='Todos' ? 'btn-info text-white' : 'btn-outline-info')} onClick={()=>setGender('Todos')}>Todos</button>
                <button type="button" className={"btn btn-sm me-2 flex-1 " + (gender==='Hombre' ? 'btn-info text-white' : 'btn-outline-info')} onClick={()=>setGender('Hombre')}>Hombre</button>
                <button type="button" className={"btn btn-sm me-2 flex-1 " + (gender==='Mujer' ? 'btn-info text-white' : 'btn-outline-info')} onClick={()=>setGender('Mujer')}>Mujer</button>
                <button type="button" className={"btn btn-sm me-2 flex-1 " + (gender==='Unisex' ? 'btn-info text-white' : 'btn-outline-info')} onClick={()=>setGender('Unisex')}>Unisex</button>
              </div>
            </div>
            <div>
              <label className="form-label">Marca</label>
              <div className="d-flex flex-wrap gap-8">
                {brands.map(b=> (
                  <button key={b} type="button" className={"btn btn-sm me-2 " + (brand===b ? 'btn-info text-white' : 'btn-outline-info')} onClick={()=>setBrand(b)}>{b}</button>
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
              <select className="form-select form-control-sm select-sort" value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="featured">Destacados</option>
                <option value="price-asc">Precio ↑</option>
                <option value="price-desc">Precio ↓</option>
                <option value="az">Nombre A-Z</option>
                <option value="za">Nombre Z-A</option>
              </select>
            </div>
          </div>

          <div className="row g-4">
            {filtered.map(p=> (
              <div key={p.id} className="col-6 col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="product-thumb">
                    <img src={getProductImage(p)} alt={p.nombre || p.title} className="product-img" />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{p.nombre || p.title}</h6>
                    <p className="text-muted small mb-2 flex-1">{p.desc}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="fw-700">${(p.precio ?? p.price).toLocaleString()}</div>
                      <div>
                        <Link to={`/product/${p.id}`} className="btn btn-sm btn-outline-info me-2">Ver</Link>
                        <button className="btn btn-sm btn-outline-info me-2" onClick={()=> addToCart(p)}>Añadir</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

