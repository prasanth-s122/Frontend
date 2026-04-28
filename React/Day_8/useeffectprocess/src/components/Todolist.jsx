import React, { useEffect, useState } from 'react'

const Todolist = () => {
  const [data , setData] = useState([])
  

  useEffect(()=>{

    const fetchData = async ()=>{
      const getData = await fetch("https://dummyjson.com/todos")

      const actualData = await getData.json()

      setData(actualData.todos)
  }

    fetchData()
  } , [])
  
  
  return (
    <>
    <div className=' flex flex-col  items-center gap-5 '>
       
      <h1 className='text-center font-bold  text-black text-2xl  mb-4'>TODO LIST</h1>

     <table className=" mb-5 border border-black text-center w-1/2 bg-white text-gray-800">

          <thead className="bg-gray-800 text-white">

              <tr>

                  <th className=" p-2">S.No</th>
                  <th className=" p-2">TODO</th>
                  <th className=" p-2">STATUS</th>
                  <th className=" p-2">USER ID</th>

              </tr>

          </thead>

          <tbody>

              {data.map((e)=>(
                  

                  <tr key = {e.id} className='hover:bg-blue-200   duration-700'>

                    <td className="border border-black p-2 font-semibold">{e.id}</td>
                    <td className="border border-black p-2 font-semibold">{e.todo}</td>
                    <td className="border border-black p-2 font-semibold "> {e.completed ? <p className='text-green-500'>Completed</p> : <p className='text-red-500'>Not Completed</p>  }</td>
                    <td className="border border-black p-2 font-semibold">{e.userId}</td>

                  </tr>
              )) }

              

          </tbody>

     </table>

     </div>
     
     
    </>
  )
}

export default Todolist