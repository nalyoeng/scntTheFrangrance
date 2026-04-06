import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext' // 1. Important! Wrap the brain
import ProtectedRoute from './ProtectedRoute'        // 2. The Gatekeeper

// Page Imports
import Homepage from '../pages/Homepage'
import ProductGrid from '../pages/ProductGrid'
import Admin from '../pages/AdminPage'
import ProductDetail from '../pages/ProductDetail'
import Login from '../components/Login'
import HomeLayout from '../pages/HomeLayout'
import UserManagement from '../pages/Usermanagment'
import AdminManagement from '../pages/AdminManagement'
import Checkout from '../components/payment'
import CartPage from '../pages/CartPage'
import AdminOrders from '../pages/AdminOrders'

const Mainrouter = () => (
  <AuthProvider> {/* Wrap the whole router so every page knows who is logged in */}
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            
            {/* Public Shop Routes (Inside HomeLayout for Header/Footer) */}
            <Route path='/' element={<HomeLayout />}>
              <Route index element={<Homepage />} /> 
              <Route path="productgrid" element={<ProductGrid />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="payment" element={<Checkout />} />
            </Route>
            
            {/* Auth Routes (Usually outside layouts for a clean look) */}
            <Route path="/login" element={<Login />} />

            {/* 🛡️ Protected Admin Routes (Only accessible by logged-in Admins) */}
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route index element={<Admin />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="management" element={<AdminManagement />} />
              <Route path="orders" element={<AdminOrders />} />   {/* <-- Add this */}
            </Route>


            {/* Catch-all: If user types a wrong URL, go home */}
            <Route path="*" element={<Navigate to="/" />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  </AuthProvider>
)

export default Mainrouter