import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ShopSingle from './pages/ShopSingle'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'

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
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
