import React, { useEffect, useState } from 'react'

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

export default function Cart(){
  const [items, setItems] = useState(readCart())

  useEffect(()=>{
    const onStorage = (e)=>{
      if(e.key === CART_KEY){
        setItems(readCart())
      }
    }
    const onCustom = ()=> setItems(readCart())
    window.addEventListener('storage', onStorage)
    window.addEventListener('cart_updated', onCustom)
    return ()=>{
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('cart_updated', onCustom)
    }
  },[])

  function changeQty(id, delta){
    const next = items.map(i => {
      if (i.id === id) {
        const newQty = i.qty + delta
        const maxStock = i.stock || 999
        const finalQty = Math.max(1, Math.min(newQty, maxStock))
        return {...i, qty: finalQty, total: finalQty * i.precio }
      }
      return i
    })
    setItems(next)
    writeCart(next)
  }

  function setQtyDirect(id, value){
    let qty = parseInt(value,10)
    if(isNaN(qty) || qty < 1) qty = 1
    const next = items.map(i => {
      if (i.id === id) {
        const maxStock = i.stock || 999
        const finalQty = Math.min(qty, maxStock)
        return {...i, qty: finalQty, total: finalQty * i.precio }
      }
      return i
    })
    setItems(next)
    writeCart(next)
  }

  function removeItem(id){
    const next = items.filter(i => i.id !== id)
    setItems(next)
    writeCart(next)
  }

  const subtotal = items.reduce((s,i)=> s + (i.precio * i.qty), 0)

  return (
    <div className="cart-container container py-5">
      <h2 className="cart-title">Carrito de Compras</h2>

      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-4">
              <img src={item.img} alt={item.nombre} style={{width:120, marginRight:16}} />
              <div className="item-info flex-grow-1">
                <p className="item-name">{item.nombre}</p>
                <div className="text-muted small">Precio unitario: ${item.precio.toLocaleString()}</div>
                {item.stock && (
                  <div className="text-muted small mt-1">Stock disponible: {item.stock}</div>
                )}
              </div>
              <div className="item-controls text-end">
                <div className="quantity d-inline-flex align-items-center">
                  <button className="btn btn-sm btn-secondary" onClick={()=> changeQty(item.id, -1)}>-</button>
                  <input type="number" value={item.qty} min={1} max={item.stock || 999} onChange={e=> setQtyDirect(item.id, e.target.value)} style={{width:60, textAlign:'center', margin:'0 8px'}} />
                  <button className="btn btn-sm btn-secondary" onClick={()=> changeQty(item.id, +1)} disabled={item.qty >= (item.stock || 999)}>+</button>
                </div>
                <p className="item-total mt-2">${(item.precio * item.qty).toLocaleString()}</p>
                <div className="mt-2">
                  <button className="btn btn-link text-danger" onClick={()=> removeItem(item.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}

          <div className="subtotal d-flex justify-content-between fw-bold mt-4">
            <span>Subtotal:</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>

          <div className="cart-actions mt-4">
            <button className="btn btn-success">Pagar</button>
          </div>
        </>
      )}
    </div>
  )
}
