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
  const [form, setForm] = useState({title:'', price:'', image:'/img/producto_01.jpg'})
  const [errors, setErrors] = useState({})
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(()=>{
    setProducts(loadProducts())
  }, [])

  function addProduct(e){
    e.preventDefault()
    // Validaciones
    const newErrors = {}
    if(!form.title || form.title.trim().length === 0) newErrors.title = 'El Nombre es obligatorio'
    const priceInt = parseInt(form.price, 10)
    if(isNaN(priceInt) || priceInt <= 0) newErrors.price = 'El precio debe ser un entero positivo'
    if(Object.keys(newErrors).length){ setErrors(newErrors); return }

    const id = Date.now()
    const p = { id, title: form.title.trim(), price: priceInt, image: form.image }
    const next = [p, ...products]
    setProducts(next)
    saveProducts(next)
    setForm({title:'', price:'', image:'/img/producto_01.jpg'})
    setErrors({})
  }

  const [confirmState, setConfirmState] = useState({ open:false, id:null, title:'' })

  function requestRemoveProduct(id){
    const p = products.find(x=>x.id===id)
    setConfirmState({ open:true, id, title: p ? p.title : '' })
  }

  function confirmRemove(){
    const id = confirmState.id
    if(id == null) return
    const next = products.filter(p=>p.id !== id)
    setProducts(next)
    saveProducts(next)
    setConfirmState({ open:false, id:null, title:'' })
  }

  function cancelConfirm(){
    setConfirmState({ open:false, id:null, title:'' })
  }

  // Edit support: track editing id and temp values
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({title:'', price:'', image:''})

  function startEdit(p){
    setEditingId(p.id)
    setEditValues({title: p.title, price: String(p.price), image: p.image})
    setErrors({})
  }

  function cancelEdit(){
    setEditingId(null)
    setEditValues({title:'', price:'', image:''})
    setErrors({})
  }

  function saveEdit(id){
    const newErrors = {}
    if(!editValues.title || editValues.title.trim().length === 0) newErrors.title = 'El Nombre es obligatorio'
    const priceInt = parseInt(editValues.price,10)
    if(isNaN(priceInt) || priceInt <= 0) newErrors.price = 'El precio debe ser un entero positivo'
    if(Object.keys(newErrors).length){ setErrors(newErrors); return }

    const next = products.map(p => p.id === id ? {...p, title: editValues.title.trim(), price: priceInt, image: editValues.image} : p)
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
      setForm(f => ({...f, image: data}))
    }catch(err){
      console.error('file read error', err)
    }
  }

  async function handleEditFileChange(e){
    const file = e.target.files && e.target.files[0]
    if(!file) return
    try{
      const data = await readFileAsDataUrl(file)
      setEditValues(v => ({...v, image: data}))
    }catch(err){
      console.error('file read error', err)
    }
  }

  return (
    <div className="container py-4">
      <style>{`
        .admin-form { align-items: center; }
        .admin-form-col { display:flex; flex-direction:column; }
        .image-col label { margin-bottom:6px; }
        @media (max-width: 600px) {
          .admin-form { flex-direction: column; align-items: stretch; }
          .admin-form-col { width:100% !important; }
          .admin-form-col label { display:block; margin-bottom:6px; }
          .admin-row { flex-direction: column !important; align-items: stretch; }
          .details-col { align-items: stretch; text-align: left; }
        }
      `}</style>
      <h2>Panel de administración</h2>
      <p></p>

      <div className="card mb-4 p-3">
        <div style={{display:'flex', gap:12, alignItems:'center', marginBottom:8, flexWrap:'wrap'}}>
          <input placeholder="Buscar..." value={query} onChange={e=>setQuery(e.target.value)} style={{padding:8, minWidth:220}} />
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <label style={{fontSize:13, color:'#ffff'}}>Ordenar Por:</label>
            <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:6}}>
              <option value="newest">Más nuevos</option>
              <option value="oldest">Más antiguos</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="title-az">Título A-Z</option>
              <option value="title-za">Título Z-A</option>
            </select>
          </div>
        </div>

        <form className="admin-form" onSubmit={addProduct} style={{display:'flex', gap:8, alignItems:'center', flexWrap:'wrap'}}>
          <div className="admin-form-col" style={{display:'flex', flexDirection:'column', justifyContent:'center', minHeight:54}}>
            <input placeholder="Nombre del Producto" value={form.title} onChange={e=>setForm(f=>({...f, title: e.target.value}))} />
            {errors.title && <small style={{color:'red'}}>{errors.title}</small>}
          </div>
          <div className="admin-form-col" style={{display:'flex', flexDirection:'column', justifyContent:'center', minHeight:54}}>
            <input placeholder="Precio" value={form.price} onChange={e=>setForm(f=>({...f, price: e.target.value}))} />
            {errors.price && <small style={{color:'red'}}>{errors.price}</small>}
          </div>
          <div className="admin-form-col image-col" style={{display:'flex', flexDirection:'column', justifyContent:'center', minWidth:220, minHeight:54}}>
            <label style={{fontSize:12, marginBottom:6, margin:0}}>Imagen</label>
            <input type="file" accept="image/*" onChange={handleFormFileChange} />
            <div style={{marginTop:6}}></div>
          </div>
          <button className="btn btn-success" type="submit">Agregar</button>
        </form>
      </div>

      <div>
        <h3>Productos ({products.length})</h3>
        <div style={{display:'flex', flexDirection:'column', gap:14}}>
          {products
            .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
            .slice()
            .sort((a,b)=>{
              switch(sortBy){
                case 'newest': return b.id - a.id
                case 'oldest': return a.id - b.id
                case 'price-asc': return a.price - b.price
                case 'price-desc': return b.price - a.price
                case 'title-az': return a.title.localeCompare(b.title)
                case 'title-za': return b.title.localeCompare(a.title)
                default: return 0
              }
            })
            .map(p => (
            <div key={p.id} className="card p-2">
              <div className="admin-row" style={{display:'flex', alignItems:'center', gap:12}}>
                {/* Imagen izquierda */}
                <div style={{flex: '0 0 120px'}}>
                  <img src={p.image} alt={p.title} style={{width:120, height:120, objectFit:'cover', borderRadius:4}} />
                </div>

                {/* Detalles en el centro (centrado entre imagen y opciones) */}
                <div className="details-col" style={{flex:1, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
                  {editingId === p.id ? (
                    <div style={{display:'flex', gap:12, alignItems:'center', flexWrap:'wrap'}}>
                      <div className="admin-form-col" style={{display:'flex', flexDirection:'column', justifyContent:'center', minWidth:180}}>
                        <label style={{fontSize:16}}>Nombre</label>
                        <input value={editValues.title} onChange={e=>setEditValues(v=>({...v, title: e.target.value}))} />
                        {errors.title && <small style={{color:'red'}}>{errors.title}</small>}
                      </div>
                      <div className="admin-form-col" style={{display:'flex', flexDirection:'column', justifyContent:'center', minWidth:120}}>
                        <label style={{fontSize:16}}>Precio</label>
                        <input value={editValues.price} onChange={e=>setEditValues(v=>({...v, price: e.target.value}))} />
                        {errors.price && <small style={{color:'red'}}>{errors.price}</small>}
                      </div>
                      <div className="admin-form-col image-col" style={{display:'flex', flexDirection:'column', justifyContent:'center', minWidth:200}}>
                        <input type="file" accept="image/*" onChange={handleEditFileChange} />
                        <div style={{marginTop:6}}></div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 style={{margin:0}}>{p.title}</h4>
                      <p style={{margin:'6px 0'}}>${p.price}</p>
                    </div>
                  )}
                </div>

                {/* Opciones a la derecha */}
                <div style={{flex: '0 0 180px', display:'flex', justifyContent:'flex-end'}}>
                  {editingId === p.id ? (
                    <div style={{display:'flex', gap:8}}>
                      <button className="btn btn-success" onClick={()=> saveEdit(p.id)}>Guardar</button>
                      <button className="btn btn-secondary" onClick={cancelEdit}>Cancelar</button>
                    </div>
                  ) : (
                      <div style={{display:'flex', gap:8}}>
                      <button className="btn btn-primary" onClick={()=> startEdit(p)}>Editar</button>
                      <button className="btn btn-danger" onClick={()=> requestRemoveProduct(p.id)}>Eliminar</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {confirmState.open && (
        <div style={{position:'fixed', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,0.4)'}}>
          <div style={{width:420, background:'#3e4a56', borderRadius:8, padding:20, boxShadow:'0 6px 20px rgba(0,0,0,0.2)'}}>
            <h4 style={{marginTop:0}}>Confirmar eliminación</h4>
            <p>¿Estás seguro de que deseas eliminar <strong>{confirmState.title}</strong>?</p>
            <div style={{display:'flex', justifyContent:'flex-end', gap:8, marginTop:12}}>
              <button className="btn btn-secondary" onClick={cancelConfirm}>Cancelar</button>
              <button className="btn btn-danger" onClick={confirmRemove}>Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
