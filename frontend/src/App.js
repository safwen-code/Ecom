import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Register from './Auth/Register'
import Login from './Auth/Login'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
