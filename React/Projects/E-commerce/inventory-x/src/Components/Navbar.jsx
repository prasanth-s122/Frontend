import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {
  const { currentUser, logout, cart } = useContext(AppContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className='bg-white border-b border-gray-100 sticky top-0 z-50 px-8 py-4 shadow-sm'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center gap-2'>
          <h1 className='text-3xl font-black tracking-tighter text-gray-900'>
            Inventory <span className='text-[#f8cb46]'>X</span>
          </h1>
        </Link>

        <div className='flex items-center gap-6 font-bold text-gray-600'>
          {!currentUser ? (
            <>
              <Link to='/login' className='hover:text-gray-900 transition'>Login</Link>
              <Link to='/register' className='px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200 transition'>Register</Link>
            </>
          ) : currentUser.role === 'admin' ? (
            <>
              <Link to='/admin' className='hover:text-gray-900 transition'>Dashboard</Link>
              <button onClick={handleLogout} className='px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition'>Logout</button>
            </>
          ) : (
            <>
              <span className='text-gray-400 font-medium hidden sm:block'>Hi, {currentUser.name}</span>
              <Link to='/orders' className='hover:text-gray-900 transition'>Orders</Link>
              <Link to='/cart' className='px-4 py-2 bg-[#1c9236] text-white rounded-xl hover:bg-[#167a2a] transition flex items-center gap-2 shadow-md shadow-green-200'>
                Cart
                {cartItemCount > 0 && (
                  <span className='bg-white text-[#1c9236] text-xs font-black px-2 py-0.5 rounded-full'>
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button onClick={handleLogout} className='px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition'>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar