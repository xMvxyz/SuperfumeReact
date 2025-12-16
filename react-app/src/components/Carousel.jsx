import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Carousel({ slides = [], interval = 4000 }){
  const [idx, setIdx] = useState(0)

  useEffect(()=>{
    if(!slides || slides.length === 0) return
    if(interval <= 0) return
    const t = setInterval(()=> setIdx(i => (i+1) % slides.length), interval)
    return ()=> clearInterval(t)
  }, [slides, interval])

  if(!slides || slides.length === 0) return null

  return (
      <div style={{position:'relative', width: '100%'}}>
        <div style={{overflow:'hidden', boxShadow:'0 6px 3px -3px rgba(0,0,0,0.15)', height: '500px', backgroundColor: '#f8f9fa'}}>
          {slides.map((slide, i) => (
            <div key={i} style={{display: i===idx ? 'flex' : 'none', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              {slide.link ? (
                <Link to={slide.link} style={{display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <img src={slide.image} alt={slide.alt || `slide-${i}`} style={{maxWidth:'100%', maxHeight:'100%', display:'block', cursor:'pointer', objectFit:'contain'}} />
                </Link>
              ) : (
                <img src={slide.image} alt={slide.alt || `slide-${i}`} style={{maxWidth:'100%', maxHeight:'100%', display:'block', objectFit:'contain'}} />
              )}
            </div>
          ))}
        </div>

        <div style={{display:'flex', justifyContent:'center', gap:8, marginTop:16}}>
          {slides.map((_, i) => (
            <button key={i} onClick={()=> setIdx(i)} aria-label={`go-to-${i}`} style={{width:10, height:10, borderRadius:'50%', border:'none', background: i===idx ? '#000' : '#d0d0d0', cursor:'pointer', transition:'background 0.3s'}} />
          ))}
        </div>
      </div>
  )
}
