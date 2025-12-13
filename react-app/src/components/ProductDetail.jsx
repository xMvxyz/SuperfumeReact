import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    // Verificar stock disponible
    const availableStock = product.stock ?? 0
    if (availableStock <= 0) {
      alert('Producto sin stock disponible')
      return
    }
    
    const current = readCart()
    const idx = current.findIndex(i => i.id === product.id)
    const price = product.precio ?? 0
    
    // Verificar si la cantidad total excede el stock
    if(idx >= 0){
      const newQty = current[idx].qty + quantity
      if (newQty > availableStock) {
        alert(`Solo hay ${availableStock} unidades disponibles en stock`)
        return
      }
      current[idx].qty = newQty
      current[idx].total = current[idx].qty * price
    }else{
      if (quantity > availableStock) {
        alert(`Solo hay ${availableStock} unidades disponibles en stock`)
        return
      }
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

  return (
    <div style={{backgroundColor: '#fff', minHeight: '100vh'}}>
      <section style={{backgroundColor: '#fff', paddingTop: '40px'}}>
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card h-100" style={{border: 'none', overflow: 'hidden', borderRadius: '5px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <img 
                  className="card-img-top img-fluid w-100" 
                  src={product.imagenUrl || '/img/producto_01.jpg'} 
                  alt={product.nombre}
                  style={{ objectFit: 'cover', height: '100%', borderRadius: '5px' }}
                />
              </div>
            </div>

            <div className="col-lg-7 mt-5">
              <div className="card" style={{borderRadius: '5px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: 'none'}}>
                <div className="card-body">
                  <h1 className="h2">{product.nombre}</h1>
                  <p className="h3 py-2">${(product.precio || 0).toLocaleString()}</p>
                  
                  <ul className="list-inline">
                    <li className="list-inline-item"><h6>Marca:</h6></li>
                    <li className="list-inline-item"><p className="text-muted">{product.marca}</p></li>
                  </ul>

                  {product.genero && (
                    <ul className="list-inline">
                      <li className="list-inline-item"><h6>Género:</h6></li>
                      <li className="list-inline-item"><p className="text-muted">{product.genero}</p></li>
                    </ul>
                  )}

                  {product.fragancia && (
                    <ul className="list-inline">
                      <li className="list-inline-item"><h6>Fragancia:</h6></li>
                      <li className="list-inline-item"><p className="text-muted">{product.fragancia}</p></li>
                    </ul>
                  )}

                  <h6>Descripción:</h6>
                  <p>{product.descripcion || 'Sin descripción disponible'}</p>

                  {product.notas && (
                    <>
                      <h6>Notas:</h6>
                      <p>{product.notas}</p>
                    </>
                  )}

                  {product.perfil && (
                    <>
                      <h6>Perfil:</h6>
                      <p>{product.perfil}</p>
                    </>
                  )}

                  <div className="mb-3">
                    <h6>Stock disponible: 
                      <span className={`ms-2 badge ${product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'}`}>
                        {product.stock ?? 0} unidades
                      </span>
                    </h6>
                  </div>

                  <form onSubmit={(e) => { e.preventDefault(); addToCart(product, qty); }}>
                    <div className="row">
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li className="list-inline-item">Cantidad</li>
                          <li className="list-inline-item">
                            <button 
                              type="button" 
                              className="btn btn-success btn-sm" 
                              onClick={() => setQty(Math.max(1, qty - 1))}
                              disabled={qty <= 1}
                            >
                              -
                            </button>
                          </li>
                          <li className="list-inline-item"><span className="badge bg-secondary" style={{ fontSize: '16px', padding: '8px 12px' }}>{qty}</span></li>
                          <li className="list-inline-item">
                            <button 
                              type="button" 
                              className="btn btn-success btn-sm" 
                              onClick={() => setQty(qty + 1)}
                              disabled={qty >= (product.stock ?? 0)}
                            >
                              +
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <style>{`
                      .product-detail-btn {
                        background-color: #fff;
                        color: #000;
                        border: 2px solid #000;
                        border-radius: 5px;
                        padding: 12px 24px;
                        font-weight: 500;
                        transition: all 0.3s ease;
                      }
                      .product-detail-btn:hover:not(:disabled) {
                        background-color: #000;
                        color: #fff;
                        border-color: #000;
                      }
                      .product-detail-btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                      }
                    `}</style>
                    <div className="row pb-3">
                      <div className="col d-grid">
                        <button 
                          type="submit" 
                          className="btn btn-lg product-detail-btn" 
                          name="submit" 
                          value="addtocard"
                          disabled={!product.stock || product.stock <= 0}
                        >
                          {product.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
                        </button>
                      </div>
                      <div className="col d-grid">
                        <button type="button" className="btn btn-lg product-detail-btn" onClick={() => navigate('/shop')}>
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
