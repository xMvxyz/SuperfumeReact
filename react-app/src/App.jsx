import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'

// Páginas placeholder (se agregarán más a medida que migremos)
const Shop = () => <div style={{padding:20}}>Página de tienda (por migrar)</div>
const ShopSingle = () => <div style={{padding:20}}>Detalle de producto (por migrar)</div>
const Cart = () => <div style={{padding:20}}>Carrito (por migrar)</div>
const About = () => <div style={{padding:20}}>About (por migrar)</div>
const Contact = () => <div style={{padding:20}}>Contact (por migrar)</div>
const Login = () => <div style={{padding:20}}>Login (por migrar)</div>

export default function App(){
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/product/:id" element={<ShopSingle/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
