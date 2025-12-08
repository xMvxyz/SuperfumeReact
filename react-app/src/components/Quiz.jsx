import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Quiz() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showQuiz, setShowQuiz] = useState(false)

  const questions = [
    {
      id: 1,
      question: '¿Qué tipo de fragancia estás buscando?',
      options: [
        { value: 'feminine', label: 'FEMENINO', image: '/img/quiz-feminine.jpg' },
        { value: 'masculine', label: 'MASCULINO', image: '/img/quiz-masculine.jpg' }
      ]
    },
    {
      id: 2,
      question: '¿Qué familia de fragancias prefieres?',
      options: [
        { value: 'floral', label: 'FLORAL' },
        { value: 'woody', label: 'AMADERADO' },
        { value: 'fresh', label: 'FRESCO' },
        { value: 'oriental', label: 'ORIENTAL' }
      ]
    },
    {
      id: 3,
      question: '¿Cuándo usarías este perfume?',
      options: [
        { value: 'day', label: 'DÍA' },
        { value: 'night', label: 'NOCHE' },
        { value: 'both', label: 'AMBOS' }
      ]
    }
  ]

  const handleStartQuiz = () => {
    setShowQuiz(true)
  }

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentQuestion]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completado - redirigir a shop con filtros
      const gender = newAnswers[0] === 'feminine' ? 'Mujer' : 'Hombre'
      navigate(`/shop?gender=${gender}`)
    }
  }

  if (!showQuiz) {
    return (
      <section className="py-5" style={{ backgroundColor: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="card p-5 shadow" style={{ border: 'none', borderRadius: '12px' }}>
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="fw-bold mb-3" style={{ color: '#000', fontSize: '2.5rem' }}>FRAGANCIAS AUTÉNTICAS DE MARCAS DISEÑADORAS</h2>
                <p className="mb-4" style={{ color: '#6c757d', fontSize: '1.1rem' }}>
                  Mereces lo mejor, especialmente cuando se trata de tus perfumes. Por eso nos asociamos con marcas que conoces y amas para asegurarte fragancias auténticas.
                </p>
                <button 
                  className="btn btn-dark btn-lg px-5 py-3"
                  onClick={handleStartQuiz}
                  style={{ 
                    letterSpacing: '1px',
                    borderRadius: '5px'
                  }}
                >
                  EMPEZAR CON UN QUIZ →
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
            <div key={idx} className={currentQ.options.length === 2 ? 'col-md-5' : 'col-md-3 col-6'}>
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
                  padding: '2.5rem 1.5rem',
                  minHeight: '150px'
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
                <h5 className="fw-bold mb-0" style={{ letterSpacing: '1px', color: '#000', transition: 'color 0.3s' }}>{option.label}</h5>
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
