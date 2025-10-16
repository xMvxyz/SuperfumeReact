import React from 'react'
import { Link } from 'react-router-dom'

export default function Shop(){
  return (
    <div className="container py-5">
      <div className="row">

        <aside className="col-lg-3">
          <h1 className="h2 pb-4">Categorías</h1>
          <ul className="list-unstyled templatemo-accordion">
            <li className="pb-3">
              <div className="d-flex justify-content-between h3">
                <span>Genero</span>
                <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
              </div>
              <ul className="list-unstyled pl-3">
                <li><a className="text-decoration-none" href="#">Hombre</a></li>
                <li><a className="text-decoration-none" href="#">Mujer</a></li>
              </ul>
            </li>

            <li className="pb-3">
              <div className="d-flex justify-content-between h3">
                <span>Marca</span>
                <i className="fa fa-fw fa-chevron-circle-down mt-1"></i>
              </div>
              <ul className="list-unstyled pl-3">
                <li><a className="text-decoration-none" href="#">Jean Paul Gaultier</a></li>
                <li><a className="text-decoration-none" href="#">Dior</a></li>
                <li><a className="text-decoration-none" href="#">Chanel</a></li>
                <li><a className="text-decoration-none" href="#">Adolfo Dominguez</a></li>
                <li><a className="text-decoration-none" href="#">Burberry</a></li>
              </ul>
            </li>
          </ul>
        </aside>

        <section className="col-lg-9">
          <div className="row mb-4">
            <div className="col-md-6">
              <ul className="list-inline shop-top-menu pb-3 pt-1">
                <li className="list-inline-item"><a className="h3 text-decoration-none mr-3" href="#">Todos</a></li>
                <li className="list-inline-item"><a className="h3 text-decoration-none mr-3" href="#">Hombres</a></li>
                <li className="list-inline-item"><a className="h3 text-decoration-none" href="#">Mujeres</a></li>
              </ul>
            </div>
            <div className="col-md-6 pb-4">
              <div className="d-flex">
                <select className="form-control">
                  <option>Destacados</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            {/** Repite las cards de productos. En una migración posterior podemos mapear un array de productos */}
            <div className="col-md-4">
              <div className="card mb-4 product-wap rounded-0">
                <div className="card rounded-0">
                  <img className="card-img rounded-0 img-fluid" src="/img/tienda_01.jpg" alt="tienda-1" />
                  <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul className="list-unstyled">
                      <li><Link className="btn btn-success text-white" to="/product/1"><i className="far fa-heart" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/1"><i className="far fa-eye" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/1"><i className="fas fa-cart-plus" /></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <Link to="/product/1" className="h3 text-decoration-none">Dior Poison</Link>
                  <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>Dior Poison EDT 100ML</li>
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
                  <p className="text-center mb-0">$124.990</p>
                </div>
              </div>
            </div>

            {/** Otras tarjetas - se pueden replicar o mapear */}
            <div className="col-md-4">
              <div className="card mb-4 product-wap rounded-0">
                <div className="card rounded-0">
                  <img className="card-img rounded-0 img-fluid" src="/img/tienda_02.jpg" alt="tienda-2" />
                  <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul className="list-unstyled">
                      <li><Link className="btn btn-success text-white" to="/product/2"><i className="far fa-heart" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/2"><i className="far fa-eye" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/2"><i className="fas fa-cart-plus" /></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <Link to="/product/2" className="h3 text-decoration-none">Sweet Dream</Link>
                  <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>Sweet Dream EDT 80ML</li>
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
                  <p className="text-center mb-0">$14.990</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4 product-wap rounded-0">
                <div className="card rounded-0">
                  <img className="card-img rounded-0 img-fluid" src="/img/tienda_03.jpg" alt="tienda-3" />
                  <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center">
                    <ul className="list-unstyled">
                      <li><Link className="btn btn-success text-white" to="/product/3"><i className="far fa-heart" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/3"><i className="far fa-eye" /></Link></li>
                      <li><Link className="btn btn-success text-white mt-2" to="/product/3"><i className="fas fa-cart-plus" /></Link></li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <Link to="/product/3" className="h3 text-decoration-none">Dance</Link>
                  <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                    <li>Shakira Dance Edt 50Ml Vap</li>
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
                  <p className="text-center mb-0">$20.000</p>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-12">
              <ul className="pagination pagination-lg justify-content-end">
                <li className="page-item disabled"><a className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0" href="#">1</a></li>
                <li className="page-item"><a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark" href="#">2</a></li>
                <li className="page-item"><a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark" href="#">3</a></li>
              </ul>
            </div>
          </div>

        </section>

      </div>

      <section className="bg-light py-5">
        <div className="container my-4">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Marcas Asociadas</h1>
              <p>Marcas con las que trabajamos para entregar los mejores productos a nuestros clientes.</p>
            </div>
            <div className="col-lg-9 m-auto tempaltemo-carousel">
              <div className="row d-flex flex-row">
                <div className="col-1 align-self-center">
                  <a className="h1" href="#multi-item-example" role="button" data-bs-slide="prev">
                    <i className="text-light fas fa-chevron-left" />
                  </a>
                </div>
                <div className="col">
                  <div className="carousel slide carousel-multi-item pt-2 pt-md-0" id="multi-item-example" data-bs-ride="carousel">
                    <div className="carousel-inner product-links-wap" role="listbox">
                      <div className="carousel-item active">
                        <div className="row">
                          <div className="col-3 p-md-5"><a href="#"><img className="img-fluid brand-img" src="/img/polo-ralph-lauren.png" alt="Brand" /></a></div>
                          <div className="col-3 p-md-5"><a href="#"><img className="img-fluid brand-img" src="/img/chanel.png" alt="Brand" /></a></div>
                          <div className="col-3 p-md-5"><a href="#"><img className="img-fluid brand-img" src="/img/adolfodominguez.png" alt="Brand" /></a></div>
                          <div className="col-3 p-md-5"><a href="#"><img className="img-fluid brand-img" src="/img/Dior.png" alt="Brand" /></a></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-1 align-self-center">
                  <a className="h1" href="#multi-item-example" role="button" data-bs-slide="next"><i className="text-light fas fa-chevron-right" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
