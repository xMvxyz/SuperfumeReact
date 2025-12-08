import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import Quiz from '../components/Quiz'
import { Link } from 'react-router-dom'
import * as perfumeService from '../services/perfume'

export default function Home(){
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedProducts() {
      try {
        setLoading(true)
        const data = await perfumeService.list()
        // Tomar los primeros 3 productos
        setFeaturedProducts((data || []).slice(0, 3))
      } catch (error) {
        console.error('Error cargando productos:', error)
        setFeaturedProducts([])
      } finally {
        setLoading(false)
      }
    }
    loadFeaturedProducts()
  }, [])

  return (
    <div>
      <section className="hero-section" style={{backgroundColor: '#fff'}}>
        <div className="container-fluid bg-white py-5">
          <div className="col-md-6 m-auto text-center">
            <h1 className="h1 text-dark">Bienvenido a Superfume</h1>
            <p className="text-dark">Encuentra tus fragancias favoritas.</p>
          </div>
        </div>
      </section>

  <div className="d-flex justify-content-center" style={{backgroundColor: '#fff', padding: '20px 0'}}>
    <Carousel images={["/img/Carrusel_01.png","/img/test_carrusel.png","/img/carrusel_03.png"]} />
  </div>

      {/* Quiz de fragancias */}
      <Quiz />

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
          <Link to="/shop?query=Hombre"><img src="/img/JPGaultier_hombre.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Hombre" /></Link>
          <h5 className="text-center mt-3 mb-3" style={{ color: '#000' }}>Hombre</h5>
          <p className="text-center">
            <Link 
              className="btn btn-dark" 
              to="/shop?query=Hombre"
              style={{ 
                borderRadius: '5px',
                backgroundColor: '#000',
                borderColor: '#000'
              }}
            >
              Comprar
            </Link>
          </p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/shop?query=Mujer"><img src="/img/chanel_mujer.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Mujer" /></Link>
          <h2 className="h5 text-center mt-3 mb-3" style={{ color: '#000' }}>Mujer</h2>
          <p className="text-center">
            <Link 
              className="btn btn-dark" 
              to="/shop?query=Mujer"
              style={{ 
                borderRadius: '5px',
                backgroundColor: '#000',
                borderColor: '#000'
              }}
            >
              Comprar
            </Link>
          </p>
        </div>
        <div className="col-12 col-md-4 p-5 mt-3">
          <Link to="/shop"><img src="/img/perfume_arabe.jpg" className="rounded-circle img-fluid border mx-auto d-block" alt="Arabes" /></Link>
          <h2 className="h5 text-center mt-3 mb-3" style={{ color: '#000' }}>Arabes</h2>
          <p className="text-center">
            <Link 
              className="btn btn-dark" 
              to="/shop"
              style={{ 
                borderRadius: '5px',
                backgroundColor: '#000',
                borderColor: '#000'
              }}
            >
              Comprar
            </Link>
          </p>
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
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-3">Cargando productos...</p>
            </div>
          ) : (
            <div className="row">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-12 col-md-4 mb-4">
                  <div className="card h-100" style={{boxShadow: '0 4px 8px rgba(0,0,0,0.08)'}}>
                    <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.imagenUrl || '/img/destacado_01.jpg'} 
                        className="card-img-top" 
                        alt={product.nombre}
                        style={{ height: '250px', objectFit: 'cover' }}
                      />
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
                        <li className="text-muted text-right">${(product.precio || 0).toLocaleString()}</li>
                      </ul>
                      <Link to={`/product/${product.id}`} className="h2 text-decoration-none text-dark">{product.nombre}</Link>
                      <p className="card-text">
                        {product.descripcion || product.marca}
                      </p>
                      <p className="text-muted">Reseñas (0)</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    
  )
}
