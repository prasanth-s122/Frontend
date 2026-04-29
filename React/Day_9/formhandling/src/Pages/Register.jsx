import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import banner from '../assets/Rbanner.jpg'

const Register = () => {
  
  const navigate = useNavigate()

  const [registerData , setRegisterData] = useState({name : "" , email : "" , password : "" , mobile : "" , age : ""})
  
  const inputChange = (e) => {

        setRegisterData ({...registerData , [ e.target.name ] : e.target.value  })

  }
  
  const handleSubmit = (e) => {
    
    e.preventDefault()
    
    if(!registerData.name && !registerData.email && !registerData.password && !registerData.mobile && !registerData.age){
      
      alert ("Fill the form")

    }else{
      
      localStorage.setItem("User Data" , JSON.stringify(registerData) )

      
      alert ("Sucessfully Registered 😊") 
      

      setRegisterData({name : "" , email : "" , password : "" , mobile : "" , age : ""})

      navigate("/login")

    }
  }
  
  
  return (
    <>
    
        <div className='h-screen flex justify-center items-center'>
          
          <div className='w-200 border flex justify-between items-center rounded-lg'>

              <div >
                  <img src={banner} className='w-100 p-3 rounded-3xl' alt="" /> 
              </div>

              <div>
                    <form onSubmit={handleSubmit} className=' flex flex-col gap-3 p-5'>
                          <h1 className='text-center font-semibold'>Register</h1>
                          <input type="text"      name='name'       value={registerData.name}       onChange={inputChange} placeholder='Enter the name'  className='p-3 border rounded-lg ' />
                          <input type="email"     name='email'      value={registerData.email}      onChange={inputChange} placeholder='Enter email '  className='p-3 border rounded-lg '/>
                          <input type="password"  name='password'   value={registerData.password}   onChange={inputChange} placeholder='Set password'  className='p-3 border rounded-lg '/>
                          <input type="tel"       name='mobile'     value={registerData.mobile}     onChange={inputChange} placeholder='Enter Mobile number' className='p-3 border rounded-lg '/>
                          <input type="number"    name='age'        value={registerData.age}        onChange={inputChange} placeholder='Enter your Age' min={18} max={150} className='p-3 border rounded-lg ' />
                          <input type="submit" value="Register" className='p-3 border rounded-lg bg-blue-300 hover:bg-blue-600 hover:text-white cursor-pointer '/>

                    </form>
              </div>

          </div>
        </div>
    
    </>
  )
}

export default Register