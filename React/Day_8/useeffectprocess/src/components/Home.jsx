import React from 'react'
import banner from '../assets/banner.png'
const Home = () => {
  return (
    <>
      <div className=" bg-white h-screen flex justify-center items-center">
          <img className="w-full max-w-5xl rounded-xl shadow-2xl" src={banner} alt=""  />
      </div>
    </>
  )
}

export default Home