
import Mainrouter from "./Router/Mainrouter";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
const Login_s=Login
import './App.css'
import Checkout from "./components/payment";
const Checkout_s=Checkout
import Order from "./components/order";
import { initProducts } from "./pages/storage";
import React, { useEffect } from "react";
import { products as initialProducts } from "./pages/products"; // your products.js
import { initReviews } from "./pages/storageReviews";
const Order_s=Order

const App = () => {
  useEffect(() => {
    // Seed localStorage with products.js data if not already present
    initProducts(initialProducts);
  }, []);
  useEffect(() => {
    initReviews();
  }, []);

  return (
    <AuthProvider> 
      <Mainrouter/>
    </AuthProvider>
  );
};

export default App;
 