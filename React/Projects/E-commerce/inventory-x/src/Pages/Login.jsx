import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  })

  const inputChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    if (
      !loginData.email ||
      !loginData.password
    ) {

      alert("Fill the form")

      return
    }

    const storedUser = JSON.parse(
      localStorage.getItem("User Data")
    )

    if (
      storedUser.email === loginData.email &&
      storedUser.password === loginData.password
    ) {

      alert("Login Successful 😊")

      navigate("/")

    } else {

      alert("Invalid Email or Password")

    }

  }

  return (

    <div className='h-screen flex justify-center items-center bg-gray-100'>

      <div className='w-150  bg-white shadow-xl flex justify-center items-center rounded-lg '>

        <div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-5 w-100'>

            <h1 className='text-center font-semibold text-2xl mb-3'>Login</h1>

            <input type="email" name='email' value={loginData.email} onChange={inputChange} placeholder='Enter email' className=' p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>

            <input type="password" name='password' value={loginData.password} onChange={inputChange} placeholder='Enter password' className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>

            <input type="submit" value="Login" className='p-3 border rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer'/>

          </form>

        </div>

      </div>

    </div>

  )
}

export default Login