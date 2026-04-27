import React from 'react'
import Products from './components/Products'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>

          <Route  path = "/" element = {<Home/>} />
          <Route  path = "/products" element = {<Products />} />

      </Routes>
      <div>
        
      </div>

    </>
  )
}

export default App