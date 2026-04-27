import React, { useEffect, useState } from 'react'

const Products = () => {
  const [data , setData] = useState([])
  

  useEffect(()=>{

    const fetchData = async ()=>{
      const getData = await fetch("https://dummyjson.com/products")

      const actualData = await getData.json()

      setData(actualData.products)
  }

    fetchData()
  } , [])
  
  
  return (
    <>
    <div className=' flex flex-col  items-center gap-5 '>
       
      <h1 className='text-center font-bold  text-black text-2xl  mb-4'>PRODUCT LIST</h1>

     <table className="border border-black text-center w-1/2 bg-white text-gray-800">

          <thead className="bg-gray-800 text-white">

              <tr>

                  <th className=" p-2">S.No</th>
                  <th className=" p-2">Product</th>
                  <th className=" p-2">Price</th>

              </tr>

          </thead>

          <tbody>

              {data.map((e)=>(
                  

                  <tr key = {e.id} className='hover:bg-blue-200   duration-700'>

                    <td className="border border-black p-2 font-semibold">{e.id}</td>
                    <td className="border border-black p-2 font-semibold">{e.title}</td>
                    <td className="border border-black p-2 font-semibold text-green-500">₹ {e.price}</td>

                  </tr>
              )) }

              

          </tbody>

     </table>

     </div>
     
     
    </>
  )
}

export default Products