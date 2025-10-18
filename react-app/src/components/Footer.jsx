import React from 'react'

export default function Footer(){
  return (
    <footer className="site-footer" style={{marginTop:40}}>
        <footer className="bg-dark" id="tempaltemo_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4 pt-5">
              <h2 className="h2 text-success border-bottom pb-3 border-light logo">Superfume</h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li>
                  <i className="fas fa-map-marker-alt fa-fw" />
                  Pasaje Mapocho 1329, Renca
                </li>
                <li>
                  <i className="fa fa-phone fa-fw" />
                  <a className="text-decoration-none" href="tel:+56932190438">+56932190438</a>
                </li>
                <li>
                  <i className="fa fa-envelope fa-fw" />
                  <a className="text-decoration-none" href="mailto:superfume@gmail.com">superfume@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 pt-5">
              <h2 className="h2 text-light border-bottom pb-3 border-light">Productos</h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li><a className="text-decoration-none" href="#">Azzaro</a></li>
                <li><a className="text-decoration-none" href="#">Ralph Lauren</a></li>
                <li><a className="text-decoration-none" href="#">Chanel</a></li>
                <li><a className="text-decoration-none" href="#">Dior</a></li>
                <li><a className="text-decoration-none" href="#">Rayhaan</a></li>
                <li><a className="text-decoration-none" href="#">Hugo Boss</a></li>
                <li><a className="text-decoration-none" href="#">Valentino</a></li>
              </ul>
            </div>
            <div className="col-md-4 pt-5">
              <h2 className="h2 text-light border-bottom pb-3 border-light">Información Adicional</h2>
              <ul className="list-unstyled text-light footer-link-list">
                <li><a className="text-decoration-none" href="#">Inicio</a></li>
                <li><a className="text-decoration-none" href="/About">Conocenos</a></li>
                <li><a className="text-decoration-none" href="/Contact">Contacto</a></li>
              </ul>
            </div>
          </div>
        </div>
        </footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>© {new Date().getFullYear()} Superfume. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
