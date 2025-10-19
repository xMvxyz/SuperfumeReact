import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'superfume_products_v1'

function loadProducts(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){
    return []
  }
}

function saveProducts(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export default function Admin(){
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({nombre:'', descripcion:'', precio:'', img:'/img/producto_01.jpg', genero:'', marca:''})
  const [errors, setErrors] = useState({})
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(()=>{
    setProducts(loadProducts())
  }, [])

  function addProduct(e){
    e.preventDefault()
    const newErrors = {}
  if(!form.nombre || form.nombre.trim().length === 0) newErrors.nombre = 'El Nombre es obligatorio'
  // descripcion optional but trim if provided
  const priceInt = parseInt(form.precio, 10)
  if(isNaN(priceInt) || priceInt <= 0) newErrors.precio = 'El precio debe ser un entero positivo'
    if(Object.keys(newErrors).length){ setErrors(newErrors); return }

    const id = Date.now()
  const p = { id, nombre: form.nombre.trim(), descripcion: (form.descripcion||'').trim(), precio: priceInt, img: form.img, genero: form.genero || '', marca: form.marca || '' }
    const next = [p, ...products]
    setProducts(next)
    saveProducts(next)
  setForm({nombre:'', descripcion:'', precio:'', img:'/img/producto_01.jpg', genero:'', marca:''})
    setErrors({})
  }

  const [confirmState, setConfirmState] = useState({ open:false, id:null, nombre:'' })

  function requestRemoveProduct(id){
    const p = products.find(x=>x.id===id)
    setConfirmState({ open:true, id, nombre: p ? (p.nombre || p.title) : '' })
  }

  function confirmRemove(){
    const id = confirmState.id
    if(id == null) return
    const next = products.filter(p=>p.id !== id)
    setProducts(next)
    saveProducts(next)
    setConfirmState({ open:false, id:null, nombre:'' })
  }

  function cancelConfirm(){
    setConfirmState({ open:false, id:null, nombre:'' })
  }

  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({nombre:'', descripcion:'', precio:'', img:'', genero:'', marca:''})

  function startEdit(p){
    setEditingId(p.id)
    setEditValues({
      nombre: p.nombre || p.title || '',
      descripcion: p.descripcion || '',
      precio: String(p.precio ?? p.price ?? ''),
      img: p.img || p.image || '',
      genero: p.genero || p.gender || '',
      marca: p.marca || p.brand || ''
    })
    setErrors({})
  }

  function cancelEdit(){
    setEditingId(null)
    setEditValues({nombre:'', precio:'', img:''})
    setErrors({})
  }

  function saveEdit(id){
    const newErrors = {}
    if(!editValues.nombre || editValues.nombre.trim().length === 0) newErrors.nombre = 'El Nombre es obligatorio'
    const priceInt = parseInt(editValues.precio,10)
    if(isNaN(priceInt) || priceInt <= 0) newErrors.precio = 'El precio debe ser un entero positivo'
    if(Object.keys(newErrors).length){ setErrors(newErrors); return }

    const next = products.map(p => p.id === id ? {...p, nombre: editValues.nombre.trim(), descripcion: (editValues.descripcion||'').trim(), precio: priceInt, img: editValues.img, genero: editValues.genero || '', marca: editValues.marca || ''} : p)
    setProducts(next)
    saveProducts(next)
    cancelEdit()
  }

  function readFileAsDataUrl(file){
    return new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.onload = () => resolve(fr.result)
      fr.onerror = reject
      fr.readAsDataURL(file)
    })
  }

  async function handleFormFileChange(e){
    const file = e.target.files && e.target.files[0]
    if(!file) return
    try{
      const data = await readFileAsDataUrl(file)
      setForm(f => ({...f, img: data}))
    }catch(err){
      console.error('file read error', err)
    }
  }

  async function handleEditFileChange(e){
    const file = e.target.files && e.target.files[0]
    if(!file) return
    try{
      const data = await readFileAsDataUrl(file)
      setEditValues(v => ({...v, img: data}))
    }catch(err){
      console.error('file read error', err)
    }
  }

  return (
    <div className="container py-4">
      <h2>Panel de administración</h2>
      <p></p>

      <div className="card mb-4 p-3">
        <div className="filters-row">
          <input
            className="search-input"
            placeholder="Buscar..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
          <div className="sort-wrap">
            <label className="sort-label">Ordenar Por:</label>
            <select
              className="sort-select"
              value={sortBy}
              onChange={e=>setSortBy(e.target.value)}
            >
              <option value="newest">Más nuevos</option>
              <option value="oldest">Más antiguos</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="title-az">Título A-Z</option>
              <option value="title-za">Título Z-A</option>
            </select>
          </div>
        </div>

  <form className="admin-form" onSubmit={addProduct}>
          <div className="admin-form-col min-h-54">
            <input
              placeholder="Nombre del Producto"
              value={form.nombre}
              onChange={e=>setForm(f=>({...f, nombre: e.target.value}))}
            />
            {errors.nombre && <small className="error-text">{errors.nombre}</small>}
          </div>
          <div className="admin-form-col min-h-54">
            <input
              placeholder="Descripción"
              value={form.descripcion}
              onChange={e=>setForm(f=>({...f, descripcion: e.target.value}))}
            />
          </div>
          <div className="admin-form-col min-h-54">
            <input
              placeholder="Precio"
              value={form.precio}
              onChange={e=>setForm(f=>({...f, precio: e.target.value}))}
            />
            {errors.precio && <small className="error-text">{errors.precio}</small>}
          </div>
          <div className="admin-form-col min-h-54">
            <input
              placeholder="Marca"
              value={form.marca}
              onChange={e=>setForm(f=>({...f, marca: e.target.value}))}
            />
          </div>
          <div className="admin-form-col min-h-54">
            <select value={form.genero} onChange={e=>setForm(f=>({...f, genero: e.target.value}))}>
              <option value="">Género</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
          <div className="admin-form-col image-col min-h-54 min-w-220">
            <label className="image-label">Imagen</label>
            <input type="file" accept="image/*" onChange={handleFormFileChange} />
            <div className="spacer-6"></div>
          </div>
          <button className="btn btn-success" type="submit">Agregar</button>
        </form>
      </div>

      <div>
        <h3>Productos ({products.length})</h3>
        <div className="list-col">
          {products
            .filter(p => (p.nombre || p.title || '').toLowerCase().includes(query.toLowerCase()))
            .slice()
            .sort((a,b)=>{
              switch(sortBy){
                case 'newest': return b.id - a.id
                case 'oldest': return a.id - b.id
                case 'price-asc': return (a.precio ?? a.price) - (b.precio ?? b.price)
                case 'price-desc': return (b.precio ?? b.price) - (a.precio ?? a.price)
                case 'title-az': return (a.nombre || a.title || '').localeCompare(b.nombre || b.title || '')
                case 'title-za': return (b.nombre || b.title || '').localeCompare(a.nombre || a.title || '')
                default: return 0
              }
            })
            .map(p => (
            <div key={p.id} className="card p-2">
              <div className="admin-row">
                {/* Imagen izquierda */}
                <div className="thumb-col">
                  <img src={p.img || p.image} alt={p.nombre || p.title} className="thumb-img" />
                </div>

                <div className="details-col">
                  {editingId === p.id ? (
                    <div className="edit-grid">
                      <div className="admin-form-col min-w-180">
                        <label className="field-label">Nombre</label>
                        <input
                          value={editValues.nombre}
                          onChange={e=>setEditValues(v=>({...v, nombre: e.target.value}))}
                        />
                        {errors.nombre && <small className="error-text">{errors.nombre}</small>}
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Precio</label>
                        <input
                          value={editValues.precio}
                          onChange={e=>setEditValues(v=>({...v, precio: e.target.value}))}
                        />
                        {errors.precio && <small className="error-text">{errors.precio}</small>}
                      </div>
                      <div className="admin-form-col min-w-180">
                        <label className="field-label">Descripción</label>
                        <input
                          value={editValues.descripcion}
                          onChange={e=>setEditValues(v=>({...v, descripcion: e.target.value}))}
                        />
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Marca</label>
                        <input
                          value={editValues.marca}
                          onChange={e=>setEditValues(v=>({...v, marca: e.target.value}))}
                        />
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Género</label>
                        <select value={editValues.genero} onChange={e=>setEditValues(v=>({...v, genero: e.target.value}))}>
                          <option value="">Género</option>
                          <option value="Hombre">Hombre</option>
                          <option value="Mujer">Mujer</option>
                          <option value="Unisex">Unisex</option>
                        </select>
                      </div>
                      <div className="admin-form-col image-col min-w-200">
                        <input type="file" accept="image/*" onChange={handleEditFileChange} />
                        <div className="spacer-6"></div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="title-no-margin">{p.nombre || p.title}</h4>
                      {p.descripcion && <p className="descripcion">{p.descripcion}</p>}
                      <p className="price">${(p.precio ?? p.price)}</p>
                      <p className="meta"><strong>Marca:</strong> {p.marca || p.brand || '-'}  </p>
                      <p className="meta"><strong>Género:</strong> {p.genero || p.gender || '-'} </p>
                    </div>
                  )}
                </div>

                {/* Opciones a la derecha */}
                <div className="actions-col">
                  {editingId === p.id ? (
                    <div className="actions-inline">
                      <button type="button" className="btn btn-success" onClick={()=> saveEdit(p.id)}>Guardar</button>
                      <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancelar</button>
                    </div>
                  ) : (
                    <div className="actions-inline">
                      <button type="button" className="btn btn-primary" onClick={()=> startEdit(p)}>Editar</button>
                      <button type="button" className="btn btn-danger" onClick={()=> requestRemoveProduct(p.id)}>Eliminar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmState.open && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h4 className="mt-0">Confirmar eliminación</h4>
            <p>¿Estás seguro de que deseas eliminar <strong>{confirmState.nombre}</strong>?</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={cancelConfirm}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmRemove}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}