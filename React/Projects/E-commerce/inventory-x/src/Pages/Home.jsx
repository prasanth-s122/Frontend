import React, { useEffect, useState } from 'react'
import products from '../Data/Products'
import ProductCard from '../Components/ProductCard'

const Home = () => {

  const [productData, setProductData] = useState([])

  useEffect(() => {

    if (!localStorage.getItem("products")) {

      localStorage.setItem(
        "products",
        JSON.stringify(products)
      )

    }

    const storedProducts =
      JSON.parse(localStorage.getItem("products")) || []

    setProductData(storedProducts)

  }, [])

  return (

    <div className='flex flex-col flex-wrap justify-center items-center gap-5 m-7'>

      <div>
        <h1 className='m-10 text-5xl font-bold'>
          Inventory X
        </h1>
      </div>

      <div className='flex gap-10 flex-wrap justify-center items-start pb-10'>

        {productData.map((e) => (

          <ProductCard
            key={e.id}
            product={e}
          />

        ))}

      </div>

    </div>

  )
}

export default Home