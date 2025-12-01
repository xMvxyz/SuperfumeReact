import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Carousel from './Carousel'
import * as perfumeService from '../services/perfume'

export default function ProductDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [qty, setQty] = useState(1)

  const CART_KEY = 'superfume_cart_v1'

  function readCart(){
    try{
      const raw = localStorage.getItem(CART_KEY)
      if(!raw) return []
      return JSON.parse(raw)
    }catch(e){ return [] }
  }

  function writeCart(cart){
    try{
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
      window.dispatchEvent(new Event('cart_updated'))
    }catch(e){ console.error('cart write error', e) }
  }

  function addToCart(product, quantity = 1){
    const current = readCart()
    const idx = current.findIndex(i => i.id === product.id)
    const price = product.precio ?? 0
    if(idx >= 0){
      current[idx].qty += quantity
      current[idx].total = current[idx].qty * price
    }else{
      current.push({ 
        id: product.id, 
        nombre: product.nombre || '', 
        precio: price, 
        img: product.imagenUrl || '/img/producto_01.jpg', 
        qty: quantity, 
        total: price * quantity 
      })
    }
    writeCart(current)
    alert('Producto añadido al carrito')
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        setError(null)
        const data = await perfumeService.get(id)
        setProduct(data)
      } catch (err) {
        console.error('Error loading product:', err)
        setError('No se pudo cargar el producto')
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          {error || 'Producto no encontrado'}
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/shop')}>
          Volver a la tienda
        </button>
      </div>
    )
  }

  const images = product.imagenUrl ? [product.imagenUrl] : ['/img/producto_01.jpg']

  return (
    <div>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div style={{position:'relative', marginBottom: '1rem'}}>
                <Carousel images={images} maxHeight={500} />
              </div>
              {product.imagenUrl && (
                <div className="row">
                  <div className="col-12">
                    <img 
                      className="card-img img-fluid" 
                      src={product.imagenUrl} 
                      alt={product.nombre}
                      style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="h2">{product.nombre}</h1>
                  <p className="h3 py-2">${(product.precio || 0).toLocaleString()}</p>
                  
                  <ul className="list-inline">
                    <li className="list-inline-item"><h6>Marca:</h6></li>
                    <li className="list-inline-item"><p className="text-muted"><strong>{product.marca}</strong></p></li>
                  </ul>

                  {product.genero && (
                    <ul className="list-inline">
                      <li className="list-inline-item"><h6>Género:</h6></li>
                      <li className="list-inline-item"><p className="text-muted"><strong>{product.genero}</strong></p></li>
                    </ul>
                  )}

                  <h6>Descripción:</h6>
                  <p>{product.descripcion || 'Sin descripción disponible'}</p>

                  {product.categoria && (
                    <>
                      <h6>Categoría:</h6>
                      <p>{product.categoria}</p>
                    </>
                  )}

                  <h6>Stock disponible: {product.stock}</h6>

                  <form onSubmit={(e) => { e.preventDefault(); addToCart(product, qty); }}>
                    <div className="row">
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li className="list-inline-item">Cantidad</li>
                          <li className="list-inline-item"><button type="button" className="btn btn-success btn-sm" onClick={() => setQty(Math.max(1, qty - 1))}>-</button></li>
                          <li className="list-inline-item"><span className="badge bg-secondary" style={{ fontSize: '16px', padding: '8px 12px' }}>{qty}</span></li>
                          <li className="list-inline-item"><button type="button" className="btn btn-success btn-sm" onClick={() => setQty(qty + 1)}>+</button></li>
                        </ul>
                      </div>
                    </div>

                    <div className="row pb-3">
                      <div className="col d-grid">
                        <button type="submit" className="btn btn-success btn-lg" name="submit" value="addtocard">
                          Agregar al carrito
                        </button>
                      </div>
                      <div className="col d-grid">
                        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={() => navigate('/shop')}>
                          Continuar comprando
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
