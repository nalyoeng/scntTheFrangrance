// App.js
import React, { useState } from "react";
import { FaShoppingCart, FaTrash, FaArrowLeft, FaCheck } from "react-icons/fa";
// import './index.css';

const OrderSummary = () => {
  const [orderStatus, setOrderStatus] = useState(""); // '' | 'confirmed' | 'canceled'

  const items = [
    { id: 1, name: "Product 1", quantity: 2, price: 50 },
    { id: 2, name: "Product 2", quantity: 1, price: 30 },
    { id: 3, name: "Product 3", quantity: 3, price: 20 },
  ];

  const getTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleConfirmOrder = () => {
    setOrderStatus("confirmed");
  };

  const handleCancelOrder = () => {
    setOrderStatus("canceled");
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center relative ${orderStatus === "confirmed" ? "bg-green-500" : orderStatus === "canceled" ? "bg-red-500" : "bg-gray-100"}`}>
      {orderStatus === "confirmed" && (
        <div className="absolute top-0 left-0 w-full h-full bg-green-500 bg-opacity-90 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold text-white mb-4">Congratulations!</h2>
          <p className="text-2xl text-white">Your order has been confirmed!</p>
          <div className="ribbon ribbon-top-right"><span>🎉 Confirmed 🎉</span></div>
        </div>
      )}
      {orderStatus === "canceled" && (
        <div className="absolute top-0 left-0 w-full h-full bg-red-500 bg-opacity-90 flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold text-white mb-4">Order Canceled!</h2>
          <p className="text-2xl text-white">Your order has been canceled.</p>
          <div className="ribbon ribbon-top-right"><span>❌ Canceled ❌</span></div>
        </div>
      )}
      <div className={`bg-white p-8 rounded-lg shadow-md max-w-md w-full ${orderStatus ? "hidden" : ""}`}>
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <ul className="mb-6">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 border-b border-gray-300">
              <span>{item.name} x{item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${getTotal()}</span>
        </div>
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleConfirmOrder}
            className="bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out flex items-center justify-center"
          >
            <FaCheck className="mr-2" /> Confirm Order
          </button>
          <button
            onClick={handleCancelOrder}
            className="bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out flex items-center justify-center"
          >
            <FaTrash className="mr-2" /> Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return <OrderSummary />;
}   