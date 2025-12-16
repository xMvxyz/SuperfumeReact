import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as usersApi from '../services/usuario'
import * as perfumeService from '../services/perfume'

export default function Admin(){
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({nombre:'', descripcion:'', precio:'', stock:'', img:'/img/producto_01.jpg', genero:'', marca:'', fragancia:'', notas:'', perfil:''})
  const [errors, setErrors] = useState({})
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [creatingProduct, setCreatingProduct] = useState(false)
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' })

  const [users, setUsers] = useState([])
  const [userQuery, setUserQuery] = useState('')
  const [userForm, setUserForm] = useState({ name:'', email:'', password:'', rut:'', phone:'', address:'', region:'', comuna:'', postalCode:'', role:'cliente' })
  const [userErrors, setUserErrors] = useState({})
  const [editingUserId, setEditingUserId] = useState(null)
  const [initError, setInitError] = useState(null)
  const [userModal, setUserModal] = useState({ isOpen: false, title: '', message: '' })
  const [confirmDeleteUser, setConfirmDeleteUser] = useState({ open: false, id: null, name: '' })

  const CHILE_REGIONS = [
    { name: 'Región de Arica y Parinacota', comunas: ['Arica','Camarones','Putre','General Lagos'] },
    { name: 'Región de Tarapacá', comunas: ['Iquique','Alto Hospicio','Pozo Almonte','Pica','Huara','Colchane','Camiña'] },
    { name: 'Región de Antofagasta', comunas: ['Antofagasta','Mejillones','Calama','Tocopilla','Taltal','Sierra Gorda','María Elena','Ollagüe'] },
    { name: 'Región de Atacama', comunas: ['Copiapó','Caldera','Vallenar','Chañaral','Diego de Almagro','Tierra Amarilla','Huasco','Freirina','Alto del Carmen'] },
    { name: 'Región de Coquimbo', comunas: ['La Serena','Coquimbo','Ovalle','Illapel','Vicuña','Andacollo','Monte Patria','Combarbalá','Paihuano'] },
    { name: 'Región de Valparaíso', comunas: ['Valparaíso','Viña del Mar','Quilpué','Villa Alemana','Concón','Quintero','Puchuncaví','Casablanca','San Antonio','Cartagena','El Quisco','Algarrobo','Santo Domingo'] },
    { name: 'Región Metropolitana de Santiago', comunas: ['Santiago','Providencia','Las Condes','Maipú','Puente Alto','La Florida','Ñuñoa','Vitacura','Lo Barnechea','Peñalolén','Macul','La Reina','Quilicura','Huechuraba','Recoleta','Independencia','Conchalí','Renca','Quinta Normal','Estación Central','Cerrillos','Pedro Aguirre Cerda','Lo Espejo','San Miguel','San Joaquín','La Cisterna','El Bosque','La Granja','La Pintana','San Ramón','Lo Prado','Cerro Navia','Pudahuel','Colina','Lampa','Tiltil','San Bernardo','Calera de Tango','Buin','Paine','Melipilla','Alhué','Curacaví','María Pinto','San Pedro','Talagante','El Monte','Isla de Maipo','Padre Hurtado','Peñaflor'] },
    { name: "Región del Libertador General Bernardo O'Higgins", comunas: ['Rancagua','Machalí','San Fernando','Rengo','San Vicente','Pichilemu','Santa Cruz','Chimbarongo','Nancagua','Placilla','Graneros','Codegua'] },
    { name: 'Región del Maule', comunas: ['Talca','Curicó','Linares','Constitución','Cauquenes','Parral','Molina','San Clemente','San Javier','Villa Alegre','Maule'] },
    { name: 'Región de Ñuble', comunas: ['Chillán','Chillán Viejo','Bulnes','San Carlos','Quirihue','Coihueco','Pinto','El Carmen','Pemuco','Yungay','San Nicolás','Ninhue'] },
    { name: 'Región del Biobío', comunas: ['Concepción','Talcahuano','Chiguayante','San Pedro de la Paz','Hualpén','Penco','Tomé','Coronel','Lota','Los Ángeles','Cabrero','Nacimiento','Cañete','Lebu','Arauco','Curanilahue'] },
    { name: 'Región de La Araucanía', comunas: ['Temuco','Villarrica','Pucón','Angol','Victoria','Lautaro','Nueva Imperial','Carahue','Pitrufquén','Loncoche','Collipulli','Traiguén','Curacautín','Lonquimay','Melipeuco','Curarrehue','Cunco'] },
    { name: 'Región de Los Ríos', comunas: ['Valdivia','La Unión','Río Bueno','Panguipulli','Paillaco','Lanco','Los Lagos','Corral','Máfil','Mariquina','Futrono','Lago Ranco'] },
    { name: 'Región de Los Lagos', comunas: ['Puerto Montt','Osorno','Castro','Ancud','Puerto Varas','Frutillar','Llanquihue','Fresia','Los Muermos','Maullín','Calbuco','Cochamó','Purranque','Río Negro','San Pablo','Puerto Octay','Quellón','Quemchi','Dalcahue','Curaco de Vélez','Quinchao','Puqueldón','Chonchi'] },
    { name: 'Región de Aysén del General Carlos Ibáñez del Campo', comunas: ['Coyhaique','Aysén','Puerto Aysén','Chile Chico','Cochrane','Río Ibáñez','Cisnes','Guaitecas','Lago Verde','Tortel'] },
    { name: 'Región de Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas','Puerto Natales','Porvenir','Puerto Williams','Cabo de Hornos','Primavera','Timaukel','Torres del Paine','Laguna Blanca','San Gregorio','Río Verde'] }
  ]

  // Verificar autenticación y rol de administrador
  useEffect(()=>{
    try{
      const authData = localStorage.getItem('superfume_auth_v1')
      console.log('Verificando autenticación en Admin...')
      
      if(!authData){
        console.log('No hay sesión, redirigiendo a login')
        navigate('/login')
        return
      }
      
      const parsed = JSON.parse(authData)
      const { user, token } = parsed
      const userRole = user?.role?.toLowerCase()
      
      console.log('Datos de sesión encontrados:')
      console.log('  - Usuario:', user?.nombre)
      console.log('  - Email:', user?.correo)
      console.log('  - Rol:', user?.role)
      console.log('  - Rol (lowercase):', userRole)
      console.log('  - Rol ID:', user?.rol?.id)
      console.log('  - Token presente:', token ? 'Sí' : 'No')
      console.log('  - Token length:', token ? token.length : 0)
      
      // Verificar que el rol sea admin o administrador
      if(userRole !== 'admin' && userRole !== 'administrador'){
        console.log('Usuario no es administrador, redirigiendo a /shop')
        console.log('Rol detectado:', userRole)
        navigate('/shop')
        return
      }
      
      console.log('Usuario autorizado para acceder al panel de administración')
    }catch(e){
      console.error('Error verificando autenticación:', e)
      navigate('/login')
    }
  }, [navigate])

  useEffect(()=>{
    (async ()=>{
      try{
        const u = await usersApi.list()
        setUsers(u || [])
        
        const perfumes = await perfumeService.list()
        console.log('Perfumes cargados en Admin:', perfumes.length)
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
      setModal({ isOpen: true, title: 'Producto creado', message: 'Producto creado correctamente' })
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
    if(!userForm.rut || userForm.rut.trim().length < 8) errs.rut = 'RUT requerido'
    if(!userForm.phone || !/^[0-9]{8,9}$/.test(userForm.phone.trim())) errs.phone = 'Teléfono inválido (8-9 dígitos)'
    if(!userForm.address || userForm.address.trim().length < 5) errs.address = 'Dirección requerida'
    if(!userForm.region) errs.region = 'Región requerida'
    if(!userForm.comuna) errs.comuna = 'Comuna requerida'
    if(!userForm.postalCode || !/^\d{4,6}$/.test(userForm.postalCode)) errs.postalCode = 'Código postal inválido'
    if(Object.keys(errs).length){ setUserErrors(errs); return }
    
    try{
      const direccionCompleta = `${userForm.address.trim()}, ${userForm.comuna}, ${userForm.region}, ${userForm.postalCode.trim()}`
      const payload = {
        name: userForm.name.trim(),
        email: userForm.email.trim(),
        password: userForm.password,
        rut: userForm.rut.trim(),
        phone: userForm.phone.trim(),
        address: direccionCompleta,
        role: userForm.role
      }
      const created = await usersApi.create(payload)
      setUserForm({ name:'', email:'', password:'', rut:'', phone:'', address:'', region:'', comuna:'', postalCode:'', role:'cliente' })
      setUserErrors({})
      await loadUsers()
      setUserModal({ isOpen: true, title: 'Usuario creado', message: 'Usuario creado correctamente' })
    }catch(err){ 
      console.error('create user', err)
      setUserModal({ isOpen: true, title: 'Error', message: 'Error al crear usuario: ' + (err.message || 'Error desconocido') })
    }
  }

  function startEditUser(u){
    console.log('Editando usuario:', u)
    setEditingUserId(u.id)
    
    // Parsear la dirección si existe
    let addr = '', reg = '', com = '', postal = ''
    if(u.address){
      console.log('Dirección original:', u.address)
      const parts = u.address.split(',').map(p => p.trim())
      console.log('Partes de dirección:', parts)
      if(parts.length >= 4){
        addr = parts[0]
        com = parts[1]
        reg = parts[2]
        postal = parts[3]
      } else if(parts.length === 1){
        // Si no hay comas, tomar la dirección completa
        addr = u.address
      }
    }
    
    const newForm = { 
      name: u.name || '', 
      email: u.email || '', 
      password: '', 
      rut: u.rut || '',
      phone: u.phone || '',
      address: addr,
      region: reg,
      comuna: com,
      postalCode: postal,
      role: u.role || 'cliente' 
    }
    console.log('Formulario actualizado:', newForm)
    setUserForm(newForm)
    setUserErrors({})
    
    // Scroll al formulario
    setTimeout(() => {
      const formElement = document.querySelector('form[data-user-form]')
      if(formElement){
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  async function saveUser(id){
    const errs = {}
    if(!userForm.name || userForm.name.trim().length < 2) errs.name = 'Nombre requerido'
    if(!userForm.email || !userForm.email.includes('@')) errs.email = 'Email inválido'
    if(userForm.password && userForm.password.length < 6) errs.password = 'Mínimo 6 caracteres'
    if(!userForm.rut || userForm.rut.trim().length < 8) errs.rut = 'RUT requerido'
    if(!userForm.phone || !/^[0-9]{8,9}$/.test(userForm.phone.trim())) errs.phone = 'Teléfono inválido'
    if(!userForm.address || userForm.address.trim().length < 5) errs.address = 'Dirección requerida'
    if(!userForm.region) errs.region = 'Región requerida'
    if(!userForm.comuna) errs.comuna = 'Comuna requerida'
    if(!userForm.postalCode || !/^\d{4,6}$/.test(userForm.postalCode)) errs.postalCode = 'Código postal inválido'
    if(Object.keys(errs).length){ setUserErrors(errs); return }

    try{
      const direccionCompleta = `${userForm.address.trim()}, ${userForm.comuna}, ${userForm.region}, ${userForm.postalCode.trim()}`
      const updates = { 
        name: userForm.name.trim(), 
        email: userForm.email.trim(), 
        rut: userForm.rut.trim(),
        phone: userForm.phone.trim(),
        address: direccionCompleta,
        role: userForm.role 
      }
      if(userForm.password && userForm.password.length >= 6) updates.password = userForm.password
      
      await usersApi.update(id, updates)
      setEditingUserId(null)
      setUserForm({ name:'', email:'', password:'', rut:'', phone:'', address:'', region:'', comuna:'', postalCode:'', role:'cliente' })
      setUserErrors({})
      await loadUsers()
      setUserModal({ isOpen: true, title: 'Usuario actualizado', message: 'Usuario actualizado correctamente' })
    }catch(e){ 
      console.error(e)
      setUserModal({ isOpen: true, title: 'Error', message: 'Error al actualizar usuario: ' + (e.message || 'Error desconocido') })
    }
  }

  function requestDeleteUser(id){
    const u = users.find(x => x.id === id)
    setConfirmDeleteUser({ open: true, id, name: u ? u.name : '' })
  }

  async function confirmDeleteUserAction(){
    const id = confirmDeleteUser.id
    if(id == null) return
    try{ 
      await usersApi.remove(id)
      await loadUsers()
      setConfirmDeleteUser({ open: false, id: null, name: '' })
      setUserModal({ isOpen: true, title: 'Usuario eliminado', message: 'Usuario eliminado correctamente' })
    }catch(e){ 
      console.error(e)
      setConfirmDeleteUser({ open: false, id: null, name: '' })
      setUserModal({ isOpen: true, title: 'Error', message: 'Error al eliminar usuario' })
    }
  }

  function cancelDeleteUser(){
    setConfirmDeleteUser({ open: false, id: null, name: '' })
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
        setModal({ isOpen: true, title: 'Producto actualizado', message: 'Producto actualizado correctamente' })
      }else{
        setErrors({general: 'No se pudo actualizar el perfume'})
        setModal({ isOpen: true, title: 'Error', message: 'No se pudo actualizar el perfume' })
      }
    }catch(err){
      console.error('Error actualizando perfume:', err)
      setErrors({general: 'Error al actualizar perfume'})
      setModal({ isOpen: true, title: 'Error', message: 'Error al actualizar perfume: ' + (err.message || 'Error desconocido') })
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
          
          <form onSubmit={addUser} data-user-form className="mb-4 p-3" style={{backgroundColor: editingUserId ? '#fff3cd' : '#f8f9fa', borderRadius: '8px', border: editingUserId ? '2px solid #ffc107' : 'none'}}>
            <h5 className="mb-3" style={{color: '#333'}}>{editingUserId ? '✏️ Editando Usuario' : 'Crear Nuevo Usuario'}</h5>
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
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>RUT *</label>
                <input 
                  className="form-control"
                  placeholder="12345678-9" 
                  value={userForm.rut} 
                  onChange={e=>setUserForm(f=>({...f, rut: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.rut && <small className="text-danger d-block mt-1">{userErrors.rut}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Teléfono *</label>
                <input 
                  className="form-control"
                  placeholder="912345678" 
                  value={userForm.phone} 
                  onChange={e=>setUserForm(f=>({...f, phone: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.phone && <small className="text-danger d-block mt-1">{userErrors.phone}</small>}
              </div>
              <div className="col-md-12 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Dirección *</label>
                <input 
                  className="form-control"
                  placeholder="Calle y número" 
                  value={userForm.address} 
                  onChange={e=>setUserForm(f=>({...f, address: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.address && <small className="text-danger d-block mt-1">{userErrors.address}</small>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Región *</label>
                <select 
                  className="form-select"
                  value={userForm.region} 
                  onChange={e=>setUserForm(f=>({...f, region: e.target.value, comuna: ''}))}
                  style={{borderRadius: '5px'}}
                >
                  <option value="">Seleccionar región</option>
                  {CHILE_REGIONS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </select>
                {userErrors.region && <small className="text-danger d-block mt-1">{userErrors.region}</small>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Comuna *</label>
                <select 
                  className="form-select"
                  value={userForm.comuna} 
                  onChange={e=>setUserForm(f=>({...f, comuna: e.target.value}))}
                  style={{borderRadius: '5px'}}
                  disabled={!userForm.region}
                >
                  <option value="">Seleccionar comuna</option>
                  {userForm.region && CHILE_REGIONS.find(r => r.name === userForm.region)?.comunas.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {userErrors.comuna && <small className="text-danger d-block mt-1">{userErrors.comuna}</small>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Código Postal *</label>
                <input 
                  className="form-control"
                  placeholder="8320000" 
                  value={userForm.postalCode} 
                  onChange={e=>setUserForm(f=>({...f, postalCode: e.target.value}))}
                  style={{borderRadius: '5px'}}
                />
                {userErrors.postalCode && <small className="text-danger d-block mt-1">{userErrors.postalCode}</small>}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" style={{fontWeight: '500', color: '#333'}}>Contraseña {editingUserId && '(dejar vacío para no cambiar)'}</label>
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
              {editingUserId ? (
                <>
                  <button type="button" className="btn btn-dark px-4" onClick={()=> saveUser(editingUserId)} style={{borderRadius: '5px'}}>Guardar Cambios</button>
                  <button type="button" className="btn btn-secondary px-4" onClick={()=> { setEditingUserId(null); setUserForm({ name:'', email:'', password:'', rut:'', phone:'', address:'', region:'', comuna:'', postalCode:'', role:'cliente' }); setUserErrors({}) }} style={{borderRadius: '5px'}}>Cancelar</button>
                </>
              ) : (
                <button className="btn btn-success px-4" type="submit" style={{borderRadius: '5px'}}>Crear Usuario</button>
              )}
            </div>
          </form>

          <div>
            <h5 className="mb-3" style={{color: '#333'}}>Lista de Usuarios</h5>
            <div className="list-col">
              {users.filter(u => (u.name || '').toLowerCase().includes(userQuery.toLowerCase())).map(u => (
                <div key={u.id} className="card p-3 mb-2" style={{borderRadius: '8px', border: '1px solid #e0e0e0'}}>
                  <div className="d-flex align-items-start gap-3">
                    <div style={{flex:1}}>
                      <h6 className="mb-1" style={{color: '#000'}}>{u.name}</h6>
                      <small className="text-muted d-block">{u.email}</small>
                    </div>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-sm btn-dark" 
                        onClick={()=> startEditUser(u)} 
                        style={{borderRadius: '5px'}}
                        disabled={editingUserId === u.id}
                      >
                        {editingUserId === u.id ? 'Editando' : 'Editar'}
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={()=> requestDeleteUser(u.id)} style={{borderRadius: '5px'}}>Eliminar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {confirmDeleteUser.open && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h4 className="mt-0">Confirmar eliminación de usuario</h4>
            <p>¿Estás seguro de que deseas eliminar al usuario <strong>{confirmDeleteUser.name}</strong>?</p>
            <div className="modal-actions">
              <button className="btn btn-dark" onClick={cancelDeleteUser}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmDeleteUserAction}>Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {userModal.isOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <h4 className="mt-0">{userModal.title}</h4>
            <p>{userModal.message}</p>
            <div className="modal-actions">
              <button className="btn btn-dark" onClick={() => setUserModal({ ...userModal, isOpen: false })}>Continuar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}