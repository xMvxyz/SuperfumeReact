import React from 'react'
import Carousel from '../components/Carousel'
import { Link } from 'react-router-dom'

export default function ShopSingle(){
  return (
    <div>
      <section className="bg-light">
        <div className="container pb-5">
          <div className="row">
            <div className="col-lg-5 mt-5">


              <div style={{position:'relative', marginBottom: '1rem'}}>
                <Carousel images={["/img/producto_01.jpg","/img/producto_02.jpg","/img/producto_03.jpg"]} maxHeight={500} />
              </div>
                  <div className="row">
                        <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/producto_01.jpg" alt="thumb1" /></a></div>
                        <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/producto_02.jpg" alt="thumb2" /></a></div>
                        <div className="col-4"><a href="#"><img className="card-img img-fluid" src="/img/producto_03.jpg" alt="thumb3" /></a></div>
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
              <section className="py-5">
                <div className="container row">
                  <div className="col-12 col-md-3 mb-4">
                    <div className="product-wap card rounded-0">
                      <div className="card rounded-0">
                        <img className="card-img rounded-0 img-fluid" src="/img/tienda_05.jpg" />
                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                          <ul className="list-unstyled">
                            <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus" /></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="card-body">
                        <a href="shop-single.html" className="h3 text-decoration-none">Hugo Boss Bottled Infinite</a>
                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                          <li>Bottled Infinite Edp 100ml</li>
                          <li className="pt-2">
                            <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                          </li>
                        </ul>
                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                          <li>
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-muted fa fa-star" />
                            <i className="text-muted fa fa-star" />
                          </li>
                        </ul>
                        <p className="text-center mb-0">$81.990</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mb-4">
                    <div className="product-wap card rounded-0">
                      <div className="card rounded-0">
                        <img className="card-img rounded-0 img-fluid" src="/img/tienda_06.jpg" />
                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                          <ul className="list-unstyled">
                            <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus" /></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="card-body">
                        <a href="shop-single.html" className="h3 text-decoration-none">Stronger With You Intensely</a>
                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                          <li>Stronger With You  EDP 100ML</li>
                          <li className="pt-2">
                            <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                          </li>
                        </ul>
                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                          <li>
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                          </li>
                        </ul>
                        <p className="text-center mb-0">$150.990</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mb-4">
                    <div className="product-wap card rounded-0">
                      <div className="card rounded-0">
                        <img className="card-img rounded-0 img-fluid" src="/img/tienda_09.jpg" />
                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                          <ul className="list-unstyled">
                            <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus" /></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="card-body">
                        <a href="shop-single.html" className="h3 text-decoration-none">Le Beau Jean Paul Gaultier</a>
                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                          <li>Le Beau Jean Paul Gaultier 125ML EDP Intense</li>
                          <li className="pt-2">
                            <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                          </li>
                        </ul>
                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                          <li>
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                          </li>
                        </ul>
                        <p className="text-center mb-0">$199.990</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 mb-4">
                    <div className="product-wap card rounded-0">
                      <div className="card rounded-0">
                        <img className="card-img rounded-0 img-fluid" src="/img/tienda_07.jpg" />
                        <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                          <ul className="list-unstyled">
                            <li><a className="btn btn-success text-white" href="shop-single.html"><i className="far fa-heart" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="far fa-eye" /></a></li>
                            <li><a className="btn btn-success text-white mt-2" href="shop-single.html"><i className="fas fa-cart-plus" /></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="card-body">
                        <a href="shop-single.html" className="h3 text-decoration-none">Burberry Hero</a>
                        <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                          <li>Burberry Hero Parfum Intense 100ml</li>
                          <li className="pt-2">
                            <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                            <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                          </li>
                        </ul>
                        <ul className="list-unstyled d-flex justify-content-center mb-1">
                          <li>
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-warning fa fa-star" />
                            <i className="text-muted fa fa-star" />
                          </li>
                        </ul>
                        <p className="text-center mb-0">$189.990</p>
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
