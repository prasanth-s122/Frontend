import React from 'react'
import { addToCart } from '../Services/cartService'

const ProductCard = ({ product }) => {

  const handleCart = () => {

    addToCart(product)

    alert("Product Added To Cart")

  }

  return (

    <div
      className='bg-gray-200 hover:bg-blue-200 hover:scale-105 transition duration-700 w-56 rounded-2xl p-4 flex flex-col items-center shadow-lg'
    >

      <img
        className='rounded-3xl h-36 w-full object-contain'
        src={product.image}
        alt={product.name}
      />

      <h1 className='uppercase text-center text-lg font-bold mt-4'>
        {product.name}
      </h1>

      <h1 className='uppercase text-sm text-gray-600 mt-2'>
        {product.category}
      </h1>

      <h1 className='uppercase text-green-500 text-lg font-bold mt-2'>
        ₹ {product.price}
      </h1>

      <h1 className='text-sm mt-2'>
        Stock: {product.stock}
      </h1>

      <button
        onClick={handleCart}
        className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition w-full mt-5'
      >
        Add to Cart
      </button>

    </div>

  )
}

export default ProductCard