import React, { useEffect, useState } from 'react'

const Users = () => {
  const [data , setData] = useState([])
  

  useEffect(()=>{

    const fetchData = async ()=>{
      const getData = await fetch("https://dummyjson.com/users")

      const actualData = await getData.json()

      setData(actualData.users)
  }

    fetchData()
  } , [])
  
  
  return (
    <>
    <div className='flex flex-col flex-wrap justify-center items-center gap-5 m-7 font-semibold'>
        <div>
            <h1 className='m-10 text-3xl'>USER DATA</h1>
        </div>

        <div className='flex gap-20 flex-wrap justify-center items-center'>
           {data.map((e) => (
                <div key={e.id} className='bg-gray-200 hover:bg-blue-200 transition duration-700 w-56 h-72 rounded-2xl p-3 cursor-pointer   flex flex-col gap-3 justify-center items-center  '>
                    <img className='rounded-3xl' src={e.image} alt="" srcset="" />
                    <h1 className='uppercase '>{e.firstName} {e.lastName}</h1>
                    <h1 className='uppercase '>Age : {e.age}</h1>
                    <h1 className='uppercase '>Gender : {e.gender}</h1>
                    <h1 className='uppercase text-red-500'>Blood Group : {e.bloodGroup}</h1>

                </div>
           ))}
        </div>
        
            
            
            
            
        </div>
    
     
    </>
  )
}

export default Users