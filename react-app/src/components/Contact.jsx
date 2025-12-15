import React, { useState } from 'react'

export default function Contact(){
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  function validate() {
    const newErrors = {}
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'El email no es válido'
    }
    if (!formData.asunto.trim()) {
      newErrors.asunto = 'El asunto es requerido'
    }
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido'
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSuccessMessage('')
    
    const newErrors = validate()
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      // Aquí puedes agregar la lógica para enviar el mensaje al backend
      console.log('Enviando mensaje:', formData)
      
      // Mostrar mensaje de éxito
      setSuccessMessage('Mensaje Enviado exitosamente')
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
      })
      
      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setSuccessMessage('')
      }, 5000)
    }
  }

  return (
    <div>
      <div className="container-fluid bg-white py-5">
        <div className="col-md-6 m-auto text-center">
          <h1 className="h1 text-dark">Contactanos</h1>
          <p className="text-dark">Dejanos cualquier queja o sugerencia y nos pondremos en contacto contigo a la brevedad.</p>
        </div>
      </div>

      <div style={{width:'100%', height:450}}>
        <iframe src="https://www.google.com/maps/embed?pb=!4v1757225503885!6m8!1m7!1sk_DtR7C7rU-x2ApyMlGCRw!2m2!1d-33.40815564815262!2d-70.69459641617225!3f131.08!4f-19.549999999999997!5f0.7820865974627469" style={{border:0, width:'100%', height:'100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="map" />
      </div>

      <div className="container py-5">
        <div className="row py-5">
          <form className="col-md-9 m-auto" onSubmit={handleSubmit}>
            {successMessage && (
              <div className="alert alert-success d-flex align-items-center mb-4" role="alert" style={{borderRadius: '8px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
                <div>{successMessage}</div>
              </div>
            )}
            
            <div className="row">
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="nombre">Nombre</label>
                <input 
                  type="text" 
                  className={`form-control mt-1 ${errors.nombre ? 'is-invalid' : ''}`}
                  id="nombre" 
                  name="nombre" 
                  placeholder="Nombre" 
                  style={{borderRadius: '5px'}}
                  value={formData.nombre}
                  onChange={handleChange}
                />
                {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
              </div>
              <div className="form-group col-md-6 mb-3">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  className={`form-control mt-1 ${errors.email ? 'is-invalid' : ''}`}
                  id="email" 
                  name="email" 
                  placeholder="Email" 
                  style={{borderRadius: '5px'}}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="asunto">Asunto</label>
              <input 
                type="text" 
                className={`form-control mt-1 ${errors.asunto ? 'is-invalid' : ''}`}
                id="asunto" 
                name="asunto" 
                placeholder="Asunto" 
                style={{borderRadius: '5px'}}
                value={formData.asunto}
                onChange={handleChange}
              />
              {errors.asunto && <div className="invalid-feedback">{errors.asunto}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea 
                className={`form-control mt-1 ${errors.mensaje ? 'is-invalid' : ''}`}
                id="mensaje" 
                name="mensaje" 
                placeholder="Mensaje" 
                rows={8} 
                style={{borderRadius: '5px'}}
                value={formData.mensaje}
                onChange={handleChange}
              />
              {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
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
