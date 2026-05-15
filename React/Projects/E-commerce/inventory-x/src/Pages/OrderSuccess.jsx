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
    <div className='min-h-[calc(100vh-72px)] bg-transparent flex items-center justify-center p-8 relative'>
      <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/stardust.png")] opacity-5 pointer-events-none'></div>
      <div className='max-w-md w-full bg-slate-800 rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 p-10 text-center transform transition-all relative z-10'>
        <div className='w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]'>
          <span className='text-5xl'>🪓</span>
        </div>
        
        <h1 className='text-3xl font-black text-slate-100 mb-4 uppercase tracking-wider'>Order Confirmed!</h1>
        <p className='text-slate-400 mb-8 font-medium'>
          Thank you for your purchase. The realms have received your order, and it is now being processed.
        </p>

        <div className='flex flex-col gap-4'>
          <button 
            onClick={() => navigate('/orders')}
            className='w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-md shadow-red-900/50 hover:-translate-y-0.5'
          >
            View Your Orders
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className='w-full py-4 bg-slate-700 text-slate-200 font-bold rounded-xl hover:bg-slate-600 transition border border-slate-600'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess
