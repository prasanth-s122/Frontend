import React, { useContext } from 'react'
import ProductCard from '../Components/ProductCard'
import { AppContext } from '../Context/AppContext'

const Home = () => {
  const { products, loading, searchQuery, selectedCategory } = useContext(AppContext)

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group filtered products by category
  const categories = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {})

  return (
    <div className='min-h-screen bg-[#f4f6f9]'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-yellow-300 via-[#f8cb46] to-yellow-400 py-12 px-8 mb-8 shadow-sm'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-5xl font-black text-gray-900 mb-4 tracking-tighter'>
            Groceries delivered in <span className='text-white drop-shadow-md'>minutes.</span>
          </h1>
          <p className='text-xl font-bold text-gray-800 max-w-lg'>
            Get everything you need, exactly when you need it. Fast, fresh, and at your doorstep.
          </p>
        </div>
      </div>

      {/* Product Sections */}
      <div className='max-w-7xl mx-auto px-8 pb-20'>
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#f8cb46]'></div>
          </div>
        ) : Object.keys(categories).length === 0 ? (
          <div className='text-center py-20 text-gray-500 font-bold'>No products found.</div>
        ) : (
          Object.keys(categories).map(category => (
            <div key={category} className='mb-12'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-black text-gray-800 capitalize tracking-tight'>
                  {category.replace('-', ' ')} Collection
                </h2>
              </div>

              <div className='flex flex-wrap gap-6 pb-4 justify-center sm:justify-start'>
                {categories[category].map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer minimal */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-500 font-medium">
        <p>© 2026 InventoryX - Built with React & Vite</p>
      </footer>
    </div>
  )
}

export default Home