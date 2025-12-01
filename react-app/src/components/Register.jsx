import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '../services/users'

export default function Register(){
	const navigate = useNavigate()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [address, setAddress] = useState('')
	const [region, setRegion] = useState('')
	const [comuna, setComuna] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [acceptTerms, setAcceptTerms] = useState(false)
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	const CHILE_REGIONS = [
		{ name: 'Región de Arica y Parinacota', comunas: ['Arica','Camarones','Putre','General Lagos'] },
		{ name: 'Región de Tarapacá', comunas: ['Iquique','Alto Hospicio','Pozo Almonte'] },
		{ name: 'Región de Antofagasta', comunas: ['Antofagasta','Mejillones','Calama','Tocopilla'] },
		{ name: 'Región de Atacama', comunas: ['Copiapó','Caldera','Vallenar'] },
		{ name: 'Región de Coquimbo', comunas: ['La Serena','Coquimbo','Ovalle'] },
		{ name: 'Región de Valparaíso', comunas: ['Valparaíso','Viña del Mar','Quilpué','Concón'] },
		{ name: 'Región Metropolitana de Santiago', comunas: ['Santiago','Providencia','Las Condes','Maipú','Puente Alto'] },
		{ name: "Región de O'Higgins", comunas: ['Rancagua','Machalí','San Fernando'] },
		{ name: 'Región del Maule', comunas: ['Talca','Curicó','Linares'] },
		{ name: 'Región de Ñuble', comunas: ['Chillán','Chillán Viejo','Bulnes'] },
		{ name: 'Región del Biobío', comunas: ['Concepción','Talcahuano','Chiguayante'] },
		{ name: 'Región de La Araucanía', comunas: ['Temuco','Villarrica','Pucón'] },
		{ name: 'Región de Los Ríos', comunas: ['Valdivia','La Unión'] },
		{ name: 'Región de Los Lagos', comunas: ['Puerto Montt','Osorno','Ancud'] },
		{ name: 'Región Aysén del General Carlos Ibáñez del Campo', comunas: ['Coihaique','Aisén'] },
		{ name: 'Región de Magallanes y de la Antártica Chilena', comunas: ['Punta Arenas','Puerto Natales','Porvenir'] }
	]

	function validate(){
		const e = {}
		if(!name || name.trim().length < 3) e.name = 'Nombre requerido (min 3 caracteres)'
		if(!email || !emailRegex.test(email.trim())) e.email = 'Email inválido'
		if(!password || password.length < 6) e.password = 'Contraseña mínima 6 caracteres'
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
			const payload = {
				name: name.trim(),
				email: email.trim(),
				password,
				role: isAdmin ? 'admin' : 'cliente',
				shipping: {
					address: address.trim(),
					region,
					comuna,
					postalCode: postalCode.trim()
				}
			}

			await users.register(payload)
			setLoading(false)
			navigate('/login')
		}catch(err){
			setLoading(false)
			setErrors({ form: err?.message || 'Error registrando usuario' })
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
		</div>
	)
}

