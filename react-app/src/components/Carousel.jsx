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
        <div style={{overflow:'hidden', borderRadius:8}}>
          {images.map((src, i) => (
            <img key={i} src={src} alt={`slide-${i}`} style={{width:'100%', display: i===idx ? 'block' : 'none', maxHeight, objectFit:'cover'}} />
          ))}
        </div>

        <button onClick={()=> setIdx(i => (i-1+images.length)%images.length)} aria-label="previous" style={{position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.4)', color:'#fff', border:'none', padding:'6px 8px', borderRadius:4}}>‹</button>
        <button onClick={()=> setIdx(i => (i+1)%images.length)} aria-label="next" style={{position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.4)', color:'#fff', border:'none', padding:'6px 8px', borderRadius:4}}>›</button>

        <div style={{position:'absolute', left:'50%', transform:'translateX(-50%)', bottom:8, display:'flex', gap:6}}>
          {images.map((_, i) => (
            <button key={i} onClick={()=> setIdx(i)} aria-label={`go-to-${i}`} style={{width:8, height:8, borderRadius:8, border:'none', background: i===idx ? '#fff' : 'rgba(255,255,255,0.5)'}} />
          ))}
        </div>
      </div>
  )
}
