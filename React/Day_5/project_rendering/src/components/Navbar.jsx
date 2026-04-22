import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
        <div className='bg-gray-300 flex justify-between items-center h-24 p-5 rounded-4xl'>

            <div >
                Logo
            </div>

            <div className='flex gap-5'>
                <Link className='bg-black text-white p-2 rounded-4xl hover:bg-blue-400 transition duration-700 ' to="/">Home</Link>
                <Link className='bg-black text-white p-2 rounded-4xl hover:bg-blue-400 transition duration-700' to = "/render">Rendering Process</Link>

            </div>

        </div>
    </>
  )
}

export default Navbar