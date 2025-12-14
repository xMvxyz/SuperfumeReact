import axios from 'axios'

// Usar variable de entorno si está disponible, de lo contrario usar URL del backend remoto (EC2)
// El backend tiene context path '/api', así que la URL base debe incluirlo
const BASE = import.meta.env.VITE_API_BASE_URL || 'http://44.218.26.62:8080/api'

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor para agregar JWT token en cada request
api.interceptors.request.use(
  (config) => {
    try {
      const authData = localStorage.getItem('superfume_auth_v1')
      if (authData) {
        const { token } = JSON.parse(authData)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
          console.log('Token agregado a la petición:', config.url, 'Token:', token.substring(0, 20) + '...')
        } else {
          console.warn('No hay token en authData para:', config.url)
        }
      } else {
        console.warn('No hay authData en localStorage para:', config.url)
      }
    } catch (e) {
      console.error('Error reading auth token:', e)
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Error 401 - No autorizado:', error.config?.url)
      console.error('Respuesta del servidor:', error.response?.data)
      // Token inválido o expirado - limpiar auth y redirigir
      localStorage.removeItem('superfume_auth_v1')
      if (window.location.pathname !== '/login') {
        console.log('Redirigiendo a /login desde:', window.location.pathname)
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
