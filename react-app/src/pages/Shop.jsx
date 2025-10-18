import React, { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const SAMPLE_PRODUCTS = [
  {id:1,title:'Dior Poison', desc:'Dior Poison EDT 100ML', price:124990, img:'/img/tienda_01.jpg', gender:'Mujer', brand:'Dior'},
  {id:2,title:'Sweet Dream', desc:'Sweet Dream EDT 80ML', price:14990, img:'/img/tienda_02.jpg', gender:'Mujer', brand:'Generic'},
  {id:3,title:'Dance', desc:'Shakira Dance Edt 50Ml Vap', price:20000, img:'/img/tienda_03.jpg', gender:'Mujer', brand:'Shakira'},
  {id:4,title:'Dolce Garden', desc:'Dolce Garden Edp 75 Ml', price:130000, img:'/img/tienda_04.jpg', gender:'Mujer', brand:'Dolce & Gabbana'},
  {id:5,title:'Hugo Boss Bottled Infinite', desc:'Bottled Infinite Edp 100ml', price:81990, img:'/img/tienda_05.jpg', gender:'Hombre', brand:'Hugo Boss'},
  {id:6,title:'Stronger With You', desc:'Stronger With You EDP 100ML', price:150990, img:'/img/tienda_06.jpg', gender:'Hombre', brand:'Emporio'},
  {id:7,title:'Burberry Hero', desc:'Burberry Hero Parfum Intense 100ml', price:189990, img:'/img/tienda_07.jpg', gender:'Hombre', brand:'Burberry'},
  {id:8,title:'Victoria Secret Tease', desc:'Perfume Victoria Secret Tease 100ml', price:112990, img:'/img/tienda_08.jpg', gender:'Mujer', brand:'Victoria Secret'},
  {id:9,title:'Le Beau', desc:'Le Beau Jean Paul Gaultier 125ML EDP Intense', price:199990, img:'/img/tienda_09.jpg', gender:'Hombre', brand:'Jean Paul Gaultier'},
]

export default function Shop(){
  const [products, setProducts] = useState(()=>{
    try{
      const raw = localStorage.getItem('superfume_products_v1')
      if(raw){
        const parsed = JSON.parse(raw)
        if(Array.isArray(parsed) && parsed.length) return parsed
      }
    }catch(e){

    }
    return SAMPLE_PRODUCTS
  })

  useEffect(()=>{
    const onStorage = (e)=>{
      if(e.key === 'superfume_products_v1'){
        try{
          const parsed = JSON.parse(e.newValue)
          if(Array.isArray(parsed)) setProducts(parsed)
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

  const brands = useMemo(()=>['Todos', ...Array.from(new Set(products.map(p=>p.brand)))], [products])

  const filtered = useMemo(()=>{
    let list = products.slice()
    if(query && query.trim()){
      const q = query.trim().toLowerCase()
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
    }
    if(gender !== 'Todos') list = list.filter(p => p.gender === gender)
    if(brand !== 'Todos') list = list.filter(p => p.brand === brand)

    switch(sortBy){
      case 'price-asc': list.sort((a,b)=>a.price-b.price); break
      case 'price-desc': list.sort((a,b)=>b.price-a.price); break
      case 'az': list.sort((a,b)=>a.title.localeCompare(b.title)); break
      case 'za': list.sort((a,b)=>b.title.localeCompare(a.title)); break
      default: break
    }

    return list
  },[products, query, gender, brand, sortBy])


  useEffect(()=>{
    if(query) setSearchParams({ query })
    else setSearchParams({})
  },[query, setSearchParams])

  return (
    <div className="container py-5">
      <div className="row">
        <aside className="col-lg-3 mb-4">
          <div className="card p-3 mb-3 border" style={{borderColor:'#1d242d'}}>
            <h5 style={{color:'#1d242d'}}>Categorías</h5>
            <div className="mb-3">
              <div className="d-flex" role="group" aria-label="Género" style={{gap:8}}>
                <button type="button" className={"btn flex-fill text-white " + (gender==='Todos' ? 'btn-primary' : 'btn-outline-primary')} onClick={()=>setGender('Todos')}>Todos</button>
                <button type="button" className={"btn flex-fill text-white " + (gender==='Hombre' ? 'btn-primary' : 'btn-outline-primary')} onClick={()=>setGender('Hombre')}>Hombre</button>
                <button type="button" className={"btn flex-fill text-white " + (gender==='Mujer' ? 'btn-primary' : 'btn-outline-primary')} onClick={()=>setGender('Mujer')}>Mujer</button>
              </div>
            </div>
            <div>
              <label className="form-label">Marca</label>
              <div className="d-flex flex-wrap" style={{gap:8}}>
                {brands.map(b=> (
                  <button key={b} type="button" className={"btn btn-sm text-white " + (brand===b ? 'btn-primary' : 'btn-outline-primary')} onClick={()=>setBrand(b)}>{b}</button>
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
            <div style={{display:'flex', gap:8, alignItems:'center'}}>
              <label className="me-2">Ordenar</label>
              <select className="form-select" style={{width:180}} value={sortBy} onChange={e=>setSortBy(e.target.value)}>
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
                    <div style={{height:260, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', background:'#f8f9fa'}}>
                      <img src={p.img} alt={p.title} style={{maxWidth:'100%', maxHeight:'100%', objectFit:'contain'}} />
                    </div>
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{p.title}</h6>
                    <p className="text-muted small mb-2" style={{flex:1}}>{p.desc}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{fontWeight:700}}>${p.price.toLocaleString()}</div>
                      <div>
                        <Link to={`/product/${p.id}`} className="btn btn-sm btn-primary me-2">Ver</Link>
                        <button className="btn btn-sm btn-outline-secondary">Añadir</button>
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

