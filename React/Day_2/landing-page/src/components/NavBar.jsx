import React from 'react'
import hero from '../assets/hero.png'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
        <img src={hero} alt="logo" className="logo"/>

        <div className="nav-links">
            <a href="">Home</a>
            <a href="">About</a>
            <a href="">Contact</a>
        </div>
    </nav>
  )
}

export default NavBar