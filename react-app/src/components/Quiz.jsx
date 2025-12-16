import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as perfumeService from '../services/perfume'

export default function Quiz() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showQuiz, setShowQuiz] = useState(false)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const products = await perfumeService.list()
        
        // Extraer valores únicos
        const generos = [...new Set(products.map(p => p.genero || p.gender).filter(Boolean))]
        const fragancias = [...new Set(products.map(p => p.fragancia).filter(Boolean))]
        const notas = [...new Set(products.map(p => p.notas).filter(Boolean))]
        const perfiles = [...new Set(products.map(p => p.perfil).filter(Boolean))]

        const newQuestions = []

        if (generos.length > 0) {
          newQuestions.push({
            id: 'gender',
            question: '¿Para quién es el perfume?',
            options: generos.map(g => ({ value: g, label: g.toUpperCase() }))
          })
        }

        if (fragancias.length > 0) {
          newQuestions.push({
            id: 'fragancia',
            question: '¿Qué familia olfativa prefieres?',
            options: fragancias.map(f => ({ value: f, label: f.toUpperCase() }))
          })
        }

        if (notas.length > 0) {
          // Si hay muchas notas, tomamos solo algunas o las agrupamos, aquí mostramos todas las únicas
          // Limitamos a 8 para no saturar
          const limitedNotas = notas.slice(0, 8)
          newQuestions.push({
            id: 'notas',
            question: '¿Qué notas te gustan más?',
            options: limitedNotas.map(n => ({ value: n, label: n.toUpperCase() }))
          })
        }

        if (perfiles.length > 0) {
           const limitedPerfiles = perfiles.slice(0, 8)
           newQuestions.push({
            id: 'perfil',
            question: '¿Qué perfil buscas?',
            options: limitedPerfiles.map(p => ({ value: p, label: p.toUpperCase() }))
          })
        }

        setQuestions(newQuestions)
      } catch (error) {
        console.error("Error loading quiz data", error)
      } finally {
        setLoading(false)
      }
    }

    if (showQuiz) {
      loadData()
    }
  }, [showQuiz])

  const handleStartQuiz = () => {
    setShowQuiz(true)
  }

  const handleAnswer = (value) => {
    const currentQ = questions[currentQuestion]
    const newAnswers = { ...answers, [currentQ.id]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completado - construir query string
      const params = new URLSearchParams()
      if (newAnswers.gender) params.append('gender', newAnswers.gender)
      if (newAnswers.fragancia) params.append('fragancia', newAnswers.fragancia)
      if (newAnswers.notas) params.append('notas', newAnswers.notas)
      if (newAnswers.perfil) params.append('perfil', newAnswers.perfil)
      
      navigate(`/shop?${params.toString()}`)
    }
  }

  if (!showQuiz) {
    return (
      <section className="py-5" style={{ backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="card p-5 shadow" style={{ border: 'none', borderRadius: '10px' }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="fw-bold mb-3" style={{ color: '#000', fontSize: '2.5rem' }}>FRAGANCIAS AUTÉNTICAS DE MARCAS DISEÑADORAS</h2>
                <p className="mb-4" style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                  Mereces lo mejor, especialmente cuando se trata de tus perfumes. Por eso nos asociamos con marcas que conoces y amas para asegurarte fragancias auténticas.
                </p>
                <button 
                  className="btn btn-dark"
                  onClick={handleStartQuiz}
                  style={{ 
                    letterSpacing: '1px',
                    borderRadius: '5px'
                  }}
                >
                  EMPEZAR CON UN QUIZ
                </button>
              </div>
              <div className="col-md-6">
                <div className="row g-3">
                  {['VERSACE', 'ACQUA DI PARMA', 'EX NIHILO', 'DOLCE & GABBANA', 'JULIETTE HAS A GUN', "VICTORIA'S SECRET", 'DIPTYQUE', 'HERETIC PARFUM'].map((brand, idx) => (
                    <div key={idx} className="col-6">
                      <div 
                        className="card p-3 text-center" 
                        style={{ 
                          border: '1px solid #dee2e6',
                          borderRadius: '8px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                          minHeight: '100px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#fff'
                        }}
                      >
                        <h6 className="fw-bold mb-0" style={{ color: '#000', fontSize: '0.9rem' }}>{brand}</h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Preparando tu quiz personalizado...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-5">
        <p>No hay suficientes datos para generar el quiz en este momento.</p>
        <button className="btn btn-dark" onClick={() => navigate('/shop')}>Ir a la tienda</button>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <section className="py-5" style={{ backgroundColor: '#fff' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-4">
          <h4 className="mb-1" style={{ letterSpacing: '2px', fontSize: '14px', color: '#6c757d' }}>SUPERFUME</h4>
          <h2 className="fw-bold mb-4" style={{ color: '#000' }}>{currentQ.question}</h2>
          
          {/* Progress bar */}
          <div className="mb-4 mx-auto" style={{ maxWidth: '400px' }}>
            <div className="progress" style={{ height: '4px', backgroundColor: '#e9ecef' }}>
              <div 
                className="progress-bar bg-dark" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center g-4">
          {currentQ.options.map((option, idx) => (
            <div key={idx} className="col-md-4 col-6">
              <button
                className="btn w-100 border-0 overflow-hidden position-relative quiz-option"
                onClick={() => handleAnswer(option.value)}
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #dee2e6',
                  padding: '2rem 1rem',
                  minHeight: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)'
                  e.currentTarget.style.backgroundColor = '#000'
                  e.currentTarget.querySelector('h5').style.color = '#fff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
                  e.currentTarget.style.backgroundColor = '#fff'
                  e.currentTarget.querySelector('h5').style.color = '#000'
                }}
              >
                <h5 className="fw-bold mb-0" style={{ letterSpacing: '1px', color: '#000', transition: 'color 0.3s', fontSize: '1rem' }}>{option.label}</h5>
              </button>
            </div>
          ))}
        </div>

        {currentQuestion > 0 && (
          <div className="text-center mt-4">
            <button 
              className="btn btn-outline-dark"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              ← Atrás
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
