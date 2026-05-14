import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addToCart, currentUser, cart } = useContext(AppContext)
  const navigate = useNavigate()

  const cartItem = cart.find(item => item.id === product.id);
  const cartQuantity = cartItem ? cartItem.quantity : 0;
  const availableStock = product.stock - cartQuantity;
  const isMaxReached = availableStock <= 0;

  const handleCart = () => {
    if (!currentUser) {
      alert("Please login to add items to cart")
      navigate("/login")
      return
    }

    if (availableStock <= 0) {
      toast.error("Product out of stock!")
      return
    }

    const success = addToCart(product)
    if (success) {
      toast.success(`${product.name} added to cart!`)
    }
  }

  return (
    <div className='bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition duration-300 w-64 rounded-2xl p-4 flex flex-col shadow-sm relative'>
      {availableStock > 0 ? (
        <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full z-10 ${
          availableStock <= 5 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-700'
        }`}>
          {availableStock} in stock
        </span>
      ) : (
        <span className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full z-10">
          Out of Stock
        </span>
      )}

      <div className="bg-gray-50 rounded-xl p-2 mb-4 h-40 flex justify-center items-center">
        <img
          className='max-h-full max-w-full object-contain'
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h1 className='text-sm text-gray-500 font-medium uppercase tracking-wider mb-1'>
            {product.category}
          </h1>
          <h1 className='text-md font-semibold text-gray-800 leading-tight mb-2'>
            {product.name}
          </h1>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className='text-xl font-bold text-gray-900'>
              ₹{product.price}
            </h1>
          </div>

          <button
            onClick={handleCart}
            disabled={isMaxReached}
            className={`w-full py-2.5 rounded-xl font-bold transition-all duration-300 ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : isMaxReached 
                  ? 'bg-orange-200 text-orange-600 cursor-not-allowed'
                  : 'bg-[#f8cb46] text-gray-800 hover:bg-[#e5bb3d] shadow-sm'
            }`}
          >
            {product.stock === 0 ? 'Out of Stock' : isMaxReached ? 'Max Limit Reached' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard