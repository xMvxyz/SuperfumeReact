import api from './api'

const STORAGE_KEY = 'superfume_products_v1'

export async function list(){
  // Intentar conectar con el backend
  try{
    const res = await api.get('/perfumes')
    console.log('Respuesta del backend GET /perfumes:', res.data)
    
    // El backend ahora devuelve un array simple
    if(Array.isArray(res.data)){
      console.log('✓ Perfumes cargados desde backend:', res.data.length)
      return res.data
    }
    
    // Por si acaso viene en otra estructura
    if(res.data._embedded && Array.isArray(res.data._embedded.perfumeResponseDtoList)){
      return res.data._embedded.perfumeResponseDtoList
    }
    if(res.data.content && Array.isArray(res.data.content)){
      return res.data.content
    }
    
    return []
  }catch(e){ 
    console.error('Error al cargar perfumes del backend:', e)
    console.error('Detalles del error:', e.response?.data || e.message)
    return []
  }
}

export async function get(id){
  try{ 
    const res = await api.get(`/perfumes/${id}`)
    // Extraer el DTO de la respuesta HATEOAS si es necesario
    if(res.data && res.data.content) return res.data.content
    return res.data
  }catch(e){
    console.warn('Error fetching perfume:', e.message)
  }
  const all = await list()
  return all.find(p => String(p.id) === String(id)) || null
}

export async function create(product){
  try{ 
    const res = await api.post('/perfumes', product)
    return res.data
  }catch(e){ 
    console.error('Error creating perfume:', e.message)
    return null
  }
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    const id = product.id ?? Date.now()
    const p = { ...product, id }
    list.unshift(p)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return p
  }catch(e){ return null }
}

export async function update(id, updates){
  try{ 
    const res = await api.put(`/perfumes/${id}`, updates)
    console.log('✓ Perfume actualizado:', res.data)
    return res.data
  }catch(e){ 
    console.error('Error updating perfume desde API:', e.response?.data || e.message)
    // Fallback: actualizar en localStorage
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      const list = raw ? JSON.parse(raw) : []
      const next = list.map(p => String(p.id) === String(id) ? {...p, ...updates, id} : p)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      console.log('Perfume actualizado en localStorage')
      return next.find(p => String(p.id) === String(id))
    }catch(e2){ 
      console.error('Error updating perfume en localStorage:', e2)
      return null 
    }
  }
}

export async function remove(id){
  try{ 
    const res = await api.delete(`/perfumes/${id}`)
    return res.data
  }catch(e){ 
    console.error('Error deleting perfume:', e.message)
    return null
  }
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    const next = list.filter(p => String(p.id) !== String(id))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return next
  }catch(e){ return null }
}

export default { list, get }
