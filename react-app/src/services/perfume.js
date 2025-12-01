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
  // if axios base url configured, try backend
  if(api.defaults.baseURL){
    try{
      const res = await api.get('/perfumes')
      return res.data
    }catch(e){ /* fallback to local */ }
  }

  // fallback: localStorage or public samples
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
  if(api.defaults.baseURL){
    try{ const res = await api.get(`/perfumes/${id}`); return res.data }catch(e){}
  }
  const all = await list()
  return all.find(p => String(p.id) === String(id)) || null
}

export async function create(product){
  if(api.defaults.baseURL){
    try{ const res = await api.post('/perfumes', product); return res.data }catch(e){ }
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
  if(api.defaults.baseURL){
    try{ const res = await api.put(`/perfumes/${id}`, updates); return res.data }catch(e){ }
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
  if(api.defaults.baseURL){
    try{ const res = await api.delete(`/perfumes/${id}`); return res.data }catch(e){ }
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
