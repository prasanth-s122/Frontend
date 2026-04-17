import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from './components/NavBar.jsx'
import Banner from './components/Banner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <NavBar/>
    
    <Banner/>

  </StrictMode>,
)
