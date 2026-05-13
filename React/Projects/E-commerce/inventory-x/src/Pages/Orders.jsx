import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Orders = () => {
  const { currentUser } = useContext(AppContext)
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }

    const fetchOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || []
      setOrders(storedOrders.reverse()) // Show newest first
    }

    fetchOrders()
  }, [currentUser, navigate])

  if (!currentUser) return null

  return (
    <div className='min-h-[calc(100vh-72px)] bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>Your Orders</h1>

        {orders.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-sm p-10 text-center'>
            <h2 className='text-xl text-gray-600 font-medium mb-4'>You haven't placed any orders yet.</h2>
            <button 
              onClick={() => navigate('/')} 
              className='px-6 py-3 bg-[#f8cb46] text-gray-800 font-bold rounded-lg hover:bg-[#e5bb3d] transition'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order) => (
              <div key={order.id} className='bg-white rounded-2xl shadow-sm overflow-hidden'>
                <div className='bg-gray-100 p-4 px-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4'>
                  <div>
                    <p className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Order Placed</p>
                    <p className='text-sm text-gray-800 font-medium'>{order.date}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Total</p>
                    <p className='text-sm font-bold text-gray-900'>₹{order.total}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500 uppercase font-bold tracking-wider'>Order #</p>
                    <p className='text-sm text-gray-600'>{order.id}</p>
                  </div>
                  <div>
                    <span className='px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider'>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className='p-6'>
                  <ul className='divide-y divide-gray-100'>
                    {order.items.map((item) => (
                      <li key={item.id} className='py-4 flex items-center gap-4'>
                        <div className='h-16 w-16 bg-gray-50 rounded-lg flex items-center justify-center p-2'>
                          <img src={item.image} alt={item.name} className='max-h-full object-contain' />
                        </div>
                        <div className='flex-grow'>
                          <h3 className='text-md font-bold text-gray-800'>{item.name}</h3>
                          <p className='text-gray-500 text-sm'>Qty: {item.quantity}</p>
                        </div>
                        <div>
                          <p className='font-bold text-gray-900'>₹{item.price * item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
