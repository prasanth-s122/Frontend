import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'

const App = () => {
  return (
    <>

      <Navbar/>

      <Routes>

        <Route path = "/" element={<Register/>}/>
        <Route path = "/login" element={<Login/>}/>

      </Routes>
    
    </>
  )
}

export default App