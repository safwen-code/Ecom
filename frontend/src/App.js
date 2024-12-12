import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Register from './Auth/Register'

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
