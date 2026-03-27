import React from "react";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import AdminDashBoard from "./pages/AdminDashBoard";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { products as initialProducts } from "./pages/products"; // your products.js
import { initProducts } from "./pages/storage";
import Admin from "./Page/AdminPage";
import ProductGrid from "./Page/ProductGrid";
import ProductDetail from "./Page/ProductDetail";

export default function App() {
  useEffect(() => {
    // Seed localStorage with products.js data if not already present
    initProducts(initialProducts);
  }, []);

  return (
    <div>
      <AdminDashBoard/>
      <BrowserRouter>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Perfume Shop</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">User</Link>
            <Link to="/admin" className="text-blue-600 hover:underline">Admin</Link>
          </nav>

          <Routes>
            <Route path="/" element={<ProductGrid />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
