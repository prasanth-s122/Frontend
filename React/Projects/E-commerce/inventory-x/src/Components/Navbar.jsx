import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {
  const { currentUser, logout, cart, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, products } = useContext(AppContext)
  const navigate = useNavigate()

  const categories = ['All', ...new Set(products.map(p => p.category))];

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

        {/* Search & Filter */}
        <div className='flex items-center flex-1 max-w-xl mx-8 gap-2'>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#f8cb46] focus:border-[#f8cb46] block p-2.5 font-bold uppercase tracking-wider'
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.replace('-', ' ')}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#f8cb46] focus:border-[#f8cb46] block w-full p-2.5 outline-none font-medium transition"
          />
        </div>

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
              <Link to='/cart' className='relative px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
                <span className='text-lg'>🛒</span>
                <span className='font-bold hidden sm:inline'>Cart</span>
                {cartItemCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-[#f8cb46] text-gray-900 text-xs font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm'>
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