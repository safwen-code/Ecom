import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Register from './Auth/Register'
import Login from './Auth/Login'
import ListProducts from './screens/ListProducts'
import ProductScreen from './screens/ProductScreen'
import OrderListScreen from './Admin/OrderListScreen'
import OrderScreen from './Admin/OrderScreen'
import ProductListScreen from './Admin/ProductListScreen'
import ProductEditeScreen from './Admin/ProductEditScreen'
import UserListScreen from './Admin/UserListScreen'
import UserEditScreen from './Admin/UserEditScreen'

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
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route
              path="/admin/productlist"
              element={<ProductListScreen />}
              exact
            />
            <Route
              path="/admin/product/:id/edit"
              element={<ProductEditeScreen />}
            />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
