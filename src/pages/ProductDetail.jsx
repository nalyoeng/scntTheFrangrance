import { useParams, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { products } from "./ProductGrid";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { user, refreshCartCount } = useAuth();
  const [qty, setQty] = useState(1); 

  const handleAddToCart = (isBuyNow = false) => {
    if (!user) {
      alert("Please login to start shopping your favorite scents!");
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    // 1. Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((item) => item.id === product.id);

    let updatedCart = [...existingCart];

    if (itemIndex > -1) {
      // 2. If item exists, add the NEW quantity to the EXISTING quantity
      // We use 'quantity_requested' to match your CartPage logic
      const currentQty = updatedCart[itemIndex].quantity_requested || 1;
      updatedCart[itemIndex].quantity_requested = currentQty + qty;
    } else {
      // 3. If item is new, push it with 'quantity_requested'
      updatedCart.push({ 
        ...product, 
        quantity_requested: qty 
      });
    }

    // 4. Save and Update
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    refreshCartCount();

    if (isBuyNow) {
      // Direct to payment, passing the current product ID in the state
      // so the checkout knows what we are buying
      navigate('/payment', { 
        state: { 
          fromCart: false, // Tell payment page this is a direct buy
          items: [product.id] 
        } 
      });
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  if (!product) return <div className="h-screen flex items-center justify-center text-gray-500">Product not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen mt-10">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12 pt-32">
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-50 flex items-start justify-center text-center">
              <div className="sticky top-32 w-full">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full aspect-[4/5] object-cover rounded-2xl shadow-2xl transition hover:scale-[1.01] duration-500"
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center mt-10">
              <div className="mb-4">
                <span className="text-black font-black tracking-[0.2em] text-[10px] uppercase bg-gray-100 px-4 py-2 rounded-full">
                  {product.brand}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-2 tracking-tighter italic uppercase">
                {product.name}
              </h1>
              <p className="text-xl text-gray-400 italic mb-8">{product.fragrance}</p>

              <div className="flex items-center gap-6 mb-10 border-y border-gray-50 py-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-black tracking-tighter text-gray-900">
                    ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                  </span>
                </div>

                <div className="h-8 w-[1px] bg-gray-200" />

                <div>
                  {product.quantity > 0 ? (
                    <div className="flex items-center gap-2 text-black font-bold text-[10px] uppercase tracking-widest">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      Available
                    </div>
                  ) : (
                    <span className="text-red-500 font-bold text-[10px] uppercase tracking-widest">Out of Stock</span>
                  )}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</span>
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                  <button 
                    onClick={() => setQty(Math.max(1, qty - 1))} 
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition font-bold"
                  >
                    −
                  </button>
                  <span className="px-6 font-black text-gray-900 text-sm">{qty}</span>
                  <button 
                    onClick={() => setQty(qty + 1)} 
                    className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => handleAddToCart(false)}
                  disabled={product.quantity <= 0}
                  className="flex-1 bg-black text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transform active:scale-95 transition-all disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => handleAddToCart(true)}
                  disabled={product.quantity <= 0}
                  className="flex-1 bg-white text-black border-2 border-black px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-400 hover:border-gray-500 transform active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                >
                  Buy Now - Fast Checkout
                </button>
              </div>

              {/* Details */}
              <div className="space-y-8 border-t border-gray-100 pt-10">
                <div>
                  <h3 className="text-[10px] font-black text-black uppercase tracking-[0.2em] mb-4">The Scent Profile</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}