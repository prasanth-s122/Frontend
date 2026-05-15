import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateProductStock, currentUser, products, addToCart, decreaseQuantity } = useContext(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    }
  }, [currentUser, navigate])

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!")
      return
    }

    // Validate stock against current products in AppContext
    // This handles the case where admin updated stock while item was in cart
    const outOfStockItems = [];
    cart.forEach(item => {
      const currentProduct = products.find(p => p.id === item.id);
      if (currentProduct && item.quantity > currentProduct.stock) {
        outOfStockItems.push(`${item.name} (Max available: ${currentProduct.stock})`);
      }
    });

    if (outOfStockItems.length > 0) {
      toast.error(`Cannot checkout! The following items exceed available stock:\n\n${outOfStockItems.join('\n')}\n\nPlease adjust your cart.`);
      return;
    }

    // Proceed to checkout page
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-[calc(100vh-72px)] flex flex-col justify-center items-center bg-transparent'>
        <h1 className='text-3xl font-black text-slate-100 uppercase tracking-wider mb-4'>Your Cart is Empty</h1>
        <p className='text-slate-400 mb-6'>Looks like you haven't added anything yet.</p>
        <button 
          onClick={() => navigate('/')} 
          className='px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md shadow-red-900/50 hover:-translate-y-0.5'
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='min-h-[calc(100vh-72px)] bg-transparent p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-black text-slate-100 uppercase tracking-wider mb-8'>Your Cart</h1>

        <div className='bg-slate-800 rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 overflow-hidden'>
          <ul className='divide-y divide-slate-700'>
            {cart.map((item) => (
              <li key={item.id} className='p-6 flex items-center justify-between hover:bg-slate-700/50 transition'>
                <div className='flex items-center gap-6'>
                  <div className='h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center p-2'>
                    <img src={item.image} alt={item.name} className='max-h-full object-contain mix-blend-multiply' />
                  </div>
                  <div>
                    <h2 className='text-lg font-bold text-slate-100'>{item.name}</h2>
                    <p className='text-slate-400 text-sm'>₹{item.price} each</p>
                    
                    <div className='flex items-center gap-3 mt-2'>
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className='w-8 h-8 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-full font-bold text-slate-200 transition'
                      >
                        -
                      </button>
                      <span className='font-bold text-slate-100 w-4 text-center'>{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className='w-8 h-8 flex items-center justify-center bg-slate-700 hover:bg-slate-600 rounded-full font-bold text-slate-200 transition'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-8'>
                  <p className='text-xl font-bold text-cyan-400'>₹{item.price * item.quantity}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className='text-red-400 hover:text-red-300 font-semibold p-2 rounded-lg hover:bg-red-950/30 transition'
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className='bg-slate-900/50 p-6 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4'>
            <div>
              <p className='text-slate-400 text-sm mb-1'>Total Amount</p>
              <h2 className='text-3xl font-black text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]'>₹{totalAmount}</h2>
            </div>
            <button 
              onClick={handleCheckout}
              className='w-full md:w-auto px-10 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-md shadow-red-900/50 hover:shadow-red-900/80 transition hover:-translate-y-0.5'
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