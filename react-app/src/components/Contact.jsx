import React from 'react'

export default function Contact(){
  return (
    <div>
      <div className="container-fluid bg-light py-5">
        <div className="col-md-6 m-auto text-center">
          <h1 className="h1">Contactanos</h1>
          <p>Dejanos cualquier queja o sugerencia y nos pondremos en contacto contigo a la brevedad.</p>
        </div>
      </div>

      <div style={{width:'100%', height:450}}>
        <iframe src="https://www.google.com/maps/embed?pb=!4v1757225503885!6m8!1m7!1sk_DtR7C7rU-x2ApyMlGCRw!2m2!1d-33.40815564815262!2d-70.69459641617225!3f131.08!4f-19.549999999999997!5f0.7820865974627469" style={{border:0, width:'100%', height:'100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="map" />
      </div>

      <div className="container py-5">
        <div className="row py-5">
          <form className="col-md-9 m-auto" method="post" role="form">
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="Nombre">Nombre</label>
                <input type="text" className="form-control mt-1" id="Nombre" name="Nombre" placeholder="Nombre" />
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control mt-1" id="email" name="email" placeholder="Email" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="Asunto">Asunto</label>
              <input type="text" className="form-control mt-1" id="Asunto" name="Asunto" placeholder="Asunto" />
            </div>
            <div className="mb-3">
              <label htmlFor="Mensaje">Mensaje</label>
              <textarea className="form-control mt-1" id="Mensaje" name="Mensaje" placeholder="Mensaje" rows={8} />
            </div>
            <div className="row">
              <div className="col text-end mt-2">
                <button type="submit" className="btn btn-success btn-lg px-3">Enviar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
