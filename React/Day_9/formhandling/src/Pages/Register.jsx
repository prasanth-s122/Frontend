import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    
        <div>
          
          <div>

              <div>

              </div>

              <div>
                    <form onSubmit={handleSubmit}>

                          <input type="text"      name='name'       value={registerData.name}       onChange={inputChange} placeholder='Enter the name' />
                          <input type="email"     name='email'      value={registerData.email}      onChange={inputChange} placeholder='Enter email '/>
                          <input type="password"  name='password'   value={registerData.password}   onChange={inputChange} placeholder='Set password'/>
                          <input type="tel"       name='mobile'     value={registerData.mobile}     onChange={inputChange} placeholder='Enter Mobile number'/>
                          <input type="number"    name='age'        value={registerData.age}        onChange={inputChange} placeholder='Enter your Age' min={18} max={150} />
                          <input type="submit" value="Register" />

                    </form>
              </div>

          </div>
        </div>
    
    </>
  )
}

export default Register