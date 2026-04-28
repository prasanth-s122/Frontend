import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <>

      <Navbar/>

      <Routes>

        <Route path = "/" element={<Register/>}/>

      </Routes>
    
    </>
  )
}

export default App