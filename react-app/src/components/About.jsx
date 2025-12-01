import React from 'react'

export default function About(){
  return (
    <div>
      <section className="bg-white py-5">
        <div className="container">
          <div className="row align-items-center py-5">
            <div className="col-md-8">
              <h1 className="text-dark">Sobre Nosotros</h1>
              <p className="text-dark">Somos una tienda de Perfumes, con mas de 10 años en el mercado, entregando a nuestros clientes los mejores productos y la mejor experiencia de compra.</p>
            </div>
            <div className="col-md-4"><img src="/img/conocenos_imagen.png" alt="Nosotros" style={{maxWidth:'100%'}} /></div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row text-center pt-5 pb-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Nuestros Servicios</h1>
            <p>Nuestros servicios estan orientados a entregar la mejor experiencia de compra a nuestros clientes.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow text-center">
              <div className="h1 text-success"><i className="fa fa-truck fa-lg"></i></div>
              <h2 className="h5 mt-4">Servicios de Entrega</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow text-center">
              <div className="h1 text-success"><i className="fas fa-exchange-alt"></i></div>
              <h2 className="h5 mt-4">Envío y reembolsos</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow text-center">
              <div className="h1 text-success"><i className="fa fa-percent"></i></div>
              <h2 className="h5 mt-4">Promociones</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow text-center">
              <div className="h1 text-success"><i className="fa fa-user"></i></div>
              <h2 className="h5 mt-4">Servicio las 24 horas</h2>
            </div>
          </div>

        </div>
      </section>

   
    </div>
  )
}
