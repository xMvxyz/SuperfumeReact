import React from 'react'
import Carousel from '../components/Carousel'

// Página Home: migración inicial del contenido principal de index.html a JSX.
// Reutiliza imágenes y estilos desde `/img/` y `/css/` gracias a `publicDir` configurado en Vite.
export default function Home(){
  return (
    <div>
  

      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1>Bienvenido a Superfume</h1>
              <p>Encuentra tus fragancias favoritas.</p>
              <img src="/img/Carrusel_01.png" alt="banner" style={{maxWidth:'100%', height:'auto'}}/>
            </div>
          </div>
        </div>
      </section>

  {/* Carrusel agregado arriba del hero */}
  <Carousel images={["/img/Carrusel_01.png","/img/test_carrusel.png","/img/carrusel_03.png"]} />

      <section className="products-section" style={{paddingTop:40}}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="product">
                <img src="/img/producto_01.jpg" alt="Producto 1" style={{width:'100%'}} />
                <h4>Producto 1</h4>
                <p>$49.99</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="product">
                <img src="/img/producto_02.jpg" alt="Producto 2" style={{width:'100%'}} />
                <h4>Producto 2</h4>
                <p>$59.99</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="product">
                <img src="/img/producto_03.jpg" alt="Producto 3" style={{width:'100%'}} />
                <h4>Producto 3</h4>
                <p>$39.99</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
