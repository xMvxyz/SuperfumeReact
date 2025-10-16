import React from 'react'
import { Link } from 'react-router-dom'

export default function ShopSingle(){
  return (
    <div>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">
              <div className="card mb-3">
                <img className="card-img img-fluid" src="/img/producto_01.jpg" alt="Imagen Producto" id="product-detail" />
              </div>

              <div className="row">
                <div className="col-1 align-self-center">
                  <a href="#multi-item-example" role="button" data-bs-slide="prev"><i className="text-dark fas fa-chevron-left" /> <span className="sr-only">Anterior</span></a>
                </div>

                <div id="multi-item-example" className="col-10 carousel slide carousel-multi-item" data-bs-ride="carousel">
                  <div className="carousel-inner product-links-wap" role="listbox">
                    <div className="carousel-item active">
                      <div className="row">
                        <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/producto_01.jpg" alt="thumb1" /></a></div>
                        <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/producto_02.jpg" alt="thumb2" /></a></div>
                        <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/producto_03.jpg" alt="thumb3" /></a></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-1 align-self-center">
                  <a href="#multi-item-example" role="button" data-bs-slide="next"><i className="text-dark fas fa-chevron-right" /> <span className="sr-only">Siguiente</span></a>
                </div>
              </div>
            </div>

            <div className="col-lg-7 mt-5">
              <div className="card">
                <div className="card-body">
                  <h1 className="h2">Azzaro Most Wanted Intense EDP 100 ml</h1>
                  <p className="h3 py-2">$134.990</p>
                  <p className="py-2">
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-warning" />
                    <i className="fa fa-star text-secondary" />
                    <span className="list-inline-item text-dark">Puntaje 4.2 | 36 Reseñas</span>
                  </p>

                  <ul className="list-inline">
                    <li className="list-inline-item"><h6>Marca:</h6></li>
                    <li className="list-inline-item"><p className="text-muted"><strong>Azzaro</strong></p></li>
                  </ul>

                  <h6>Descripcion:</h6>
                  <p>Marca: Azzaro Género: Hombre Tipo: EDP Tamaño: 100 ML Aroma: Amaderada Especiada Notas de salida: Jengibre. Nota de Corazón: Notas amaderadas. Nota de Fondo: Vainilla Bourbon.</p>

                  <h6>Especificaciones:</h6>
                  <ul className="list-unstyled pb-3">
                    <li>Marca: Azzaro</li>
                    <li>Tipo de Producto: Perfume</li>
                  </ul>

                  <form>
                    <input type="hidden" name="product-title" value="Activewear" />
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

          <div id="carousel-related-product">
            <div className="p-2 pb-3">
              <div className="product-wap card rounded-0">
                <div className="card rounded-0">
                  <img className="card-img rounded-0 img-fluid" src="/img/tienda_05.jpg" alt="rel1" />
                  <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul className="list-unstyled">
                      <li><Link className="btn btn-success text-white" to="/product/5"><i className="far fa-heart" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/5"><i className="far fa-eye" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/5"><i className="fas fa-cart-plus" /></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <Link to="/product/5" className="h3 text-decoration-none">Hugo Boss Bottled Infinite</Link>
                  <p className="text-center mb-0">$81.990</p>
                </div>
              </div>
            </div>

            {/* Más productos relacionados... */}

          </div>
        </div>
      </section>
    </div>
  )
}
