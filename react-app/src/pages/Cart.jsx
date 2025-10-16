import React from 'react'

export default function Cart(){
  return (
    <div className="cart-container container py-5">
      <h2 className="cart-title">Carrito de Compras</h2>

      <div className="cart-item d-flex align-items-center mb-4">
        <img src="/img/tienda_01.jpg" alt="Producto 1" style={{width:120, marginRight:16}} />
        <div className="item-info flex-grow-1">
          <p className="item-name">Dior Poison EDT 100ML</p>
        </div>
        <div className="item-controls text-end">
          <div className="quantity d-inline-flex align-items-center">
            <button className="btn btn-sm btn-secondary">-</button>
            <span className="px-3">1</span>
            <button className="btn btn-sm btn-secondary">+</button>
          </div>
          <p className="item-total mt-2">$124.990</p>
        </div>
      </div>

      <div className="cart-item d-flex align-items-center mb-4">
        <img src="/img/tienda_02.jpg" alt="Producto 2" style={{width:120, marginRight:16}} />
        <div className="item-info flex-grow-1">
          <p className="item-name">Sweet Dream EDT 80ML</p>
        </div>
        <div className="item-controls text-end">
          <div className="quantity d-inline-flex align-items-center">
            <button className="btn btn-sm btn-secondary">-</button>
            <span className="px-3">2</span>
            <button className="btn btn-sm btn-secondary">+</button>
          </div>
          <p className="item-total mt-2">$15.000</p>
        </div>
      </div>

      <div className="cart-item d-flex align-items-center mb-4">
        <img src="/img/tienda_03.jpg" alt="Producto 3" style={{width:120, marginRight:16}} />
        <div className="item-info flex-grow-1">
          <p className="item-name">Shakira Dance Edt 50Ml Vap</p>
        </div>
        <div className="item-controls text-end">
          <div className="quantity d-inline-flex align-items-center">
            <button className="btn btn-sm btn-secondary">-</button>
            <span className="px-3">1</span>
            <button className="btn btn-sm btn-secondary">+</button>
          </div>
          <p className="item-total mt-2">$20.000</p>
        </div>
      </div>

      <div className="subtotal d-flex justify-content-between fw-bold mt-4">
        <span>Subtotal:</span>
        <span>$159.990</span>
      </div>

      <div className="cart-actions mt-4">
        <button className="btn btn-success">Pagar</button>
      </div>
    </div>
  )
}
