import React from 'react'
import About from './components/pages/About'
const Home = ({sending}) => {

  
  return (
   <>
    
   <h1>{sending}</h1>
   <About sending = {sending}/>
    
   </>
  )
}

export default Home