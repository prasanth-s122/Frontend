import React, { useEffect, useState } from 'react'

const Recipies = () => {
  const [data , setData] = useState([])
  

  useEffect(()=>{

    const fetchData = async ()=>{
      const getData = await fetch("https://dummyjson.com/recipes")

      const actualData = await getData.json()

      setData(actualData.recipes)
  }

    fetchData()
  } , [])
  
  
  return (
    <>
    <div className=' flex flex-col  items-center gap-5 mt-4 '>
       
      <h1 className='text-center font-bold  text-black text-2xl  mb-4'>PRODUCT LIST</h1>

     <table className="border border-black  w-3/4 mb-4  text-gray-800">

          <thead className="bg-gray-800 text-white">

              <tr>

                  <th className=" p-2">S.No</th>
                  <th className=" p-2 w-100">NAME OF THE FOOD</th>
                  <th className=" p-2 w-100">INGREDIENTS NEEDED</th>
                  <th className=" p-2 w-300">INSTRUCTIONS</th>

              </tr>

          </thead>

          <tbody>

              {data.map((e)=>(
                  

                  <tr key = {e.id} className='hover:bg-gray-200   duration-700'>

                    <td className="border border-black p-2 font-semibold text-center">{e.id}</td>
                    <td className="border border-black p-2 font-semibold text-center">{e.name}</td>
                    <td className="border border-black p-2 font-semibold "> {e.ingredients.map((l,i) => (
                        <p className=' mb-2' key={i}>👉🏼{l}</p>
                    ))}</td>
                    <td className="border border-black p-2 font-semibold"> {e.instructions.map((l,i) => (
                        <p className='text-blue-600 mb-2' key={i}>🧑🏼‍🍳{l}</p>
                    ))}</td>

                  </tr>
              )) }

              

          </tbody>

     </table>

     </div>
     
     
    </>
  )
}

export default Recipies