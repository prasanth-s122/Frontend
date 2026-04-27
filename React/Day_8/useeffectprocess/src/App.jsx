import React, { useEffect, useState } from 'react'

const App = () => {
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
     
     <table>

          <thead>

              <tr>

                  <td>S.No</td>
                  <td>Name</td>
                  <td>Phone</td>

              </tr>

          </thead>

          <tbody>

              <tr>

                <td>S.no</td>
                <td>Name</td>
                <td>Phone</td>

              </tr>

          </tbody>

     </table>
     
     {data.map((e)=>(
        <h3 key = {e.id}>{e.firstName}</h3>
     )) }
    </>
  )
}

export default App