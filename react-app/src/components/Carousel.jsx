import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Carousel({ slides = [], interval = 4000, maxHeight = 400 }){
  const [idx, setIdx] = useState(0)

  useEffect(()=>{
    if(!slides || slides.length === 0) return
    if(interval <= 0) return
    const t = setInterval(()=> setIdx(i => (i+1) % slides.length), interval)
    return ()=> clearInterval(t)
  }, [slides, interval])

  if(!slides || slides.length === 0) return null

  return (
      <div style={{position:'relative'}}>
        <div style={{overflow:'hidden', borderRadius:8, boxShadow:'0 6px 3px -3px rgba(0,0,0,0.15)'}}>
          {slides.map((slide, i) => (
            <div key={i} style={{display: i===idx ? 'block' : 'none'}}>
              {slide.link ? (
                <Link to={slide.link}>
                  <img src={slide.image} alt={slide.alt || `slide-${i}`} style={{width:'100%', maxHeight, objectFit:'cover', cursor:'pointer'}} />
                </Link>
              ) : (
                <img src={slide.image} alt={slide.alt || `slide-${i}`} style={{width:'100%', maxHeight, objectFit:'cover'}} />
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
