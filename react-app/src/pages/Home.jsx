import React from 'react'
import Carousel from '../components/Carousel'

// Página Home: migración inicial del contenido principal de index.html a JSX.
// Reutiliza imágenes y estilos desde `/img/` y `/css/` gracias a `publicDir` configurado en Vite.
export default function Home(){
  return (
    <div>
      <section className="hero-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>Bienvenido a Superfume</h1>
              <p>Encuentra tus fragancias favoritas.</p>
            </div>
          </div>
        </div>
      </section>

  {/* Carrusel agregado arriba del hero */}
  <div className="d-flex justify-content-center bg-light">
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
          <a href="#"><img src="/img/JPGaultier_hombre.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Hombre" /></a>
          <h5 className="text-center mt-3 mb-3">Hombre</h5>
          <p className="text-center"><a className="btn btn-success">Comprar</a></p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <a href="#"><img src="/img/chanel_mujer.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Mujer" /></a>
          <h2 className="h5 text-center mt-3 mb-3">Mujer</h2>
          <p className="text-center"><a className="btn btn-success">Comprar</a></p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <a href="#"><img src="/img/perfume_arabe.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Arabes" /></a>
          <h2 className="h5 text-center mt-3 mb-3">Arabes</h2>
          <p className="text-center"><a className="btn btn-success">Comprar</a></p>
        </div>
      </div>
      </section>

      <section className="bg-light">
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
              <div className="card h-100">
                <a href="shop-single.html">
                  <img src="/img/destacado_01.jpg" className="card-img-top" alt="..." />
                </a>
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
                  <a href="shop-single.html" className="h2 text-decoration-none text-dark">Perfume Ralph Lauren Polo Blue</a>
                  <p className="card-text">
                    Perfume Ralph Lauren Polo Blue Edt 30ml Hombre
                  </p>
                  <p className="text-muted">Reseñas (24)</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="shop-single.html">
                  <img src="/img/destacado_02.jpg" className="card-img-top" alt="..." />
                </a>
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
                  <a href="shop-single.html" className="h2 text-decoration-none text-dark">Ayka for Her</a>
                  <p className="card-text">
                    Ayka for Her EDP 100 ML - Rayhaan
                  </p>
                  <p className="text-muted">Reseñas (48)</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100">
                <a href="shop-single.html">
                  <img src="/img/destacado_03.jpg" className="card-img-top" alt="..." />
                </a>
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
                  <a href="shop-single.html" className="h2 text-decoration-none text-dark">Azzaro The Most Wanted</a>
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
