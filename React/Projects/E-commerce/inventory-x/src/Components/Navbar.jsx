import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (

    <div className='bg-black text-white flex justify-between items-center px-10 py-5'>

      <h1 className='text-2xl font-bold'>
        Inventory X
      </h1>

      <div className='flex gap-8 text-lg'>

        <Link to='/'>
          Home
        </Link>

        <Link to='/cart'>
          Cart
        </Link>

        <Link to='/login'>
          Login
        </Link>

        <Link to='/register'>
          Register
        </Link>

      </div>

    </div>

  )
}

export default Navbar