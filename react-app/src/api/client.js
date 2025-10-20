import axios from 'axios'

const BASE = import.meta.env.VITE_API_BASE || ''

const client = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' }
})

export default client
