import React, { useState } from 'react'

const App = () => {
  
  const [inp , setInp] = useState("")
  const [show , setShow] = useState("")
  const change = (e) => {
      setInp(e.target.value)
  }

  const click = (e) => {
      e.preventDefault()
      setShow(inp)
  }
  
  
  
  
  
  
  return (
    <>
    
    <div className='bg-gray-300 h-screen flex justify-center items-center'>
      <div className='border  h-100 w-100 rounded-2xl flex justify-center items-center'>
        <form className='flex justify-center items-center gap-10 flex-col'>
          <h1 className='text-xl font-semibold text-red-500'>Form Handling</h1>
          <input onChange={change} type="text" placeholder='Enter data' className='bg-blue-300 focus:bg-blue-500 focus:text-white rounded-md p-3 ' />
          <button onClick={click}  className='border w-30 '>Click</button>
          <h1>{show}</h1>
        </form>
      </div>
    </div>
    
    </>
  )
}

export default App