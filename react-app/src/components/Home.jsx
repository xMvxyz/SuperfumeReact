import React from 'react'
import Carousel from '../components/Carousel'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="hero-section" style={{backgroundColor: '#fff'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>Bienvenido a Superfume</h1>
              <p>Encuentra tus fragancias favoritas.</p>
            </div>
          </div>
        </div>
      </section>

  <div className="d-flex justify-content-center" style={{backgroundColor: '#fff', padding: '20px 0'}}>
    <Carousel images={["/img/Carrusel_01.png","/img/test_carrusel.png","/img/carrusel_03.png"]} />
  </div>

      <section><div className="row text-center pt-3">
      <div className="col-lg-6 m-auto">
        <h1 className="h1">Perfumes</h1>
        <p>
          Revisa nuestra variedad de perfumes para hombre y mujer de las mejores marcas.
        </p>
      </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/shop"><img src="/img/JPGaultier_hombre.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Hombre" /></Link>
          <h5 className="text-center mt-3 mb-3">Hombre</h5>
          <p className="text-center"><Link className="btn btn-success" to="/shop">Comprar</Link></p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/shop"><img src="/img/chanel_mujer.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Mujer" /></Link>
          <h2 className="h5 text-center mt-3 mb-3">Mujer</h2>
          <p className="text-center"><Link className="btn btn-success" to="/shop">Comprar</Link></p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/shop"><img src="/img/perfume_arabe.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Arabes" /></Link>
          <h2 className="h5 text-center mt-3 mb-3">Arabes</h2>
          <p className="text-center"><Link className="btn btn-success" to="/shop">Comprar</Link></p>
        </div>
      </div>
      </section>

      <section style={{backgroundColor: '#fff'}}>
        <div className="container py-5">
          <div className="row text-center py-3">
            <div className="col-lg-6 m-auto">
              <h1 className="h1">Productos Destacados</h1>
              <p>
                Revisa nuestros productos destacados de la semana
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100" style={{boxShadow: '0 4px 8px rgba(0,0,0,0.08)'}}>
                <Link to="/product/1">
                  <img src="/img/destacado_01.jpg" className="card-img-top" alt="Destacado 1" />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-muted fa fa-star" />
                    </li>
                    <li className="text-muted text-right">$32.110</li>
                  </ul>
                  <Link to="/product/1" className="h2 text-decoration-none text-dark">Perfume Ralph Lauren Polo Blue</Link>
                  <p className="card-text">
                    Perfume Ralph Lauren Polo Blue Edt 30ml Hombre
                  </p>
                  <p className="text-muted">Reseñas (24)</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100" style={{boxShadow: '0 4px 8px rgba(0,0,0,0.08)'}}>
                <Link to="/product/2">
                  <img src="/img/destacado_02.jpg" className="card-img-top" alt="Destacado 2" />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-muted fa fa-star" />
                    </li>
                    <li className="text-muted text-right">$55.990</li>
                  </ul>
                  <Link to="/product/2" className="h2 text-decoration-none text-dark">Ayka for Her</Link>
                  <p className="card-text">
                    Ayka for Her EDP 100 ML - Rayhaan
                  </p>
                  <p className="text-muted">Reseñas (48)</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100" style={{boxShadow: '0 4px 8px rgba(0,0,0,0.08)'}}>
                <Link to="/product/3">
                  <img src="/img/destacado_03.jpg" className="card-img-top" alt="Destacado 3" />
                </Link>
                <div className="card-body">
                  <ul className="list-unstyled d-flex justify-content-between">
                    <li>
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                      <i className="text-warning fa fa-star" />
                    </li>
                    <li className="text-muted text-right">$83.900</li>
                  </ul>
                  <Link to="/product/3" className="h2 text-decoration-none text-dark">Azzaro The Most Wanted</Link>
                  <p className="card-text">
                    Azzaro The Most Wanted Parfum 100 ml
                  </p>
                  <p className="text-muted">Reseñas (74)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  )
}
