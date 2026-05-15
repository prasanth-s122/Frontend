import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const Admin = () => {
  const { currentUser, products, updateProductStock, login } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')
  const [allOrders, setAllOrders] = useState([])
  const [adminCredentials, setAdminCredentials] = useState({ email: '', password: '' })

  useEffect(() => {
    if (currentUser && currentUser.role === 'admin') {
      setAdminCredentials({ email: currentUser.email, password: currentUser.password })
    }
  }, [currentUser])

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/')
      return
    }

    const orders = JSON.parse(localStorage.getItem('all_orders')) || []
    setAllOrders([...orders].reverse())
  }, [currentUser, navigate])

  const handleUpdateCredentials = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || []
    const updatedUsers = users.map(u => 
      u.role === 'admin' ? { ...u, email: adminCredentials.email, password: adminCredentials.password } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    // Update current user session
    const updatedUser = { ...currentUser, email: adminCredentials.email, password: adminCredentials.password }
    login(updatedUser)
    
    toast.success('Admin credentials updated successfully!')
  }

  const handleStockChange = (productId, newStock) => {
    const stock = parseInt(newStock)
    if (!isNaN(stock) && stock >= 0) {
      updateProductStock(productId, stock)
    }
  }

  const handleOrderStatusChange = (orderId, userEmail, newStatus) => {
    const updatedAllOrders = allOrders.map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    )
    setAllOrders(updatedAllOrders)
    
    // Save to all_orders (reversing back to original chronological order)
    localStorage.setItem('all_orders', JSON.stringify([...updatedAllOrders].reverse()))

    // Update specific user's orders
    const userOrdersKey = `orders_${userEmail}`
    const userOrders = JSON.parse(localStorage.getItem(userOrdersKey)) || []
    const updatedUserOrders = userOrders.map(o =>
      o.id === orderId ? { ...o, status: newStatus } : o
    )
    localStorage.setItem(userOrdersKey, JSON.stringify(updatedUserOrders))
  }

  if (!currentUser || currentUser.role !== 'admin') return null

  return (
    <div className='min-h-[calc(100vh-72px)] bg-transparent p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-black text-slate-100 uppercase tracking-wider'>Admin Dashboard</h1>
          <div className='flex gap-4'>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'products' ? 'bg-red-600 text-white shadow-md shadow-red-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              Manage Stock
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'orders' ? 'bg-red-600 text-white shadow-md shadow-red-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              All Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-2 rounded-full font-bold transition ${activeTab === 'settings' ? 'bg-red-600 text-white shadow-md shadow-red-900/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              Settings
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden'>
            <table className='w-full text-left'>
              <thead className='bg-slate-900/50 text-slate-400 uppercase text-sm font-bold border-b border-slate-700'>
                <tr>
                  <th className='p-4'>Product</th>
                  <th className='p-4'>Category</th>
                  <th className='p-4'>Price</th>
                  <th className='p-4'>Current Stock</th>
                  <th className='p-4'>Update Stock</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {products.map(product => (
                  <tr key={product.id} className='hover:bg-slate-700/50 transition'>
                    <td className='p-4 flex items-center gap-4'>
                      <img src={product.image} alt={product.name} className='h-12 w-12 object-contain bg-slate-100 rounded-md p-1' />
                      <span className='font-bold text-slate-100'>{product.name}</span>
                    </td>
                    <td className='p-4 text-slate-400 uppercase text-xs font-bold tracking-wide'>{product.category}</td>
                    <td className='p-4 font-bold text-cyan-400'>₹{product.price}</td>
                    <td className='p-4'>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 5 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className='p-4'>
                      <input 
                        type='number' 
                        min='0'
                        value={product.stock}
                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                        className='w-24 p-2 bg-slate-900 border border-slate-700 text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden p-8 max-w-lg'>
            <h2 className='text-2xl font-bold text-slate-100 mb-6'>Update Admin Credentials</h2>
            <form onSubmit={handleUpdateCredentials} className='flex flex-col gap-5'>
              <div>
                <label className='block text-sm font-bold text-slate-400 mb-1'>Login ID (Email)</label>
                <input 
                  type='email' 
                  value={adminCredentials.email || ''}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, email: e.target.value })}
                  className='w-full p-3 bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-bold text-slate-400 mb-1'>Password</label>
                <input 
                  type='password' 
                  value={adminCredentials.password || ''}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                  className='w-full p-3 bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500'
                  required
                />
              </div>
              <button 
                type='submit' 
                className='mt-2 py-3 px-6 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700 shadow-md shadow-red-900/50 hover:-translate-y-0.5 transition duration-300'
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='space-y-6'>
            {allOrders.length === 0 ? (
              <div className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 p-10 text-center'>
                <p className='text-slate-400'>No orders have been placed yet.</p>
              </div>
            ) : (
              allOrders.map(order => (
                <div key={order.id} className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden'>
                  <div className='bg-slate-900/50 p-4 px-6 border-b border-slate-700 flex justify-between items-center flex-wrap gap-4'>
                    <div>
                      <p className='text-xs text-slate-400 uppercase font-bold tracking-wider'>Customer</p>
                      <p className='text-sm text-slate-100 font-medium'>{order.userEmail}</p>
                    </div>
                    <div>
                      <p className='text-xs text-slate-400 uppercase font-bold tracking-wider'>Order Placed</p>
                      <p className='text-sm text-slate-100 font-medium'>{order.date}</p>
                    </div>
                    <div>
                      <p className='text-xs text-slate-400 uppercase font-bold tracking-wider'>Total</p>
                      <p className='text-sm font-bold text-cyan-400'>₹{order.total}</p>
                    </div>
                    <div>
                      <p className='text-xs text-slate-400 uppercase font-bold tracking-wider mb-1'>Status</p>
                      <select 
                        value={order.status}
                        onChange={(e) => handleOrderStatusChange(order.id, order.userEmail, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded outline-none border cursor-pointer ${
                          order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' : 
                          order.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                          'bg-orange-50 text-orange-700 border-orange-200'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className='p-4'>
                    <p className='text-sm font-bold text-slate-300 mb-2'>Items ({order.items.length}):</p>
                    <div className='flex flex-wrap gap-2'>
                      {order.items.map(item => (
                        <span key={item.id} className='bg-slate-900 text-slate-300 px-3 py-1 rounded-full text-xs border border-slate-700'>
                          {item.quantity}x {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin