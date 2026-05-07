import React from 'react'

const ProductCard = ({ product, onAddToCart }) => {
  const { id, title, category, price, thumbnail, images, rating, stock } = product

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden w-56 cursor-pointer group">

      {/* Image */}
      <div className="relative bg-zinc-100 h-44 overflow-hidden">
        <img
          src={images?.[0] || thumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "https://placehold.co/224x176?text=No+Image"
          }}
        />
        {stock <= 5 && stock > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            Only {stock} left!
          </span>
        )}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3 flex-1">
        <span className="text-xs text-amber-500 font-semibold uppercase tracking-wide">{category}</span>
        <h2 className="text-sm font-bold text-zinc-800 leading-tight line-clamp-2">{title}</h2>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1,2,3,4,5].map((star) => (
              <svg key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-zinc-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-zinc-400">({rating})</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-base font-black text-zinc-900">₹{(price * 83).toFixed(0)}</span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={stock === 0}
            className="bg-zinc-900 hover:bg-amber-400 hover:text-zinc-900 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Cart
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard