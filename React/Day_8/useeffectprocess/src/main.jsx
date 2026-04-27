
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Products from './components/Products.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
        <App />
    </BrowserRouter>


   
    


  
)
