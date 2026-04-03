import { useParams } from "react-router-dom";
import React from "react";
import {products} from "./ProductGrid"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { user, refreshCartCount } = useAuth(); // Check if user is logged in

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to start shopping your favorite scents!");
      navigate('/login', { state: { from: `/product/${id}` } });
    } else {
      // 1. Get the current cart from storage
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // 2. Check if product is already in the cart to avoid duplicates
      const isAlreadyInCart = existingCart.find((item) => item.id === product.id);

      let updatedCart;

      if (isAlreadyInCart) {
        // If it exists, just increase the quantity
        updatedCart = existingCart.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        // If it's new, add the product with quantity 1
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }

      // 3. Save the new list to localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    
      // 4. Update the global Header count
      refreshCartCount(); 
      alert(`${product.name} added to cart!`);
    }
  };
  if (!product) {
    return <p className="text-center mt-10 text-gray-600">Product not found</p>;
  }

  return (
    <div className="min-h-screen pt-[10vh] max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <Header/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-70">
        {/* Product image */}
        <div className="flex justify-center">
          <img
            src={product.img}
            alt={product.name}
            className="w-full max-w-md h-130 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-700 mb-2">{product.brand}</p>
          <p className="text-md text-gray-500 mb-6">{product.fragrance}</p>

          {product.discount ? (
            <div className="mb-4">
              <p className="line-through text-gray-400 text-lg">${product.price}</p>
              <p className="text-3xl font-bold text-red-600">
                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
              </p>
              <span className="inline-block mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                {product.discount}% OFF
              </span>
            </div>
          ) : (
            <p className="text-3xl font-bold  mt-18 mb-4">${product.price}</p>
          )}

          {/* Stock status */}
          {product.quantity > 0 ? (
            <p className="mt-2 text-green-600 font-semibold">
              In Stock: {product.quantity}
            </p>
          ) : (
            <p className="mt-2 text-red-600 font-semibold">
              Out of Stock
            </p>
          )}

          {/* Description */}
          {product.description && (
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
              <ul className="list-disc list-inside text-gray-600">
                {product.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
)}


          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button onClick={handleAddToCart} className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Add to Cart
            </button>
            <button onClick={handleAddToCart} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar items */}
      <h2 className="text-2xl text-center font-semibold mt-12 mb-6 border-b pb-2">Similar Items</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products
          .filter((p) => p.brand === product.brand && p.id !== product.id)
          .slice(0, 4)
          .map((similar) => (
            <div
              key={similar.id}
              onClick={() => navigate(`/product/${similar.id}`)}
              className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
            >
              <img
                src={similar.img}
                alt={similar.name}
                className="w-full h-60 object-cover rounded-md"
              />
              <p className="text-sm font-semibold mt-3 text-center">{similar.name}</p>
            </div>
          ))}
      </div>
    {/* <Footer/>   */}
    </div>
    
  );
}
