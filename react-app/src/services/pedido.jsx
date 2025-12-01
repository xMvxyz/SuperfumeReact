import client from './client.js'

const ORDERS_KEY = 'superfume_orders_v1'

function readLocal() {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function writeLocal(orders) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  } catch (e) {
    console.error('Error saving orders:', e)
  }
}

/**
 * Obtener todos los pedidos del usuario
 */
export async function list() {
  if (client.defaults.baseURL) {
    try {
      const res = await client.get('/pedidos')
      return res.data
    } catch (e) {
      console.error('Error fetching orders:', e)
    }
  }
  return readLocal()
}

/**
 * Obtener un pedido por ID
 */
export async function get(id) {
  if (client.defaults.baseURL) {
    try {
      const res = await client.get(`/pedidos/${id}`)
      return res.data
    } catch (e) {
      console.error('Error fetching order:', e)
    }
  }
  const orders = readLocal()
  return orders.find(o => String(o.id) === String(id)) || null
}

/**
 * Crear un nuevo pedido
 * @param {Object} orderData - { items: [...], total: number, direccion: string, metodoPago: string }
 */
export async function create(orderData) {
  if (client.defaults.baseURL) {
    try {
      const res = await client.post('/pedidos', orderData)
      return res.data
    } catch (e) {
      console.error('Error creating order:', e)
      throw e
    }
  }
  
  // Fallback local
  try {
    const orders = readLocal()
    const newOrder = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      estado: 'PENDIENTE',
      ...orderData
    }
    orders.push(newOrder)
    writeLocal(orders)
    return newOrder
  } catch (e) {
    throw e
  }
}

/**
 * Actualizar el estado de un pedido
 * @param {number} id - ID del pedido
 * @param {Object} updates - { estado: 'CONFIRMADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO' }
 */
export async function updateStatus(id, updates) {
  if (client.defaults.baseURL) {
    try {
      const res = await client.put(`/pedidos/${id}`, updates)
      return res.data
    } catch (e) {
      console.error('Error updating order:', e)
      throw e
    }
  }
  
  // Fallback local
  const orders = readLocal()
  const updated = orders.map(o => 
    String(o.id) === String(id) ? { ...o, ...updates } : o
  )
  writeLocal(updated)
  return updated.find(o => String(o.id) === String(id))
}

/**
 * Cancelar un pedido
 */
export async function cancel(id) {
  return updateStatus(id, { estado: 'CANCELADO' })
}

/**
 * Obtener pedidos por estado
 */
export async function listByStatus(status) {
  const allOrders = await list()
  return allOrders.filter(o => o.estado === status)
}

export default {
  list,
  get,
  create,
  updateStatus,
  cancel,
  listByStatus
}
