import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'

import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Cart from './Pages/Cart'
import Admin from './Pages/Admin'
import Orders from './Pages/Orders'
import Checkout from './Pages/Checkout'
import Profile from './Pages/Profile'
import OrderSuccess from './Pages/OrderSuccess'
import { AppProvider } from './Context/AppContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register'

  return (
    <AppProvider>
      <Toaster position="top-center" />
      {!hideNavbar && <Navbar/>}
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmed' element={<OrderSuccess />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </AppProvider>
  )
}

export default App