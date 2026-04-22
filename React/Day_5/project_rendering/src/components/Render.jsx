import React, { useState } from 'react'

const Render = () => {
  
  const [count , setCount] = useState(0)


  const increment = () => {

      setCount (count + 1)

  }

  const decrement = () => {

      setCount  (count - 1)

  }

  const reset = () => {

      setCount(0)

  }
  
  return (
    <>
    
      <div className='bg-gray-100 h-screen flex justify-center items-center flex-col gap-10'>


          <p className='text-3xl'>{count}</p>

          <div className=' flex justify-center items-center flex-col'>
            
            
            <button className='bg-green-400 p-2 w-30 text-center rounded-2xl cursor-pointer text-white hover:bg-green-600 transition duration-700' onClick={increment}>Increase</button>

          </div>

          <div>
            
            
            <button className=' bg-red-400  p-2 w-30 text-center rounded-2xl cursor-pointer text-white  hover:bg-red-600 transition duration-700' onClick={decrement}>Decrease</button>

          </div>

          <div>
            
            
            <button className='bg-yellow-400 p-2 w-30 text-center rounded-2xl cursor-pointer text-white hover:bg-yellow-600 transition duration-700' onClick={reset}>Reset</button>

          </div>

      </div>
    
    </>
  )
}

export default Render