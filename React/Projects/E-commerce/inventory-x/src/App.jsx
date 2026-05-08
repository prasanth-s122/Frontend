import React from 'react'

import {Routes,Route} from 'react-router-dom'

import Home from './Pages/Home'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Navbar from './Components/Navbar'
// import Cart from './Pages/Cart'

const App = () => {

  return (
    <>
      
      <Navbar/>
      
      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/register' element={<Register />} />

        <Route path='/login' element={<Login />} />

        {/* <Route path='/cart' element={<Cart />} /> */}

      </Routes>

    </>

  )
}

export default App