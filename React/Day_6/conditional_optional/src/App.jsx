import React, { useState } from 'react'

const App = () => {
  
  const [color , setColor] = useState(false)

  const click = () => {

      setColor(!color)

  }
  
  
  
  return (
    <>
    
      <div className=' bg-gray-200 h-screen flex flex-col gap-10 justify-center items-center'>

          <div>
            <p className='font-semibold text-3xl'>Conditional Rendering</p>
          </div>

          <div>
            <p >{color ? <p className='bg-green-500 text-black rounded-2xl w-40 p-2 text-center'>This is TRUE</p> : <p className='bg-red-500 text-white rounded-2xl w-40 p-2 text-center'>This is FALSE</p>}</p>
          </div>

          <div>
            <button onClick={click}  className='bg-blue-400 p-2 rounded-3xl w-40 hover:bg-blue-800 hover:text-white duration-700 cursor-pointer'>Click</button>
          </div>

      </div>


      {/* Optional Rendering  */}

      <div className='h-screen flex flex-col gap-10 justify-center items-center'>

          <div>
            <p className='font-semibold text-3xl'>Optional Rendering</p>
          </div>

          <div>
            <p >{color && <p className='bg-green-500 text-black rounded-2xl w-40 p-2 text-center'>This is TRUE</p>}</p>
          </div>

          <div>
            <button onClick={click}  className='bg-blue-400 p-2 rounded-3xl w-40 hover:bg-blue-800 hover:text-white duration-700 cursor-pointer'>Click</button>
          </div>

      </div>

    </>
  )
}

export default App