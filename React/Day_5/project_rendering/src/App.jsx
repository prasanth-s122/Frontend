import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Render from './components/Render'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>

          <Route  path = "/" element = {<Home/>} />
          <Route  path = "/render" element = {<Render/>} />

      </Routes>
    
    </>
  )
}

export default App