import api from './api'

const CART_KEY = 'superfume_cart_v1'

function readLocal(){
  try{ const raw = localStorage.getItem(CART_KEY); if(!raw) return []; return JSON.parse(raw) }catch(e){ return [] }
}

function writeLocal(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); window.dispatchEvent(new Event('cart_updated')) }catch(e){ console.error(e) }
}

export async function getCart(){
  if(api.defaults.baseURL){
    try{ const res = await api.get('/carrito'); return res.data }catch(e){ /* fallback */ }
  }
  return readLocal()
}

export async function addItem(item){
  if(api.defaults.baseURL){
    try{ const res = await api.post('/carrito/items', item); return res.data }catch(e){ }
  }
  const cart = readLocal()
  const idx = cart.findIndex(i => i.id === item.id)
  if(idx >= 0){ cart[idx].qty += item.qty; cart[idx].total = cart[idx].qty * (cart[idx].precio || item.precio) }
  else cart.push(item)
  writeLocal(cart)
  return cart
}

export async function updateItem(id, updates){
  if(api.defaults.baseURL){
    try{ const res = await api.put(`/carrito/items/${id}`, updates); return res.data }catch(e){}
  }
  const cart = readLocal()
  const next = cart.map(i => i.id === id ? {...i, ...updates, total: ((updates.qty ?? i.qty) * (updates.precio ?? i.precio)) } : i)
  writeLocal(next)
  return next
}

export async function removeItem(id){
  if(api.defaults.baseURL){
    try{ const res = await api.delete(`/carrito/items/${id}`); return res.data }catch(e){}
  }
  const cart = readLocal().filter(i => i.id !== id)
  writeLocal(cart)
  return cart
}

export async function clearCart(){
  if(api.defaults.baseURL){
    try{ await api.post('/carrito/clear'); }catch(e){}
  }
  writeLocal([])
  return []
}

export default { getCart, addItem, updateItem, removeItem, clearCart }
