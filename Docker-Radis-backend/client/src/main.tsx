import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/Navbar.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from "react-router-dom";
import Footer from './components/Footer.tsx'

createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
    <Navbar/>
      <App />
    <Footer/>
    <Toaster/>
    </BrowserRouter>,
  
)
