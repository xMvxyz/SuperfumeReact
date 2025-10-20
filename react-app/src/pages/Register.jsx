import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import users from '../api/users'

export default function Register(){
	const navigate = useNavigate()
	const [form, setForm] = useState({ name:'', email:'', password:'' })
	const [errors, setErrors] = useState({})
	const [status, setStatus] = useState(null)

	function validate(){
		const e = {}
		if(!form.name || form.name.trim().length < 10) e.name = 'Nombre requerido (min 10 caracteres)'
		if(!form.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Email inválido'
		if(!form.password || form.password.length < 6) e.password = 'Contraseña mínima 6 caracteres'
		return e
	}

	async function onSubmit(ev){
		ev.preventDefault()
		setStatus(null)
		const e = validate()
		if(Object.keys(e).length){ setErrors(e); return }
		setErrors({})

		const isAdmin = form.email.trim().toLowerCase().endsWith('@admin.com')
		const payload = { email: form.email.trim(), password: form.password, name: form.name.trim(), role: isAdmin ? 'admin' : 'cliente' }

		try{
			const res = await users.register(payload)
				setStatus({ success: true, message: 'Registro correcto' })
				setForm({ name:'', email:'', password:'' })
				navigate('/login')
		}catch(err){
			setStatus({ success: false, message: err.message || 'Error registrando' })
		}
	}

	return (
		<div className="container py-5">
			<h2>Registro de Usuario</h2>
			<form className="card p-4 mt-3" onSubmit={onSubmit}>
				<div className="mb-3">
					<label className="form-label">Nombre</label>
					<input className="form-control" value={form.name} onChange={e=>setForm(f=>({...f, name: e.target.value}))} />
					{errors.name && <small className="text-danger">{errors.name}</small>}
				</div>
				<div className="mb-3">
					<label className="form-label">Correo</label>
					<input className="form-control" value={form.email} onChange={e=>setForm(f=>({...f, email: e.target.value}))} />
					{errors.email && <small className="text-danger">{errors.email}</small>}
				</div>
				<div className="mb-3">
					<label className="form-label">Contraseña</label>
					<input type="password" className="form-control" value={form.password} onChange={e=>setForm(f=>({...f, password: e.target.value}))} />
					{errors.password && <small className="text-danger">{errors.password}</small>}
				</div>

				<div className="d-flex justify-content-between align-items-center">
					<button className="btn btn-info" type="submit">Registrarse</button>
				</div>

				{status && (
					<div className={`mt-3 alert ${status.success ? 'alert-success' : 'alert-danger'}`} role="alert">{status.message}</div>
				)}
			</form>
		</div>
	)
}

