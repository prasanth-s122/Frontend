import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Admin = () => {
  const { currentUser, products, updateProductStock } = useContext(AppContext)
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('products')
  const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/')
      return
    }

    const orders = JSON.parse(localStorage.getItem('all_orders')) || []
    setAllOrders([...orders].reverse())
  }, [currentUser, navigate])

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
    <div className='min-h-[calc(100vh-72px)] bg-gray-50 p-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>Admin Dashboard</h1>
          <div className='flex gap-4'>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'products' ? 'bg-[#f8cb46] text-gray-900 shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              Manage Stock
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-lg font-bold transition ${activeTab === 'orders' ? 'bg-[#f8cb46] text-gray-900 shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              All Orders
            </button>
          </div>
        </div>

        {activeTab === 'products' && (
          <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
            <table className='w-full text-left'>
              <thead className='bg-gray-100 text-gray-600 uppercase text-sm font-bold'>
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
                  <tr key={product.id} className='hover:bg-gray-50 transition'>
                    <td className='p-4 flex items-center gap-4'>
                      <img src={product.image} alt={product.name} className='h-12 w-12 object-contain bg-gray-100 rounded-md p-1' />
                      <span className='font-bold text-gray-800'>{product.name}</span>
                    </td>
                    <td className='p-4 text-gray-600 uppercase text-xs font-bold tracking-wide'>{product.category}</td>
                    <td className='p-4 font-bold text-gray-900'>₹{product.price}</td>
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
                        className='w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8cb46]'
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className='space-y-6'>
            {allOrders.length === 0 ? (
              <div className='bg-white rounded-2xl shadow-sm p-10 text-center'>
                <p className='text-gray-500'>No orders have been placed yet.</p>
              </div>
            ) : (
              allOrders.map(order => (
                <div key={order.id} className='bg-white rounded-2xl shadow-sm overflow-hidden'>
                  <div className='bg-gray-100 p-4 px-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4'>
                    <div>
                      <p className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Customer</p>
                      <p className='text-sm text-gray-800 font-medium'>{order.userEmail}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Order Placed</p>
                      <p className='text-sm text-gray-800 font-medium'>{order.date}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Total</p>
                      <p className='text-sm font-bold text-gray-900'>₹{order.total}</p>
                    </div>
                    <div>
                      <p className='text-xs text-gray-500 uppercase font-bold tracking-wider mb-1'>Status</p>
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
                    <p className='text-sm font-bold text-gray-700 mb-2'>Items ({order.items.length}):</p>
                    <div className='flex flex-wrap gap-2'>
                      {order.items.map(item => (
                        <span key={item.id} className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs'>
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