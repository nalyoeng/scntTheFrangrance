import React from "react";
import { useEffect } from "react";
import { products as initialProducts } from "./pages/products"; 
import { initProducts } from "./pages/storage";
import Mainrouter from "./Router/Mainrouter";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  useEffect(() => {
    // Seed localStorage with products.js data if not already present
    initProducts(initialProducts);
  }, []);

  return (
    <AuthProvider> 
      <Mainrouter/>
    </AuthProvider>
  );
};
