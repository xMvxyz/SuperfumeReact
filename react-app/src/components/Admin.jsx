import React, { useState, useEffect } from 'react'
import * as usersApi from '../services/usuario'
import * as perfumeService from '../services/perfume'

export default function Admin(){
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({nombre:'', descripcion:'', precio:'', stock:'', img:'/img/producto_01.jpg', genero:'', marca:'', fragancia:'', notas:'', perfil:''})
  const [errors, setErrors] = useState({})
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [creatingProduct, setCreatingProduct] = useState(false)

  const [users, setUsers] = useState([])
  const [userQuery, setUserQuery] = useState('')
  const [userForm, setUserForm] = useState({ name:'', email:'', password:'', role:'cliente' })
  const [userErrors, setUserErrors] = useState({})
  const [editingUserId, setEditingUserId] = useState(null)
  const [initError, setInitError] = useState(null)

  useEffect(()=>{
    (async ()=>{
      try{
        const u = await usersApi.list()
        setUsers(u || [])
        
        const perfumes = await perfumeService.list()
        console.log('✓ Perfumes cargados en Admin:', perfumes.length)
        setProducts(perfumes || [])
      }catch(e){
        console.error('Error cargando datos de admin:', e)
        setInitError(String(e.message || e))
      }
    })()
  }, [])

  async function addProduct(e){
    e.preventDefault()
    const newErrors = {}
  if(!form.nombre || form.nombre.trim().length === 0) newErrors.nombre = 'El Nombre es obligatorio'
  if(!form.fragancia || form.fragancia.trim().length === 0) newErrors.fragancia = 'La Fragancia es obligatoria'
  if(!form.notas || form.notas.trim().length === 0) newErrors.notas = 'Las Notas son obligatorias'
  if(!form.perfil || form.perfil.trim().length === 0) newErrors.perfil = 'El Perfil es obligatorio'
  const priceInt = parseInt(form.precio, 10)
  if(isNaN(priceInt) || priceInt <= 0) newErrors.precio = 'El precio debe ser un entero positivo'
  const stockInt = parseInt(form.stock, 10)
  if(isNaN(stockInt) || stockInt < 0) newErrors.stock = 'El stock debe ser un número no negativo'
    if(Object.keys(newErrors).length){ setErrors(newErrors); return }

    const payload = { nombre: form.nombre.trim(), descripcion: (form.descripcion||'').trim(), precio: priceInt, stock: stockInt, genero: form.genero || '', marca: form.marca || '', imagenUrl: form.img, fragancia: form.fragancia.trim(), notas: form.notas.trim(), perfil: form.perfil.trim() }
    
    setCreatingProduct(true)
    try{
      const created = await perfumeService.create(payload)
      if(created && created.id){
        setProducts(prev => [created, ...prev])
      }
      setForm({nombre:'', descripcion:'', precio:'', stock:'', img:'/img/producto_01.jpg', genero:'', marca:'', fragancia:'', notas:'', perfil:''})
      setErrors({})
    }catch(err){
      console.error('Error creando perfume:', err)
      setErrors({general: 'Error al guardar perfume'})
    }finally{
      setCreatingProduct(false)
    }
  }

  async function loadUsers(){
    try{ const u = await usersApi.list(); setUsers(u || []) }catch(e){ console.error('users load', e) }
  }

  async function addUser(e){
    e.preventDefault()
    const errs = {}
    if(!userForm.name || userForm.name.trim().length < 2) errs.name = 'Nombre requerido'
    if(!userForm.email || !userForm.email.includes('@')) errs.email = 'Email inválido'
    if(!userForm.password || userForm.password.length < 6) errs.password = 'Mínimo 6 caracteres'
    if(Object.keys(errs).length){ setUserErrors(errs); return }
    try{
      const created = await usersApi.create(userForm)
      setUserForm({ name:'', email:'', password:'', role:'cliente' })
      setUserErrors({})
      await loadUsers()
    }catch(err){ console.error('create user', err) }
  }

  function startEditUser(u){
    setEditingUserId(u.id)
    setUserForm({ name: u.name || '', email: u.email || '', password: '', role: u.role || 'cliente' })
    setUserErrors({})
  }

  async function saveUser(id){
    const updates = { name: userForm.name, email: userForm.email, role: userForm.role }
    if(userForm.password && userForm.password.length >= 6) updates.password = userForm.password
    try{ await usersApi.update(id, updates); setEditingUserId(null); setUserForm({ name:'', email:'', password:'', role:'cliente' }); await loadUsers() }catch(e){ console.error(e) }
  }

  async function deleteUser(id){
    if(!confirm('Eliminar usuario?')) return
    try{ await usersApi.remove(id); await loadUsers() }catch(e){ console.error(e) }
  }

  const [confirmState, setConfirmState] = useState({ open:false, id:null, nombre:'' })

  function requestRemoveProduct(id){
    const p = products.find(x=>x.id===id)
    setConfirmState({ open:true, id, nombre: p ? (p.nombre || p.title) : '' })
  }

  async function confirmRemove(){
    const id = confirmState.id
    if(id == null) return
    try{
      await perfumeService.remove(id)
      const next = products.filter(p=>p.id !== id)
      setProducts(next)
      setConfirmState({ open:false, id:null, nombre:'' })
    }catch(err){
      console.error('Error eliminando perfume:', err)
      setConfirmState({ open:false, id:null, nombre:'' })
    }
  }

  function cancelConfirm(){
    setConfirmState({ open:false, id:null, nombre:'' })
  }

  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({nombre:'', descripcion:'', precio:'', stock:'', img:'', genero:'', marca:'', fragancia:'', notas:'', perfil:''})

  function startEdit(p){
    setEditingId(p.id)
    setEditValues({
      nombre: p.nombre || p.title || '',
      descripcion: p.descripcion || '',
      precio: String(p.precio ?? p.price ?? ''),
      stock: String(p.stock ?? ''),
      img: p.img || p.image || p.imagenUrl || '',
      genero: p.genero || p.gender || '',
      marca: p.marca || p.brand || '',
      fragancia: p.fragancia || '',
      notas: p.notas || '',
      perfil: p.perfil || ''
    })
    setErrors({})
  }

  function cancelEdit(){
    setEditingId(null)
    setEditValues({nombre:'', descripcion:'', precio:'', stock:'', img:'', genero:'', marca:'', fragancia:'', notas:'', perfil:''})
    setErrors({})
  }

  async function saveEdit(id){
    const newErrors = {}
    if(!editValues.nombre || editValues.nombre.trim().length === 0) newErrors.nombre = 'El Nombre es obligatorio'
    if(!editValues.fragancia || editValues.fragancia.trim().length === 0) newErrors.fragancia = 'La Fragancia es obligatoria'
    if(!editValues.notas || editValues.notas.trim().length === 0) newErrors.notas = 'Las Notas son obligatorias'
    if(!editValues.perfil || editValues.perfil.trim().length === 0) newErrors.perfil = 'El Perfil es obligatorio'
    const priceInt = parseInt(editValues.precio,10)
    if(isNaN(priceInt) || priceInt <= 0) newErrors.precio = 'El precio debe ser un entero positivo'
    const stockInt = parseInt(editValues.stock, 10)
    if(isNaN(stockInt) || stockInt < 0) newErrors.stock = 'El stock debe ser un número no negativo'
    if(Object.keys(newErrors).length){ setErrors(newErrors); return }

    const updates = { nombre: editValues.nombre.trim(), descripcion: (editValues.descripcion||'').trim(), precio: priceInt, stock: stockInt, genero: editValues.genero || '', marca: editValues.marca || '', imagenUrl: editValues.img, fragancia: editValues.fragancia.trim(), notas: editValues.notas.trim(), perfil: editValues.perfil.trim() }
    
    try{
      const updated = await perfumeService.update(id, updates)
      if(updated){
        const next = products.map(p => p.id === id ? {...p, ...updates, id, img: updates.imagenUrl} : p)
        setProducts(next)
        cancelEdit()
        alert('Producto actualizado exitosamente')
      }else{
        setErrors({general: 'No se pudo actualizar el perfume'})
        alert('Error: No se pudo actualizar el perfume')
      }
    }catch(err){
      console.error('Error actualizando perfume:', err)
      setErrors({general: 'Error al actualizar perfume'})
      alert('Error al actualizar perfume: ' + (err.message || 'Error desconocido'))
    }
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
    <div className="container py-5">
      {initError && <div className="alert alert-danger">Error inicializando Admin: {initError}</div>}
      
      <div className="mb-5">
        <h1 className="mb-2" style={{color: '#000', fontWeight: 'bold'}}>Panel de Administración</h1>
        <p className="text-muted">Gestiona productos y usuarios de Superfume</p>
      </div>

      <div className="card mb-5 shadow-sm" style={{border: 'none', borderRadius: '8px'}}>
        <div className="card-header" style={{backgroundColor: '#000', color: '#fff', borderRadius: '8px 8px 0 0', padding: '16px 20px'}}>
          <h4 className="mb-0">Agregar Nuevo Producto</h4>
        </div>
        <div className="card-body p-4">
          <div className="row mb-3">
            <div className="col-md-6 mb-3">
              <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Buscar Productos</label>
              <input
                className="form-control"
                placeholder="Buscar..."
                value={query}
                onChange={e=>setQuery(e.target.value)}
                style={{borderRadius: '5px'}}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Ordenar Por</label>
              <select
                className="form-select"
                value={sortBy}
                onChange={e=>setSortBy(e.target.value)}
                style={{borderRadius: '5px'}}
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

  <form onSubmit={addProduct}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Nombre del Producto *</label>
                <input
                  className="form-control"
                  placeholder="Ej: Chanel No. 5"
                  value={form.nombre}
                  onChange={e=>setForm(f=>({...f, nombre: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {errors.nombre && <small className="text-danger d-block mt-1">{errors.nombre}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Marca</label>
                <input
                  className="form-control"
                  placeholder="Ej: Chanel"
                  value={form.marca}
                  onChange={e=>setForm(f=>({...f, marca: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Género</label>
                <select 
                  className="form-select"
                  value={form.genero} 
                  onChange={e=>setForm(f=>({...f, genero: e.target.value}))}
                  style={{borderRadius: '5px'}}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Fragancia *</label>
                <input
                  className="form-control"
                  placeholder="Ej: Floral, Amaderada, Cítrica"
                  value={form.fragancia}
                  onChange={e=>setForm(f=>({...f, fragancia: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {errors.fragancia && <small className="text-danger d-block mt-1">{errors.fragancia}</small>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Notas *</label>
                <input
                  className="form-control"
                  placeholder="Ej: Jazmín, Vainilla, Sándalo"
                  value={form.notas}
                  onChange={e=>setForm(f=>({...f, notas: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {errors.notas && <small className="text-danger d-block mt-1">{errors.notas}</small>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Perfil *</label>
                <input
                  className="form-control"
                  placeholder="Ej: Elegante, Fresco, Sensual"
                  value={form.perfil}
                  onChange={e=>setForm(f=>({...f, perfil: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {errors.perfil && <small className="text-danger d-block mt-1">{errors.perfil}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Precio *</label>
                <input
                  className="form-control"
                  placeholder="0"
                  type="number"
                  value={form.precio}
                  onChange={e=>setForm(f=>({...f, precio: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {errors.precio && <small className="text-danger d-block mt-1">{errors.precio}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Stock *</label>
                <input
                  className="form-control"
                  placeholder="0"
                  type="number"
                  value={form.stock}
                  onChange={e=>setForm(f=>({...f, stock: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {errors.stock && <small className="text-danger d-block mt-1">{errors.stock}</small>}
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Descripción</label>
                <textarea
                  className="form-control"
                  placeholder="Descripción del producto..."
                  value={form.descripcion}
                  onChange={e=>setForm(f=>({...f, descripcion: e.target.value}))}
                  rows={3}
                  style={{borderRadius: '5px'}}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Imagen del Producto</label>
                <input 
                  type="file" 
                  className="form-control"
                  accept="image/*" 
                  onChange={handleFormFileChange}
                  style={{borderRadius: '5px'}}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-success px-4" type="submit" disabled={creatingProduct} style={{borderRadius: '5px'}}>
                {creatingProduct ? 'Guardando...' : 'Agregar Producto'}
              </button>
            </div>
            {errors.general && <small className="text-danger d-block mt-2">{errors.general}</small>}
          </form>
        </div>
      </div>

      <div className="card shadow-sm" style={{border: 'none', borderRadius: '8px'}}>
        <div className="card-header" style={{backgroundColor: '#000', color: '#fff', borderRadius: '8px 8px 0 0', padding: '16px 20px'}}>
          <h4 className="mb-0">Productos ({products.length})</h4>
        </div>
        <div className="card-body p-4">
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
                        <label className="field-label">Fragancia *</label>
                        <input
                          value={editValues.fragancia}
                          onChange={e=>setEditValues(v=>({...v, fragancia: e.target.value}))}
                        />
                        {errors.fragancia && <small className="error-text">{errors.fragancia}</small>}
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Notas *</label>
                        <input
                          value={editValues.notas}
                          onChange={e=>setEditValues(v=>({...v, notas: e.target.value}))}
                        />
                        {errors.notas && <small className="error-text">{errors.notas}</small>}
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Perfil *</label>
                        <input
                          value={editValues.perfil}
                          onChange={e=>setEditValues(v=>({...v, perfil: e.target.value}))}
                        />
                        {errors.perfil && <small className="error-text">{errors.perfil}</small>}
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Precio</label>
                        <input
                          type="number"
                          value={editValues.precio}
                          onChange={e=>setEditValues(v=>({...v, precio: e.target.value}))}
                        />
                        {errors.precio && <small className="error-text">{errors.precio}</small>}
                      </div>
                      <div className="admin-form-col min-w-120">
                        <label className="field-label">Stock</label>
                        <input
                          type="number"
                          value={editValues.stock}
                          onChange={e=>setEditValues(v=>({...v, stock: e.target.value}))}
                        />
                        {errors.stock && <small className="error-text">{errors.stock}</small>}
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
                      <p className="price"><strong>Fragancia:</strong> {p.fragancia || 'Sin fragancia especificada'}</p>
                      <p className="meta"><strong>Marca:</strong> {p.marca || p.brand || '-'}  </p>
                      <p className="meta"><strong>Género:</strong> {p.genero || p.gender || '-'} </p>
                      <p className="meta"><strong>Notas:</strong> {p.notas || '-'} </p>
                      <p className="meta"><strong>Perfil:</strong> {p.perfil || '-'} </p>
                      <p className="meta"><strong>Precio:</strong> ${(p.precio ?? p.price)} | <strong>Stock:</strong> {p.stock ?? '-'} </p>
                    </div>
                  )}
                </div>

                <div className="actions-col">
                  {editingId === p.id ? (
                    <div className="actions-inline">
                      <button type="button" className="btn btn-success" onClick={()=> saveEdit(p.id)}>Guardar</button>
                      <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancelar</button>
                    </div>
                  ) : (
                    <div className="actions-inline">
                      <button type="button" className="btn btn-dark" onClick={()=> startEdit(p)}>Editar</button>
                      <button type="button" className="btn btn-danger" onClick={()=> requestRemoveProduct(p.id)}>Eliminar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      {confirmState.open && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h4 className="mt-0">Confirmar eliminación</h4>
            <p>¿Estás seguro de que deseas eliminar <strong>{confirmState.nombre}</strong>?</p>
            <div className="modal-actions">
              <button className="btn btn-dark" onClick={cancelConfirm}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmRemove}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      <div className="card shadow-sm mt-5" style={{border: 'none', borderRadius: '8px'}}>
        <div className="card-header" style={{backgroundColor: '#000', color: '#fff', borderRadius: '8px 8px 0 0', padding: '16px 20px'}}>
          <h4 className="mb-0">Gestión de Usuarios ({users.length})</h4>
        </div>
        <div className="card-body p-4">
          <div className="mb-4">
            <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Buscar Usuarios</label>
            <input 
              className="form-control" 
              placeholder="Buscar por nombre..." 
              value={userQuery} 
              onChange={e=>setUserQuery(e.target.value)}
              style={{borderRadius: '5px'}}
            />
          </div>
          
          <form onSubmit={addUser} className="mb-4 p-3" style={{backgroundColor: '#f8f9fa', borderRadius: '8px'}}>
            <h5 className="mb-3" style={{color: '#333'}}>Crear Nuevo Usuario</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Nombre *</label>
                <input 
                  className="form-control"
                  placeholder="Nombre completo" 
                  value={userForm.name} 
                  onChange={e=>setUserForm(f=>({...f, name: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.name && <small className="text-danger d-block mt-1">{userErrors.name}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Correo Electrónico *</label>
                <input 
                  className="form-control"
                  placeholder="correo@ejemplo.com" 
                  value={userForm.email} 
                  onChange={e=>setUserForm(f=>({...f, email: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.email && <small className="text-danger d-block mt-1">{userErrors.email}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Contraseña *</label>
                <input 
                  className="form-control"
                  placeholder="Mínimo 6 caracteres" 
                  type="password" 
                  value={userForm.password} 
                  onChange={e=>setUserForm(f=>({...f, password: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.password && <small className="text-danger d-block mt-1">{userErrors.password}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Rol</label>
                <select 
                  className="form-select"
                  value={userForm.role} 
                  onChange={e=>setUserForm(f=>({...f, role: e.target.value}))}
                  style={{borderRadius: '5px'}}
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-success px-4" type="submit" style={{borderRadius: '5px'}}>Crear Usuario</button>
              {editingUserId && (
                <button type="button" className="btn btn-dark px-4" onClick={()=> saveUser(editingUserId)} style={{borderRadius: '5px'}}>Guardar Cambios</button>
              )}
            </div>
          </form>

          <div>
            <h5 className="mb-3" style={{color: '#333'}}>Lista de Usuarios</h5>
            <div className="list-col">
              {users.filter(u => (u.name || '').toLowerCase().includes(userQuery.toLowerCase())).map(u => (
                <div key={u.id} className="card p-3 mb-2 d-flex flex-row align-items-center" style={{borderRadius: '8px', border: '1px solid #e0e0e0'}}>
                  <div style={{flex:1}}>
                    <h6 className="mb-1" style={{color: '#000'}}>{u.name}</h6>
                    <small className="text-muted d-block">{u.email}</small>
                    <small><span className="badge bg-secondary mt-1">Rol: {u.role || 'cliente'}</span></small>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-dark" onClick={()=> startEditUser(u)} style={{borderRadius: '5px'}}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={()=> deleteUser(u.id)} style={{borderRadius: '5px'}}>Eliminar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}