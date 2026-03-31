
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import ProductGrid from '../pages/ProductGrid'
import Admin from '../pages/AdminPage'
import ProductDetail from '../pages/ProductDetail'
import Login from '../components/Login'
import Header from '../components/Header' // Import your header here

const Mainrouter = () => {
  return (
    <Router>
        <div className="min-h-screen flex flex-col"> 
            
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/productgrid" element={<ProductGrid />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/login" element={<Login />} />
                    {/* Added the missing element for signin */}
                    <Route path="/signin" element={<Login />} /> 
                </Routes>
            </main>
        </div>
    </Router>
  )
}

export default Mainrouter