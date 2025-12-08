import React, { useState, useEffect } from 'react'

export default function Carousel({ images = [], interval = 4000, maxHeight = 400 }){
  const [idx, setIdx] = useState(0)

  useEffect(()=>{
    if(!images || images.length === 0) return
    if(interval <= 0) return
    const t = setInterval(()=> setIdx(i => (i+1) % images.length), interval)
    return ()=> clearInterval(t)
  }, [images, interval])

  if(!images || images.length === 0) return null

  return (
      <div style={{position:'relative'}}>
        <div style={{overflow:'hidden', borderRadius:8, boxShadow:'0 6px 3px -3px rgba(0,0,0,0.15)'}}>
          {images.map((src, i) => (
            <img key={i} src={src} alt={`slide-${i}`} style={{width:'100%', display: i===idx ? 'block' : 'none', maxHeight, objectFit:'cover'}} />
          ))}
        </div>

        <div style={{display:'flex', justifyContent:'center', gap:8, marginTop:16}}>
          {images.map((_, i) => (
            <button key={i} onClick={()=> setIdx(i)} aria-label={`go-to-${i}`} style={{width:10, height:10, borderRadius:'50%', border:'none', background: i===idx ? '#000' : '#d0d0d0', cursor:'pointer', transition:'background 0.3s'}} />
          ))}
        </div>
      </div>
  )
}
