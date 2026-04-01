import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { products as initialProducts } from "./pages/products"; // your products.js
import { initProducts } from "./pages/storage";
import Mainrouter from "./Router/Mainrouter";
import Homepage from "./pages/Homepage";

<<<<<<< HEAD
import Login from "./components/Login";
const Login_s=Login
import './App.css'
import Checkout from "./components/payment";
const Checkout_s=Checkout
import Order from "./components/order";
const Order_s=Order

const App = () => {

  

  return (
    <div>
      {/* <Login_s></Login_s> */}
      <Checkout_s></Checkout_s>
      {/* <Order_s></Order_s> */}
    </div>
  );
};

export default App;
 
=======

export default function App() {
  useEffect(() => {
    // Seed localStorage with products.js data if not already present
    initProducts(initialProducts);
  }, []);

  return (
    <div className="">
      <Mainrouter/>
    </div>
  );
};
>>>>>>> 53a612aeeb3e142009342c59f6aa459fd124943e
