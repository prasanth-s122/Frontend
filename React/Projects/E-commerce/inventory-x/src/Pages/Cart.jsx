import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateProductStock, currentUser } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Cart is empty!")
      return
    }

    // Reduce stock
    cart.forEach(item => {
      const newStock = item.stock - item.quantity
      updateProductStock(item.id, newStock)
    })

    // Save to Orders
    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || []
    
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: totalAmount,
      status: 'Processing'
    }

    orders.push(newOrder)
    localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders))

    // Save to All Orders (for admin)
    const allOrders = JSON.parse(localStorage.getItem('all_orders')) || []
    allOrders.push({ ...newOrder, userEmail: currentUser.email, userName: currentUser.name })
    localStorage.setItem('all_orders', JSON.stringify(allOrders))

    // Clear cart
    clearCart()

    alert("Order Placed Successfully! 🎉")
    navigate('/orders')
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-[calc(100vh-72px)] flex flex-col justify-center items-center bg-gray-50'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Your Cart is Empty</h1>
        <p className='text-gray-500 mb-6'>Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate('/')} 
          className='px-6 py-3 bg-[#f8cb46] text-gray-800 font-bold rounded-lg hover:bg-[#e5bb3d] transition'
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-72px)] bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>Your Cart</h1>

        <div className='bg-white rounded-2xl shadow-sm overflow-hidden'>
          <ul className='divide-y divide-gray-100'>
            {cart.map((item) => (
              <li key={item.id} className='p-6 flex items-center justify-between hover:bg-gray-50 transition'>
                <div className='flex items-center gap-6'>
                  <div className='h-20 w-20 bg-gray-100 rounded-lg flex items-center justify-center p-2'>
                    <img src={item.image} alt={item.name} className='max-h-full object-contain' />
                  </div>
                  <div>
                    <h2 className='text-lg font-bold text-gray-800'>{item.name}</h2>
                    <p className='text-gray-500 text-sm'>₹{item.price} x {item.quantity}</p>
                  </div>
                </div>
                <div className='flex items-center gap-8'>
                  <p className='text-xl font-bold text-gray-900'>₹{item.price * item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-500 hover:text-red-700 font-semibold p-2 rounded-lg hover:bg-red-50 transition'
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className='bg-gray-50 p-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4'>
            <div>
              <p className='text-gray-500 text-sm mb-1'>Total Amount</p>
              <h2 className='text-3xl font-bold text-gray-900'>₹{totalAmount}</h2>
            </div>
            <button 
              onClick={handleCheckout}
              className='w-full md:w-auto px-10 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart