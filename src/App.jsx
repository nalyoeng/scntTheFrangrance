import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { products as initialProducts } from "./pages/products"; // your products.js
import { initProducts } from "./pages/storage";
import Mainrouter from "./Router/Mainrouter";
import Homepage from "./pages/Homepage";


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
