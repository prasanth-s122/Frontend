import React from 'react'
import vite from '../assets/vite.svg'
import './Banner.css'

const Banner = () => {
  return (
    <>
        <div className="image_container">
            <img  className="image" src={vite} alt="" />
        </div>
    </>
  )
}

export default Banner