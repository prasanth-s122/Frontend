import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: ""
  })

  const [message, setMessage] = useState({ type: '', text: '' })

  const inputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })
    // Clear message on type
    if (message.text) setMessage({ type: '', text: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.mobile ||
      !registerData.age
    ) {
      setMessage({ type: 'error', text: 'Please fill all the fields' })
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []

    const userExists = users.some(u => u.email === registerData.email)

    if (userExists) {
      setMessage({ type: 'error', text: 'User with this email already exists!' })
      return
    }

    const newUser = {
      ...registerData,
      role: 'user'
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    setMessage({ type: 'success', text: 'Successfully Registered 😊 Redirecting...' })
    
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  return (
    <div className='min-h-[calc(100vh-72px)] flex justify-center items-center bg-transparent relative'>
      <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/stardust.png")] opacity-5 pointer-events-none'></div>
      <div className='w-full max-w-md bg-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 rounded-2xl p-8 relative z-10'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <h1 className='text-center font-black text-3xl mb-4 text-slate-100 uppercase tracking-wider'>
            Create Account
          </h1>

          {message.text && (
            <div className={`p-3 rounded-lg text-sm font-bold ${message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {message.text}
            </div>
          )}

          <input
            type="text"
            name='name'
            value={registerData.name}
            onChange={inputChange}
            placeholder='Full Name'
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <input
            type="email"
            name='email'
            value={registerData.email}
            onChange={inputChange}
            placeholder='Email Address'
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <input
            type="password"
            name='password'
            value={registerData.password}
            onChange={inputChange}
            placeholder='Password'
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <input
            type="tel"
            name='mobile'
            value={registerData.mobile}
            onChange={inputChange}
            placeholder='Mobile Number'
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <input
            type="number"
            name='age'
            value={registerData.age}
            onChange={inputChange}
            placeholder='Age'
            min={18}
            max={150}
            className='p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
          />

          <button
            type="submit"
            className='mt-4 p-3 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700 shadow-md shadow-red-900/50 hover:-translate-y-0.5 transition duration-300'
          >
            Register
          </button>

          <p className="text-center text-slate-400 mt-2">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition">Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register