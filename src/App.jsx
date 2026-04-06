import React from "react";
import Mainrouter from "./Router/Mainrouter";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
const Login_s=Login
import './App.css'
import Checkout from "./components/payment";
const Checkout_s=Checkout
import Order from "./components/order";

const Order_s=Order

const App = () => {
  

  return (
    <AuthProvider> 
      <Mainrouter/>
    </AuthProvider>
  );
};

export default App;
 