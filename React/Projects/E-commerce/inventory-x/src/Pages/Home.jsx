import React, { useEffect, useState, useMemo } from 'react'
import Navbar from '../Components/Navbar'
import ProductCard from '../Pages/ProductCard'

// All dummyjson categories grouped by section
const CATEGORY_SECTIONS = [
  {
    section: '📱 Electronics',
    categories: ['smartphones', 'laptops', 'tablets', 'mobile-accessories'],
  },
  {
    section: '👗 Fashion',
    categories: ['mens-shirts', 'womens-dresses', 'womens-tops', 'tops'],
  },
  {
    section: '👟 Footwear',
    categories: ['mens-shoes', 'womens-shoes', 'womens-bags'],
  },
  {
    section: '⌚ Accessories',
    categories: ['mens-watches', 'womens-watches', 'womens-jewellery', 'sunglasses'],
  },
  {
    section: '💄 Beauty & Care',
    categories: ['beauty', 'fragrances', 'skin-care'],
  },
  {
    section: '🏠 Home & Living',
    categories: ['furniture', 'home-decoration', 'kitchen-accessories'],
  },
  {
    section: '🛒 Grocery',
    categories: ['groceries'],
  },
  {
    section: '🚗 Vehicles',
    categories: ['vehicle', 'motorcycle'],
  },
  {
    section: '🏋️ Sports',
    categories: ['sports-accessories'],
  },
]

const HERO_SLIDES = [
  {
    title: 'New Season Arrivals',
    subtitle: 'Shop the latest electronics, fashion & more',
    bg: 'from-zinc-900 to-zinc-700',
    accent: 'text-amber-400',
    emoji: '⚡',
  },
  {
    title: 'Big Summer Sale',
    subtitle: 'Up to 50% off on top brands',
    bg: 'from-amber-600 to-orange-500',
    accent: 'text-white',
    emoji: '🔥',
  },
  {
    title: 'Premium Collection',
    subtitle: 'Luxury watches, jewellery & accessories',
    bg: 'from-zinc-800 to-slate-900',
    accent: 'text-amber-300',
    emoji: '💎',
  },
]

const Home = () => {
  const [allProducts, setAllProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [heroIndex, setHeroIndex] = useState(0)
  const [toast, setToast] = useState(null)

  // Fetch all products (with pagination to get all 194)
  useEffect(() => {
    const fetchData = async () => {
      const cached = localStorage.getItem('InventoryX_Products')
      if (cached) {
        setAllProducts(JSON.parse(cached))
        setLoading(false)
        return
      }
      try {
        const res = await fetch('https://dummyjson.com/products?limit=194&skip=0')
        const json = await res.json()
        localStorage.setItem('InventoryX_Products', JSON.stringify(json.products))
        setAllProducts(json.products)
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()

    // Load cart from localStorage
    const savedCart = localStorage.getItem('InventoryX_Cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  // Auto-advance hero
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_SLIDES.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Add to cart
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      const updated = exists
        ? prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
        : [...prev, { ...product, qty: 1 }]
      localStorage.setItem('InventoryX_Cart', JSON.stringify(updated))
      return updated
    })
    setToast(`"${product.title.slice(0, 30)}..." added to cart!`)
    setTimeout(() => setToast(null), 2500)
  }

  const cartCount = cart.reduce((sum, p) => sum + p.qty, 0)

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCategory = activeCategory === 'All' || p.category === activeCategory
      return matchSearch && matchCategory
    })
  }, [allProducts, searchQuery, activeCategory])

  // Get unique categories for filter bar
  const allCategories = useMemo(() => {
    const cats = [...new Set(allProducts.map((p) => p.category))]
    return ['All', ...cats]
  }, [allProducts])

  // Group filtered products by section
  const groupedProducts = useMemo(() => {
    if (searchQuery || activeCategory !== 'All') {
      return [{ section: activeCategory === 'All' ? `Search: "${searchQuery}"` : activeCategory, products: filteredProducts }]
    }
    return CATEGORY_SECTIONS.map((sec) => ({
      section: sec.section,
      products: allProducts.filter((p) => sec.categories.includes(p.category)),
    })).filter((sec) => sec.products.length > 0)
  }, [allProducts, filteredProducts, searchQuery, activeCategory])

  const hero = HERO_SLIDES[heroIndex]

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">

      {/* Navbar */}
      <Navbar cartCount={cartCount} onSearch={setSearchQuery} />

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white text-sm font-medium px-5 py-3 rounded-full shadow-xl animate-bounce">
          🛒 {toast}
        </div>
      )}

      {/* Hero Banner */}
      {!searchQuery && activeCategory === 'All' && (
        <div className={`bg-gradient-to-r ${hero.bg} transition-all duration-700`}>
          <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center text-center gap-4">
            <span className="text-6xl">{hero.emoji}</span>
            <h1 className={`text-4xl md:text-5xl font-black text-white`}>
              {hero.title}
            </h1>
            <p className={`text-lg ${hero.accent} font-medium`}>{hero.subtitle}</p>
            <button
              onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 bg-amber-400 text-zinc-900 font-bold px-8 py-3 rounded-full hover:bg-amber-300 transition text-sm"
            >
              Shop Now →
            </button>
            {/* Dots */}
            <div className="flex gap-2 mt-2">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === heroIndex ? 'bg-amber-400 w-5' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category Filter Bar */}
      <div id="products-section" className="sticky top-14 z-40 bg-white border-b border-zinc-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-medium">Loading products...</p>
        </div>
      )}

      {/* Products by Section */}
      {!loading && (
        <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-12">
          {groupedProducts.map((sec) =>
            sec.products.length > 0 ? (
              <section key={sec.section}>
                {/* Section Header */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-black text-zinc-800">{sec.section}</h2>
                  <span className="text-xs text-zinc-400 font-medium">{sec.products.length} items</span>
                </div>

                {/* Product Cards */}
                <div className="flex flex-wrap gap-5 justify-start">
                  {sec.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </section>
            ) : null
          )}

          {/* No results */}
          {groupedProducts.every((s) => s.products.length === 0) && (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <span className="text-5xl">🔍</span>
              <h2 className="text-xl font-bold text-zinc-700">No products found</h2>
              <p className="text-zinc-400 text-sm">Try a different search or category</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All') }}
                className="mt-2 bg-zinc-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-amber-400 hover:text-zinc-900 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 text-center text-xs py-6 mt-10">
        © 2025 <span className="text-amber-400 font-bold">InventoryX</span> — All rights reserved.
      </footer>

    </div>
  )
}

export default Home