import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logou.png'

const Navbar = () => {
  return (
    <>
        <div className='bg-gray-300 flex justify-between items-center h-24 p-5 rounded'>

            <div >
               <img className='w-20 rounded-2xl' src={logo} alt="" />
            </div>

            <div className='flex gap-5'>
                <Link className='bg-black text-white p-3 rounded-2xl hover:bg-blue-400 transition duration-700  text-center' to="/">Home</Link>
                <Link className='bg-black text-white p-3 rounded-2xl hover:bg-blue-400 transition duration-700  text-center' to = "/products">Product Table</Link>

            </div>

        </div>
    </>
  )
}

export default Navbar