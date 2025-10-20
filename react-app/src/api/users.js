import client from './client'

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
  if(client.defaults.baseURL){
    try{ const res = await client.post('/auth/register', { email, password, name }); return res.data }catch(e){}
  }
  // local fallback: store user in localStorage (plain-text password for dev only)
  try{
    const users = readUsers()
    if(users.find(u => u.email === email)) throw new Error('Email exists')
    const user = { id: Date.now(), email, password, name }
    users.push(user)
    writeUsers(users)
    const token = btoa(`${user.id}:${Date.now()}`)
    setAuth({ token, user: { id: user.id, email: user.email, name: user.name } })
    return { token, user: { id: user.id, email: user.email, name: user.name } }
  }catch(e){ throw e }
}

export async function login({ email, password }){
  if(client.defaults.baseURL){
    try{ const res = await client.post('/auth/login', { email, password }); return res.data }catch(e){}
  }
  try{
    const users = readUsers()
    const u = users.find(x => x.email === email && x.password === password)
    if(!u) throw new Error('Invalid credentials')
    const token = btoa(`${u.id}:${Date.now()}`)
    setAuth({ token, user: { id: u.id, email: u.email, name: u.name } })
    return { token, user: { id: u.id, email: u.email, name: u.name } }
  }catch(e){ throw e }
}

export async function logout(){
  if(client.defaults.baseURL){
    try{ await client.post('/auth/logout'); }catch(e){}
  }
  try{ localStorage.removeItem(AUTH_KEY) }catch(e){}
  return true
}

export async function getProfile(){
  if(client.defaults.baseURL){
    try{ const res = await client.get('/auth/me'); return res.data }catch(e){}
  }
  return getAuth()?.user || null
}

export default { register, login, logout, getProfile }
