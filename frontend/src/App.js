import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Register from './Auth/Register'
import Login from './Auth/Login'
import ListProducts from './screens/ListProducts'
import ProductScreen from './screens/ProductScreen'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ListProducts />} />
            <Route path="/product/:id" element={<ProductScreen />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
