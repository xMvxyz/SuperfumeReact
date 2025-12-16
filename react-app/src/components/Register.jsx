import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '../services/usuario'

export default function Register(){
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [rut, setRut] = useState('')
	const [phone, setPhone] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [address, setAddress] = useState('')
	const [region, setRegion] = useState('')
	const [comuna, setComuna] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [acceptTerms, setAcceptTerms] = useState(false)
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const [modal, setModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null })

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	const CHILE_REGIONS = [
		{ name: 'Región de Arica y Parinacota', comunas: ['Arica','Camarones','Putre','General Lagos'] },
		{ name: 'Región de Tarapacá', comunas: ['Iquique','Alto Hospicio','Pozo Almonte','Pica','Huara','Colchane','Camiña'] },
		{ name: 'Región de Antofagasta', comunas: ['Antofagasta','Mejillones','Calama','Tocopilla','Taltal','Sierra Gorda','María Elena','Ollagüe'] },
		{ name: 'Región de Atacama', comunas: ['Copiapó','Caldera','Vallenar','Chañaral','Diego de Almagro','Tierra Amarilla','Huasco','Freirina','Alto del Carmen'] },
		{ name: 'Región de Coquimbo', comunas: ['La Serena','Coquimbo','Ovalle','Illapel','Vicuña','Andacollo','Monte Patria','Combarbalá','Paihuano'] },
		{ name: 'Región de Valparaíso', comunas: ['Valparaíso','Viña del Mar','Quilpué','Villa Alemana','Concón','Quintero','Puchuncaví','Casablanca','San Antonio','Cartagena','El Quisco','Algarrobo','Santo Domingo'] },
		{ name: 'Región Metropolitana de Santiago', comunas: ['Santiago','Providencia','Las Condes','Maipú','Puente Alto','La Florida','Ñuñoa','Vitacura','Lo Barnechea','Peñalolén','Macul','La Reina','Quilicura','Huechuraba','Recoleta','Independencia','Conchalí','Renca','Quinta Normal','Estación Central','Cerrillos','Pedro Aguirre Cerda','Lo Espejo','San Miguel','San Joaquín','La Cisterna','El Bosque','La Granja','La Pintana','San Ramón','Lo Prado','Cerro Navia','Pudahuel','Colina','Lampa','Tiltil','San Bernardo','Calera de Tango','Buin','Paine','Melipilla','Alhué','Curacaví','María Pinto','San Pedro','Talagante','El Monte','Isla de Maipo','Padre Hurtado','Peñaflor'] },
		{ name: "Región del Libertador General Bernardo O'Higgins", comunas: ['Rancagua','Machalí','San Fernando','Rengo','San Vicente','Pichilemu','Santa Cruz','Chimbarongo','Nancagua','Placilla','Graneros','Codegua'] },
		{ name: 'Región del Maule', comunas: ['Talca','Curicó','Linares','Constitución','Cauquenes','Parral','Molina','San Clemente','San Javier','Villa Alegre','Maule'] },
		{ name: 'Región de Ñuble', comunas: ['Chillán','Chillán Viejo','Bulnes','San Carlos','Quirihue','Coihueco','Pinto','El Carmen','Pemuco','Yungay','San Nicolás','Ninhue'] },
		{ name: 'Región del Biobío', comunas: ['Concepción','Talcahuano','Chiguayante','San Pedro de la Paz','Hualpén','Penco','Tomé','Coronel','Lota','Los Ángeles','Cabrero','Nacimiento','Cañete','Lebu','Arauco','Curanilahue'] },
		{ name: 'Región de La Araucanía', comunas: ['Temuco','Villarrica','Pucón','Angol','Victoria','Lautaro','Nueva Imperial','Carahue','Pitrufquén','Loncoche','Collipulli','Traiguén','Curacautín','Lonquimay','Melipeuco','Curarrehue','Cunco'] },
		{ name: 'Región de Los Ríos', comunas: ['Valdivia','La Unión','Río Bueno','Panguipulli','Paillaco','Lanco','Los Lagos','Corral','Máfil','Mariquina','Futrono','Lago Ranco'] },
		{ name: 'Región de Los Lagos', comunas: ['Puerto Montt','Osorno','Castro','Ancud','Puerto Varas','Frutillar','Llanquihue','Fresia','Los Muermos','Maullín','Calbuco','Cochamó','Purranque','Río Negro','San Pablo','Puerto Octay','Quellón','Quemchi','Dalcahue','Curaco de Vélez','Quinchao','Puqueldón','Chonchi'] },
		{ name: 'Región de Aysén del General Carlos Ibáñez del Campo', comunas: ['Coyhaique','Aysén','Puerto Aysén','Chile Chico','Cochrane','Río Ibáñez','Cisnes','Guaitecas','Lago Verde','Tortel'] },
		{ name: 'Región de Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas','Puerto Natales','Porvenir','Puerto Williams','Cabo de Hornos','Primavera','Timaukel','Torres del Paine','Laguna Blanca','San Gregorio','Río Verde'] }
	]

	function validate(){
		const e = {}
		if(!name || name.trim().length < 3) e.name = 'Nombre requerido (min 3 caracteres)'
		if(!email || !emailRegex.test(email.trim())) e.email = 'Email inválido'
		if(!password || password.length < 6) e.password = 'Contraseña mínima 6 caracteres'
		if(!rut || rut.trim().length < 8) e.rut = 'RUT requerido (sin puntos, con guión)'
		if(!phone || !/^[0-9]{8,9}$/.test(phone.trim())) e.phone = 'Teléfono inválido (8-9 dígitos)'
		if(!address || address.trim().length < 5) e.address = 'Dirección de envío requerida'
		if(!region) e.region = 'Región requerida'
		if(!comuna) e.comuna = 'Comuna requerida'
		if(!postalCode || !/^\d{4,6}$/.test(postalCode)) e.postalCode = 'Código postal inválido (4-6 dígitos)'
		if(!acceptTerms) e.acceptTerms = 'Debes aceptar los términos'
		return e
	}

	async function handleSubmit(ev){
		ev.preventDefault()
		const e = validate()
		setErrors(e)
		if(Object.keys(e).length) return

		setLoading(true)
		try{
			const isAdmin = email.trim().toLowerCase().endsWith('@admin.com')
			const roleStr = isAdmin ? 'admin' : 'cliente'
			const direccionCompleta = `${address.trim()}, ${comuna}, ${region}, ${postalCode.trim()}`
			
			const payload = {
				name: name.trim(),
				email: email.trim(),
				password: password,
				rut: rut.trim(),
				phone: phone.trim(),
				address: direccionCompleta,
				role: roleStr
			}

			const result = await users.register(payload)
			console.log('✓ Usuario registrado exitosamente:', result)
			
			// Hacer login automático
			try {
				const loginResult = await users.login(email.trim(), password)
				if (loginResult && loginResult.token) {
					localStorage.setItem('token', loginResult.token)
					localStorage.setItem('user', JSON.stringify(loginResult.user))
				}
			} catch (loginErr) {
				console.error('Error en login automático:', loginErr)
			}
			
			setLoading(false)
			setModal({ 
				isOpen: true, 
				title: '¡Cuenta creada!', 
				message: 'Tu cuenta ha sido creada exitosamente. Serás redirigido al inicio.',
				onConfirm: () => {
					setModal({ ...modal, isOpen: false })
					navigate('/')
				}
			})
		}catch(err){
			setLoading(false)
			console.error('Error en registro:', err)
			const errorMsg = err?.response?.data?.message || err?.message || 'Error registrando usuario'
			setErrors({ form: errorMsg })
			setModal({ isOpen: true, title: 'Error', message: errorMsg })
		}
	}

	return (
		<div className="login-page-wrap">
			<div className="login-card">
				<div className="login-top">
					<h3 className="m-0">Crear cuenta</h3>
					<div className="login-subtext">Completa tus datos de registro</div>
				</div>
				<div className="login-body">
					<form onSubmit={handleSubmit} noValidate>
						<div className="mb-12">
							<label className="label-13">Nombre completo</label>
							<input
								type="text"
								className="form-control"
								placeholder="Tu nombre"
								value={name}
								onChange={e=>setName(e.target.value)}
								disabled={loading}
							/>
							{errors.name && <div className="error-text">{errors.name}</div>}
						</div>

					<div className="mb-12">
						<label className="label-13">Correo electrónico</label>
						<input
							type="email"
							className="form-control"
							placeholder="tu@gmail.com"
							value={email}
							onChange={e=>setEmail(e.target.value)}
							disabled={loading}
						/>
						{errors.email && <div className="error-text">{errors.email}</div>}
					</div>

					<div className="mb-12">
						<label className="label-13">RUT</label>
						<input
							type="text"
							className="form-control"
							placeholder="12345678-9"
							value={rut}
							onChange={e=>setRut(e.target.value)}
							disabled={loading}
						/>
						{errors.rut && <div className="error-text">{errors.rut}</div>}
					</div>

					<div className="mb-12">
						<label className="label-13">Teléfono</label>
						<input
							type="tel"
							className="form-control"
							placeholder="912345678"
							value={phone}
							onChange={e=>setPhone(e.target.value.replace(/[^0-9]/g, ''))}
							disabled={loading}
							maxLength={9}
						/>
						{errors.phone && <div className="error-text">{errors.phone}</div>}
					</div>

					<div className="mb-12">
							<label className="label-13">Contraseña</label>
							<div className="field-row">
								<input
									type={showPassword ? 'text' : 'password'}
									className="form-control"
									placeholder="Tu contraseña"
									value={password}
									onChange={e=>setPassword(e.target.value)}
									disabled={loading}
								/>
								<button
									type="button"
									className="btn btn-outline-secondary nowrap"
									onClick={()=>setShowPassword(s=>!s)}
								>
									{showPassword ? 'Ocultar' : 'Mostrar'}
								</button>
							</div>
							{errors.password && <div className="error-text">{errors.password}</div>}
						</div>

						<hr />

						<div className="mb-12">
							<label className="label-13">Dirección de envío</label>
							<input
								type="text"
								className="form-control"
								placeholder="Calle, número, departamento"
								value={address}
								onChange={e=>setAddress(e.target.value)}
								disabled={loading}
							/>
							{errors.address && <div className="error-text">{errors.address}</div>}
						</div>

						<div className="row g-2 mb-12">
							<div className="col-6">
								<label className="label-13">Región</label>
								<select
									className="form-select"
									value={region}
									onChange={e=>{ setRegion(e.target.value); setComuna('') }}
									disabled={loading}
								>
									<option value="">Selecciona región</option>
									{CHILE_REGIONS.map(r=> (
										<option key={r.name} value={r.name}>{r.name}</option>
									))}
								</select>
								{errors.region && <div className="error-text">{errors.region}</div>}
							</div>
							<div className="col-6">
								<label className="label-13">Comuna</label>
								<select
									className="form-select"
									value={comuna}
									onChange={e=>setComuna(e.target.value)}
									disabled={loading || !region}
								>
									<option value="">Selecciona comuna</option>
									{(CHILE_REGIONS.find(r=>r.name === region)?.comunas || []).map(c=> (
										<option key={c} value={c}>{c}</option>
									))}
								</select>
								{errors.comuna && <div className="error-text">{errors.comuna}</div>}
							</div>
						</div>

						<div className="mb-12">
							<label className="label-13">Código postal</label>
							<input
								type="text"
								className="form-control"
								placeholder="Ej: 8320000"
								value={postalCode}
								onChange={e=>setPostalCode(e.target.value.replace(/[^0-9]/g, ''))}
								disabled={loading}
							/>
							{errors.postalCode && <div className="error-text">{errors.postalCode}</div>}
						</div>

						<div className="row-between mb-12">
							<label className="remember-wrap">
								<input
									type="checkbox"
									checked={acceptTerms}
									onChange={e=>setAcceptTerms(e.target.checked)}
									disabled={loading}
								/>
								<span className="remember-text">Acepto los términos y condiciones</span>
							</label>
						</div>

						{errors.form && <div className="error-text mb-8">{errors.form}</div>}

						<div className="btn-row">
							<button
								className="btn btn-sm btn-outline-info me-2 flex-1 btn-enter"
								type="submit"
								disabled={loading}
							>
								{loading ? 'Registrando...' : 'Crear cuenta'}
							</button>
							<button
								type="button"
								className="btn btn-outline-secondary btn-lg flex-1"
								onClick={()=>navigate('/login')}
								disabled={loading}
							>
								Volver a iniciar sesión
							</button>
						</div>
					</form>
				</div>
			</div>
			
			{modal.isOpen && (
				<div className="modal-backdrop">
					<div className="modal-card">
						<h4 className="mt-0">{modal.title}</h4>
						<p>{modal.message}</p>
						<div className="modal-actions">
							<button 
								className="btn btn-dark" 
								onClick={() => modal.onConfirm ? modal.onConfirm() : setModal({ ...modal, isOpen: false })}
							>
								Continuar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
