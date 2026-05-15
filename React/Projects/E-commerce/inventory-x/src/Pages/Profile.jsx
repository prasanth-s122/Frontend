import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import toast from 'react-hot-toast'

const Profile = () => {
  const { currentUser, login } = useContext(AppContext)
  const navigate = useNavigate()

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: ""
  })

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    setProfileData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      password: currentUser.password || "",
      mobile: currentUser.mobile || "",
      age: currentUser.age || ""
    })
  }, [currentUser, navigate])

  const inputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()

    if (
      !profileData.name ||
      !profileData.email ||
      !profileData.password ||
      !profileData.mobile ||
      !profileData.age
    ) {
      toast.error('Please fill all the fields')
      return
    }

    const users = JSON.parse(localStorage.getItem('users')) || []
    
    // Check if new email already exists for another user
    const emailExists = users.some(u => u.email === profileData.email && u.email !== currentUser.email)
    if (emailExists) {
      toast.error('Email already in use by another account.')
      return
    }

    const updatedUsers = users.map(u => 
      u.email === currentUser.email ? { ...u, ...profileData } : u
    )
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    
    // Move orders and cart to new email if email changed
    if (currentUser.email !== profileData.email) {
      const userOrders = JSON.parse(localStorage.getItem(`orders_${currentUser.email}`)) || []
      const userCart = JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || []
      
      localStorage.setItem(`orders_${profileData.email}`, JSON.stringify(userOrders))
      localStorage.setItem(`cart_${profileData.email}`, JSON.stringify(userCart))
      
      localStorage.removeItem(`orders_${currentUser.email}`)
      localStorage.removeItem(`cart_${currentUser.email}`)
      
      // Update admin orders tracking
      const allOrders = JSON.parse(localStorage.getItem('all_orders')) || []
      const updatedAllOrders = allOrders.map(o => o.userEmail === currentUser.email ? { ...o, userEmail: profileData.email } : o)
      localStorage.setItem('all_orders', JSON.stringify(updatedAllOrders))
    }
    
    // Update current user session
    const updatedUser = { ...currentUser, ...profileData }
    login(updatedUser)
    
    toast.success('Profile updated successfully!')
  }

  if (!currentUser) return null

  return (
    <div className='min-h-[calc(100vh-72px)] flex justify-center items-center bg-transparent py-12 relative'>
      <div className='absolute inset-0 bg-[url("https://www.transparenttextures.com/patterns/stardust.png")] opacity-5 pointer-events-none'></div>
      <div className='w-full max-w-md bg-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-slate-700 rounded-2xl p-8 relative z-10'>
        <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
          <h1 className='text-center font-black text-3xl mb-4 text-slate-100 uppercase tracking-wider'>
            My Profile
          </h1>

          <div>
            <label className='block text-sm font-bold text-slate-400 mb-1'>Full Name</label>
            <input
              type="text"
              name='name'
              value={profileData.name}
              onChange={inputChange}
              placeholder='Full Name'
              className='w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-slate-400 mb-1'>Email Address</label>
            <input
              type="email"
              name='email'
              value={profileData.email}
              onChange={inputChange}
              placeholder='Email Address'
              className='w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-slate-400 mb-1'>Password</label>
            <input
              type="text"
              name='password'
              value={profileData.password}
              onChange={inputChange}
              placeholder='Password'
              className='w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-slate-400 mb-1'>Mobile Number</label>
            <input
              type="tel"
              name='mobile'
              value={profileData.mobile}
              onChange={inputChange}
              placeholder='Mobile Number'
              className='w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-slate-400 mb-1'>Age</label>
            <input
              type="number"
              name='age'
              value={profileData.age}
              onChange={inputChange}
              placeholder='Age'
              min={18}
              max={150}
              className='w-full p-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition'
            />
          </div>

          <button
            type="submit"
            className='mt-4 p-3 rounded-lg bg-red-600 font-bold text-white hover:bg-red-700 shadow-md shadow-red-900/50 hover:-translate-y-0.5 transition duration-300'
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
