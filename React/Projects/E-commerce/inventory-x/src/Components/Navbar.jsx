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
    <nav className='bg-slate-900/95 backdrop-blur-md shadow-md border-b border-slate-800 sticky top-0 z-50 px-8 py-4'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='flex items-center gap-2'>
          <h1 className='text-3xl font-black tracking-tighter text-slate-100'>
            Inventory <span className='text-red-600'>X</span>
          </h1>
        </Link>

        {/* Search & Filter */}
        <div className='flex items-center flex-1 max-w-xl mx-8 gap-3'>
          <div className="relative flex-shrink-0">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='appearance-none bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block py-2.5 pl-4 pr-10 font-bold uppercase tracking-wider cursor-pointer hover:bg-slate-700 hover:text-white transition shadow-sm outline-none'
            >
              {categories.map(cat => (
                <option key={cat} value={cat} className='bg-slate-800 text-slate-200'>{cat.replace('-', ' ')}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block w-full p-2.5 outline-none font-medium transition placeholder-slate-500 shadow-sm"
          />
        </div>

        <div className='flex items-center gap-6 font-bold text-slate-400'>
          {!currentUser ? (
            <>
              <Link to='/login' className='hover:text-slate-200 transition'>Login</Link>
              <Link to='/register' className='px-4 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition'>Register</Link>
            </>
          ) : currentUser.role === 'admin' ? (
            <>
              <Link to='/admin' className='px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700 hover:text-white transition shadow-sm hover:shadow-md'>Dashboard</Link>
              <button onClick={handleLogout} className='px-4 py-2 bg-slate-800 border border-slate-700 text-red-400 rounded-xl hover:bg-slate-700 hover:text-red-300 transition shadow-sm hover:shadow-md'>Logout</button>
            </>
          ) : (
            <>
              <span className='text-slate-500 font-medium hidden sm:block'>Hi, {currentUser.name}</span>
              <Link to='/profile' className='px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700 hover:text-white transition shadow-sm hover:shadow-md'>Profile</Link>
              <Link to='/orders' className='px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-xl hover:bg-slate-700 hover:text-white transition shadow-sm hover:shadow-md'>Orders</Link>
              <Link to='/cart' className='relative px-5 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl hover:bg-slate-700 transition flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
                <span className='text-lg'>🛒</span>
                <span className='font-bold hidden sm:inline'>Cart</span>
                {cartItemCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-slate-900 shadow-sm'>
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <button onClick={handleLogout} className='px-4 py-2 bg-slate-800 border border-slate-700 text-red-400 rounded-xl hover:bg-slate-700 hover:text-red-300 transition shadow-sm hover:shadow-md'>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar