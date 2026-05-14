import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const OrderSuccess = () => {
  const { currentUser } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  if (!currentUser) return null;

  return (
    <div className='min-h-[calc(100vh-72px)] bg-gray-50 flex items-center justify-center p-8'>
      <div className='max-w-md w-full bg-white rounded-3xl shadow-lg p-10 text-center transform transition-all'>
        <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <span className='text-5xl'>🎉</span>
        </div>
        
        <h1 className='text-3xl font-black text-gray-900 mb-4'>Order Confirmed!</h1>
        <p className='text-gray-600 mb-8 font-medium'>
          Thank you for your purchase. Your order has been successfully placed and is now being processed.
        </p>

        <div className='flex flex-col gap-4'>
          <button 
            onClick={() => navigate('/orders')}
            className='w-full py-4 bg-[#f8cb46] text-gray-900 font-bold rounded-xl hover:bg-[#e5bb3d] transition shadow-md hover:-translate-y-0.5'
          >
            View Your Orders
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className='w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
