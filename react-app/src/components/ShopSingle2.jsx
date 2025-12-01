import React from 'react'
import Carousel from '../components/Carousel'
import { Link } from 'react-router-dom'

export default function ShopSingle2(){
  return (
    <div>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div style={{position:'relative', marginBottom: '1rem'}}>
                <Carousel images={["/img/tienda_02.jpg","/img/tienda_06.jpg","/img/tienda_07.jpg"]} maxHeight={500} />
              </div>
              <div className="row">
                <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/tienda_05.jpg" alt="thumb1" /></a></div>
                <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/tienda_06.jpg" alt="thumb2" /></a></div>
                <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/tienda_07.jpg" alt="thumb3" /></a></div>
              </div>
            </div>

            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="h2">Sweet Dream EDT 80ML</h1>
                  <p className="h3 py-2">$81.990</p>
                  <p className="py-2">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-secondary" />
                    <span className="list-inline-item text-dark">Puntaje 4.5 | 24 Reseñas</span>
                  </p>

                  <ul className="list-inline">
                    <li className="list-inline-item"><h6>Marca:</h6></li>
                    <li className="list-inline-item"><p className="text-muted"><strong>Hugo Boss</strong></p></li>
                  </ul>

                  <h6>Descripcion:</h6>
                  <p>Hugo Boss Bottled Infinite es una fragancia fresca y duradera para hombres. Notas cítricas en la salida y un fondo amaderado cálido.</p>

                  <h6>Especificaciones:</h6>
                  <ul className="list-unstyled pb-3">
                    <li>Marca: Hugo Boss</li>
                    <li>Tipo de Producto: Perfume - EDP</li>
                    <li>Tamaño: 100ml</li>
                  </ul>

                  <form>
                    <input type="hidden" name="product-title" value="Hugo Boss Bottled Infinite" />
                    <div className="row">
                      <div className="col-auto">
                        <ul className="list-inline pb-3">
                          <li className="list-inline-item text-right">Cantidad <input type="hidden" name="product-quanity" id="product-quanity" value="1" /></li>
                          <li className="list-inline-item"><span className="btn btn-success" id="btn-minus">-</span></li>
                          <li className="list-inline-item"><span className="badge bg-secondary" id="var-value">1</span></li>
                          <li className="list-inline-item"><span className="btn btn-success" id="btn-plus">+</span></li>
                        </ul>
                      </div>
                    </div>

                    <div className="row pb-3">
                      <div className="col d-grid"><button type="submit" className="btn btn-success btn-lg" name="submit" value="buy">Comprar</button></div>
                      <div className="col d-grid"><button type="submit" className="btn btn-success btn-lg" name="submit" value="addtocard">Agregar al carrito</button></div>
                    </div>
                  </form>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row text-left p-2 pb-3"><h4>Productos Relacionados</h4></div>
          <section className="py-5">
            <div className="container row">
              <div className="col-12 col-md-3 mb-4">
                <div className="product-wap card rounded-0">
                  <div className="card rounded-0">
                    <img className="card-img rounded-0 img-fluid" src="/img/tienda_06.jpg" />
                    <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                      <ul className="list-unstyled">
                        <li><Link className="btn btn-success text-white" to="/shop-single"><i className="far fa-heart" /></Link></li>
                        <li><Link className="btn btn-success text-white mt-2" to="/shop-single"><i className="far fa-eye" /></Link></li>
                        <li><Link className="btn btn-success text-white mt-2" to="/shop-single"><i className="fas fa-cart-plus" /></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <Link to="/shop-single" className="h3 text-decoration-none">Stronger With You Intensely</Link>
                    <p className="text-center mb-0">$150.990</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
