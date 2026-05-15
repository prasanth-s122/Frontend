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
    <div className='min-h-[calc(100vh-72px)] bg-transparent p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-black text-slate-100 uppercase tracking-wider mb-8'>Your Orders</h1>

        {orders.length === 0 ? (
          <div className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 p-10 text-center'>
            <h2 className='text-xl text-slate-400 font-medium mb-4'>You haven't placed any orders yet.</h2>
            <button 
              onClick={() => navigate('/')} 
              className='px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md shadow-red-900/50 hover:-translate-y-0.5'
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order) => (
              <div key={order.id} className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden'>
                <div className='bg-slate-900/50 p-4 px-6 border-b border-slate-700 flex justify-between items-center flex-wrap gap-4'>
                  <div>
                    <p className='text-xs text-slate-400 uppercase font-bold tracking-wider'>Order Placed</p>
                    <p className='text-sm text-slate-100 font-medium'>{order.date}</p>
                  </div>
                  <div>
                    <p className='text-xs text-slate-400 uppercase font-bold tracking-wider'>Total</p>
                    <p className='text-sm font-bold text-cyan-400'>₹{order.total}</p>
                  </div>
                  <div>
                    <p className='text-xs text-slate-400 uppercase font-bold tracking-wider'>Order #</p>
                    <p className='text-sm text-slate-500'>{order.id}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      order.status === 'Delivered' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 
                      order.status === 'Cancelled' ? 'bg-red-900/30 text-red-400 border border-red-500/30' : 
                      'bg-orange-900/30 text-orange-400 border border-orange-500/30'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {order.deliveryAddress && (
                  <div className='px-6 py-3 bg-slate-900 border-b border-slate-700 text-sm'>
                    <p className='text-xs text-slate-400 uppercase font-bold tracking-wider mb-1'>Delivery Address</p>
                    <p className='text-slate-100 font-medium'>{order.deliveryAddress}</p>
                  </div>
                )}

                <div className='p-6'>
                  <ul className='divide-y divide-slate-700'>
                    {order.items.map((item) => (
                      <li key={item.id} className='py-4 flex items-center gap-4'>
                        <div className='h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center p-2'>
                          <img src={item.image} alt={item.name} className='max-h-full object-contain mix-blend-multiply' />
                        </div>
                        <div className='flex-grow'>
                          <h3 className='text-md font-bold text-slate-100'>{item.name}</h3>
                          <p className='text-slate-400 text-sm'>Qty: {item.quantity}</p>
                        </div>
                        <div>
                          <p className='font-bold text-cyan-400'>₹{item.price * item.quantity}</p>
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
