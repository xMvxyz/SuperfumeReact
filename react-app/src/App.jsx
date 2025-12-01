import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Shop from './components/Shop'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Admin from './components/Admin'
import Register from './components/Register'

export default function App(){
  return (
    <>
      <Header />
      <main style={{backgroundColor: '#fff'}}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/product/:id" element={<ProductDetail/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
