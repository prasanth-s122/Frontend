import React from 'react'
import Products from './components/Products'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Todolist from './components/Todolist'
import Recipies from './components/Recipies'
import Users from './components/Users'

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>

          <Route  path = "/" element = {<Home/>} />
          <Route  path = "/products" element = {<Products />} />
          <Route  path = "/todos" element = {<Todolist />} />
          <Route  path = "/recipies" element = {<Recipies />} />
          <Route  path = "/users" element = {<Users />} />

      </Routes>
      <div>
        
      </div>

    </>
  )
}

export default App