import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    age: ""
  })

  const inputChange = (e) => {

    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    })

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

      alert("Fill the form")

      return
    }

    localStorage.setItem(
      "User Data",
      JSON.stringify(registerData)
    )

    alert("Successfully Registered 😊")

    setRegisterData({
      name: "",
      email: "",
      password: "",
      mobile: "",
      age: ""
    })

    navigate("/login")

  }

  return (

    <div className='h-screen flex justify-center items-center bg-gray-100'>

      <div className='w-200 bg-white shadow-xl flex justify-center items-center rounded-lg'>

        <div>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3 p-5 w-100'
          >

            <h1 className='text-center font-semibold text-2xl mb-3'>
              Register
            </h1>

            <input
              type="text"
              name='name'
              value={registerData.name}
              onChange={inputChange}
              placeholder='Enter the name'
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input
              type="email"
              name='email'
              value={registerData.email}
              onChange={inputChange}
              placeholder='Enter email'
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input
              type="password"
              name='password'
              value={registerData.password}
              onChange={inputChange}
              placeholder='Set password'
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input
              type="tel"
              name='mobile'
              value={registerData.mobile}
              onChange={inputChange}
              placeholder='Enter Mobile number'
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input
              type="number"
              name='age'
              value={registerData.age}
              onChange={inputChange}
              placeholder='Enter your Age'
              min={18}
              max={150}
              className='p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
            />

            <input
              type="submit"
              value="Register"
              className='p-3 border rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer'
            />

          </form>

        </div>

      </div>

    </div>

  )
}

export default Register