import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    
    <>
    
    <div className='bg-gray-500 flex justify-between items-center h-16'>

        <div className='p-2'>
            Logo
        </div>

        <div className='p-3 flex gap-3'>

            <Link className='bg-blue-300 text-black p-2 rounded-2xl hover:bg-blue-500' to="/">Register</Link>
            <Link className='bg-blue-300 text-black p-2 rounded-2xl hover:bg-blue-500' to="/login">Login</Link>

        </div>

    </div>
    
    </>
  )
}

export default Navbar