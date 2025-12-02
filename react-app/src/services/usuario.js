import api from './api'

const USERS_KEY = 'superfume_users_v1'
const AUTH_KEY = 'superfume_auth_v1'

function readUsers(){
  try{ const raw = localStorage.getItem(USERS_KEY); return raw ? JSON.parse(raw) : [] }catch(e){ return [] }
}

function writeUsers(list){
  try{ localStorage.setItem(USERS_KEY, JSON.stringify(list)) }catch(e){ }
}

function setAuth(data){
  try{ localStorage.setItem(AUTH_KEY, JSON.stringify(data)) }catch(e){}
}

function getAuth(){
  try{ const raw = localStorage.getItem(AUTH_KEY); return raw ? JSON.parse(raw) : null }catch(e){ return null }
}

export async function register({ email, password, name }){
  try{ 
    const res = await api.post('/auth/register', { email, password, name })
    console.log('✓ Usuario registrado en backend:', res.data)
    setAuth(res.data)
    return res.data
  }catch(e){ 
    console.error('Error registrando usuario:', e.message)
    throw e
  }
}

export async function login({ email, password }){
  try{ 
    const res = await api.post('/auth/login', { email, password })
    console.log('✓ Usuario autenticado:', res.data)
    setAuth(res.data)
    return res.data
  }catch(e){ 
    console.error('Error en login:', e.message)
    throw e
  }
}

export async function logout(){
  if(api.defaults.baseURL){
    try{ await api.post('/auth/logout'); }catch(e){}
  }
  try{ localStorage.removeItem(AUTH_KEY) }catch(e){}
  return true
}

export async function getProfile(){
  if(api.defaults.baseURL){
    try{ const res = await api.get('/auth/me'); return res.data }catch(e){}
  }
  return getAuth()?.user || null
}

export async function list(){
  try{ 
    const res = await api.get('/usuario')
    // Extraer del formato HATEOAS si viene
    if(res.data && res.data._embedded && res.data._embedded.usuarioResponseDtoList){
      return res.data._embedded.usuarioResponseDtoList
    }
    if(Array.isArray(res.data)){
      return res.data
    }
    return res.data?.content || []
  }catch(e){
    console.warn('Error fetching usuarios:', e.message)
    return []
  }
}

export async function create(user){
  try{ 
    const res = await api.post('/usuario', user)
    return res.data
  }catch(e){ 
    console.error('Error creating usuario:', e.message)
    throw e
  }
}

export async function update(id, updates){
  try{ 
    const res = await api.put(`/usuario/${id}`, updates)
    return res.data
  }catch(e){ 
    console.error('Error updating usuario:', e.message)
    throw e
  }
}

export async function remove(id){
  try{ 
    const res = await api.delete(`/usuario/${id}`)
    return res.data
  }catch(e){ 
    console.error('Error deleting usuario:', e.message)
    throw e
  }
}

export default { register, login, logout, getProfile }
