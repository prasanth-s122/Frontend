import React from 'react'
import {Routes,Route} from 'react-router-dom'

import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
import Cart from './Pages/Cart'
import Admin from './Pages/Admin'
import Orders from './Pages/Orders'
import Checkout from './Pages/Checkout'
import OrderSuccess from './Pages/OrderSuccess'
import { AppProvider } from './Context/AppContext'
import { Toaster } from 'react-hot-toast'

const App = () => {

  return (
    <AppProvider>
      <Toaster position="top-center" />
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order-confirmed' element={<OrderSuccess />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </AppProvider>
  )
}

export default App