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
    <div className='min-h-screen bg-transparent'>
      {/* Hero Section */}
      <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 py-20 px-8 mb-10 shadow-2xl relative overflow-hidden'>
        <div className='max-w-7xl mx-auto text-center md:text-left relative z-10'>
          <h1 className='text-5xl md:text-6xl font-black text-slate-100 mb-6 tracking-tighter leading-tight'>
            The realms delivered in <span className='text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]'>minutes.</span>
          </h1>
          <p className='text-xl md:text-2xl font-medium text-slate-300 max-w-2xl'>
            Get premium products, everyday essentials, and exactly what you need to survive Fimbulwinter.
          </p>
        </div>
      </div>

      {/* Product Sections */}
      <div className='max-w-7xl mx-auto px-8 pb-20'>
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)]'></div>
          </div>
        ) : Object.keys(categories).length === 0 ? (
          <div className='text-center py-20 text-gray-500 font-bold'>No products found.</div>
        ) : (
          Object.keys(categories).map(category => (
            <div key={category} className='mb-12'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-2xl font-black text-slate-100 capitalize tracking-tight'>
                  {category.replace('-', ' ')} Collection
                </h2>
              </div>

              <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 pb-4'>
                {categories[category].map((product) => (
                  <div key={product.id} className='flex'>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer minimal */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-slate-500 font-medium">
        <p>© 2026 InventoryX - Built with React & Vite</p>
      </footer>
    </div>
  )
}

export default Home