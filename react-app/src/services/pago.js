import api from './api'

const PAYMENTS_KEY = 'superfume_payments_v1'

function readLocal() {
  try {
    const raw = localStorage.getItem(PAYMENTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}

function writeLocal(payments) {
  try {
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments))
  } catch (e) {
    console.error('Error saving payments:', e)
  }
}

/**
 * Procesar un pago
 * @param {Object} paymentData - { pedidoId: number, monto: number, metodo: string, detallePago: object }
 */
export async function processPayment(paymentData) {
  if (api.defaults.baseURL) {
    try {
      const res = await api.post('/pagos', paymentData)
      return res.data
    } catch (e) {
      console.error('Error processing payment:', e)
      throw e
    }
  }
  
  // Fallback local - simular pago exitoso
  try {
    const payments = readLocal()
    const newPayment = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      estado: 'COMPLETADO',
      ...paymentData
    }
    payments.push(newPayment)
    writeLocal(payments)
    return newPayment
  } catch (e) {
    throw e
  }
}

/**
 * Obtener detalles de un pago
 */
export async function get(id) {
  if (api.defaults.baseURL) {
    try {
      const res = await api.get(`/pagos/${id}`)
      return res.data
    } catch (e) {
      console.error('Error fetching payment:', e)
    }
  }
  const payments = readLocal()
  return payments.find(p => String(p.id) === String(id)) || null
}

/**
 * Obtener pagos de un pedido
 */
export async function getByOrder(orderId) {
  if (api.defaults.baseURL) {
    try {
      const res = await api.get(`/pagos/pedido/${orderId}`)
      return res.data
    } catch (e) {
      console.error('Error fetching payments:', e)
    }
  }
  const payments = readLocal()
  return payments.filter(p => String(p.pedidoId) === String(orderId))
}

/**
 * Lista todos los pagos del usuario
 */
export async function list() {
  if (api.defaults.baseURL) {
    try {
      const res = await api.get('/pagos')
      return res.data
    } catch (e) {
      console.error('Error fetching payments:', e)
    }
  }
  return readLocal()
}

/**
 * Métodos de pago disponibles
 */
export const PAYMENT_METHODS = {
  TARJETA: 'Tarjeta de Crédito/Débito',
  PAYPAL: 'PayPal',
  TRANSFERENCIA: 'Transferencia Bancaria',
  EFECTIVO: 'Efectivo'
}

export default {
  processPayment,
  get,
  getByOrder,
  list,
  PAYMENT_METHODS
}
