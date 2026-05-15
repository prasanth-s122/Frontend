import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AppContext)

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const [message, setMessage] = useState({ type: '', text: '' })

  const inputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
    if (message.text) setMessage({ type: '', text: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!loginData.email || !loginData.password) {
      setMessage({ type: 'error', text: 'Please enter both email and password' })
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    
    const user = users.find(u => u.email === loginData.email && u.password === loginData.password)

    if (user) {
      login(user) // Update global state
      
      if (user.role === 'admin') {
        navigate("/admin")
      } else {
        navigate("/")
      }
    } else {
      setMessage({ type: 'error', text: 'Invalid Email or Password' })
    }
  }

  return (
    <div className='min-h-[calc(100vh-72px)] flex justify-center items-center bg-transparent relative'>
      <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/stardust.png")] opacity-5 pointer-events-none'></div>
      <div className='w-full max-w-md bg-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 rounded-2xl p-8 relative z-10'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <h1 className='text-center font-black text-3xl mb-4 text-slate-100 uppercase tracking-wider'>Login</h1>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm font-bold ${message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {message.text}
            </div>
          )}

          <input 
            type="email" 
            name='email' 
            value={loginData.email} 
            onChange={inputChange} 
            placeholder='Email Address' 
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <input 
            type="password" 
            name='password' 
            value={loginData.password} 
            onChange={inputChange} 
            placeholder='Password' 
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <button 
            type="submit" 
            className='mt-2 p-3 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700 shadow-md shadow-red-900/50 hover:-translate-y-0.5 transition duration-300'
          >
            Login
          </button>
          
          <p className="text-center text-slate-400 mt-2">
            Don't have an account? <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login