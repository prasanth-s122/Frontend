import React, { useEffect, useState } from 'react'

const Home = () => {
  const [data , setData] = useState([])
  useEffect(() => {

        const fetchData = async () => {

          const getData = await fetch("https://dummyjson.com/products")
          console.log(getData);

          const getDataObject = await getData.json()

          console.log(getDataObject);
          
          
          localStorage.setItem("Data_Base" , JSON.stringify(getDataObject.products)) 

        }

        const productShow = async () => {
          const productData = await localStorage.getItem("Data_Base")
          const productDataObject = await JSON.parse(productData)

          await setData(productDataObject)


        }

        fetchData()
        productShow()
        

  } , [])
  
  return (
    <>
        <div>Home</div>

        <div className='flex flex-col flex-wrap justify-center items-center gap-5 m-7 font-semibold'>
          <div>
              <h1 className='m-10 text-3xl'>Home</h1>
          </div>

          <div className='flex gap-20 flex-wrap justify-center items-center'>
            {data.map((e) => (
                  <div key={e.id} className='bg-gray-200 hover:bg-blue-200 transition duration-700 w-56 h-72 rounded-2xl p-3 cursor-pointer   flex flex-col gap-3 justify-center items-center  '>
                      <img className='rounded-3xl' src={e.images} alt="" srcset="" />
                      <h1 className='uppercase '>{e.title}</h1>
                      <h1 className='uppercase '>{e.category}</h1>
                      <h1 className='uppercase text-green-500 '>₹ {e.price}</h1>
                      

                  </div>
            ))}
          </div>
        
            
            
            
            
        </div>
    </>
  )
}

export default Home