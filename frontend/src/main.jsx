import { StrictMode } from 'react'
import {BrowserRouter} from "react-router"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from "react-hot-toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-left"/>
    </BrowserRouter>
  </StrictMode>,
)
