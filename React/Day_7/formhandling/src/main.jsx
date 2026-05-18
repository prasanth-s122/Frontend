import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TasksForm from './TasksForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    <TasksForm/>
  </StrictMode>,
)
