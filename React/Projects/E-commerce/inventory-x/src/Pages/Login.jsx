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
    <div className='min-h-[calc(100vh-72px)] flex justify-center items-center bg-gray-50'>
      <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-8'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <h1 className='text-center font-bold text-3xl mb-4 text-gray-800'>Login</h1>

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
            className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8cb46] transition'
          />

          <input 
            type="password" 
            name='password' 
            value={loginData.password} 
            onChange={inputChange} 
            placeholder='Password' 
            className='p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f8cb46] transition'
          />

          <button 
            type="submit" 
            className='mt-2 p-3 rounded-lg bg-[#f8cb46] font-bold text-gray-800 hover:bg-[#e5bb3d] transition duration-300'
          >
            Login
          </button>
          
          <p className="text-center text-gray-600 mt-2">
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login