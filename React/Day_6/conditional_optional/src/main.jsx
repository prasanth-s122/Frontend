import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import ShowHide from './ShowHide.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Login/>
    <ShowHide/>
  </StrictMode>,
)
