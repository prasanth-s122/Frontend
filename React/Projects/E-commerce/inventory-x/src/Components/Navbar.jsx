import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ cartCount = 0, onSearch }) => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(query)
  }

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">

        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-white">
          INVENTORY<span className="text-amber-400">X</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2 gap-2 border border-zinc-700 focus-within:border-amber-400 transition">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm text-white placeholder-zinc-400 outline-none w-full"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                if (onSearch) onSearch(e.target.value)
              }}
            />
          </div>
        </form>

        {/* Nav Links */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <Link to="/" className="hover:text-amber-400 transition">Home</Link>
          <Link to="/login" className="hover:text-amber-400 transition">Login</Link>
          <Link to="/cart" className="relative hover:text-amber-400 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13H5.4M10 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-zinc-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar