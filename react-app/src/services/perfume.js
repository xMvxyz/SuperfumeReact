import api from './api'

const STORAGE_KEY = 'superfume_products_v1'

async function fetchPublicSamples(){
  try{
    const res = await fetch('/sample-products.json')
    if(!res.ok) return []
    const data = await res.json()
    return data
  }catch(e){ return [] }
}

export async function list(){
  // Intentar conectar con el backend
  try{
    const res = await api.get('/Perfume')
    // Extraer el array de perfumes si viene en formato HATEOAS
    if(res.data._embedded && res.data._embedded.perfumeResponseDtoList){
      return res.data._embedded.perfumeResponseDtoList
    }
    // Si viene como array directo
    if(Array.isArray(res.data)){
      return res.data
    }
    // Si viene como objeto con contenido
    return res.data.content || []
  }catch(e){ 
    console.warn('Backend no disponible, usando datos locales:', e.message)
  }

  // Fallback: localStorage o samples públicos
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    if(raw){
      return JSON.parse(raw)
    }
  }catch(e){}

  const samples = await fetchPublicSamples()
  return samples
}

export async function get(id){
  try{ 
    const res = await api.get(`/Perfume/${id}`)
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
    const res = await api.post('/Perfume', product)
    return res.data
  }catch(e){ 
    console.error('Error creating perfume:', e.message)
    return null
  }
  // fallback: write to localStorage
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
    const res = await api.put(`/Perfume/${id}`, updates)
    return res.data
  }catch(e){ 
    console.error('Error updating perfume:', e.message)
    return null
  }
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    const next = list.map(p => String(p.id) === String(id) ? {...p, ...updates} : p)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return next.find(p => String(p.id) === String(id))
  }catch(e){ return null }
}

export async function remove(id){
  try{ 
    const res = await api.delete(`/Perfume/${id}`)
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
