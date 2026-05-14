import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const Checkout = () => {
  const { cart, clearCart, updateProductStock, currentUser, updateUserAddress, products } = useContext(AppContext)
  const navigate = useNavigate()
  
  const [address, setAddress] = useState(currentUser?.address || '')
  const [isEditingAddress, setIsEditingAddress] = useState(!currentUser?.address)

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    } else if (cart.length === 0) {
      navigate('/cart')
    }
  }, [currentUser, cart, navigate])

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please provide a delivery address.")
      return
    }

    // Double check stock
    const outOfStockItems = [];
    cart.forEach(item => {
      const currentProduct = products.find(p => p.id === item.id);
      if (currentProduct && item.quantity > currentProduct.stock) {
        outOfStockItems.push(`${item.name} (Max available: ${currentProduct.stock})`);
      }
    });

    if (outOfStockItems.length > 0) {
      alert(`Cannot checkout! The following items exceed available stock:\n\n${outOfStockItems.join('\n')}\n\nPlease adjust your cart.`);
      navigate('/cart')
      return;
    }

    // Save Address if updated
    if (address !== currentUser.address) {
      updateUserAddress(address)
    }

    // Reduce stock
    cart.forEach(item => {
      const currentProduct = products.find(p => p.id === item.id);
      const newStock = (currentProduct ? currentProduct.stock : item.stock) - item.quantity;
      updateProductStock(item.id, newStock);
    })

    // Save to Orders
    const orders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || []
    
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: totalAmount,
      status: 'Processing',
      deliveryAddress: address
    }

    orders.push(newOrder)
    localStorage.setItem(`orders_${currentUser.email}`, JSON.stringify(orders))

    // Save to All Orders (for admin)
    const allOrders = JSON.parse(localStorage.getItem('all_orders')) || []
    allOrders.push({ ...newOrder, userEmail: currentUser.email, userName: currentUser.name })
    localStorage.setItem('all_orders', JSON.stringify(allOrders))

    // Clear cart
    clearCart()

    toast.success("Order Placed Successfully! 🎉")
    navigate('/order-confirmed')
  }

  if (!currentUser || cart.length === 0) return null;

  return (
    <div className='min-h-[calc(100vh-72px)] bg-gray-50 p-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>Checkout</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          
          {/* Address Section */}
          <div className='bg-white rounded-2xl shadow-sm p-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Delivery Address</h2>
            
            {isEditingAddress ? (
              <div className='space-y-4'>
                <textarea
                  rows="4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address..."
                  className='w-full p-3 border border-gray-200 rounded-lg focus:ring-[#f8cb46] focus:border-[#f8cb46] outline-none transition'
                ></textarea>
                <button 
                  onClick={() => {
                    if (address.trim()) {
                      setIsEditingAddress(false);
                      updateUserAddress(address);
                    } else {
                      alert("Address cannot be empty");
                    }
                  }}
                  className='px-6 py-2 bg-[#1c9236] text-white font-bold rounded-lg hover:bg-[#167a2a] transition'
                >
                  Save Address
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                <p className='text-gray-600 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap border border-gray-100'>
                  {address}
                </p>
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className='text-sm text-[#f8cb46] hover:text-[#e5bb3d] font-bold transition'
                >
                  Edit Address
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className='bg-white rounded-2xl shadow-sm p-6 flex flex-col'>
            <h2 className='text-xl font-bold text-gray-800 mb-4'>Order Summary</h2>
            
            <div className='flex-1 overflow-y-auto max-h-64 mb-4 space-y-4 pr-2'>
              {cart.map((item) => (
                <div key={item.id} className='flex justify-between text-sm'>
                  <span className='text-gray-600'>{item.quantity}x {item.name}</span>
                  <span className='font-bold text-gray-900'>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className='border-t border-gray-100 pt-4 mb-6'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-600 font-bold'>Total Amount</span>
                <span className='text-2xl font-black text-gray-900'>₹{totalAmount}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={isEditingAddress || !address.trim()}
              className={`w-full py-4 rounded-xl font-bold transition shadow-md ${
                isEditingAddress || !address.trim() 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-[#f8cb46] text-gray-900 hover:bg-[#e5bb3d] hover:-translate-y-0.5'
              }`}
            >
              Confirm and Pay ₹{totalAmount}
            </button>
            {(isEditingAddress || !address.trim()) && (
              <p className='text-red-500 text-xs mt-2 text-center'>Please save a delivery address to proceed.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Checkout
