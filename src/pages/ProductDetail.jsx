import { useParams, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import React, { useState } from "react";
import { products } from "./ProductGrid";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

=======
import React, { useState, useEffect } from "react";
import { products } from "./ProductGrid";
import { getReviews, addReview } from "./storageReviews";
import { useAuth } from "../context/AuthContext"
import Header from "../components/Header";
import Footer from "../components/Footer";
>>>>>>> 0bc8214fdbb20ed26aa1472f7abcbb77f0f73251
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

  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [filterRating, setFilterRating] = useState(null);
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    const allReviews = getReviews();
    setReviews(allReviews.filter((r) => r.productId === product.id));
  }, [product.id]);
  const displayedReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : showAll
    ? reviews
    : [...reviews].reverse().slice(0, 2);
  const getUserName = (review) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.id === review.userId);
    return user ? user.name : review.userId;
  };

  const handleSubmitReview = () => {
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  if (!currentUser) {
    alert("You must be logged in to review.");
    return;
  }
  if (!text.trim()) {
    alert("Please write something before submitting.");
    return;
  }
  if (rating === 0) {
    alert("Please select a star rating.");
    return;
  }

  const newReview = {
    userId: currentUser.id,   //  use the actual user ID
    productId: product.id,
    rating,
    text,
    date: new Date().toISOString().split("T")[0],
  };

  addReview(newReview);

  const updated = getReviews();
  setReviews(updated.filter((r) => r.productId === product.id));

  setText("");
  setRating(0);
};


  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;
//  Rating breakdown
const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
  star,
  count: reviews.filter((r) => r.rating === star).length,
}));
  return (
    <div className="min-h-screen pt-[10vh] max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-250">
        {/* Product image */}
        <div className="flex justify-center">
          <img
            src={product.img}
            alt={product.name}
            className="w-full max-w-md h-130 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product info */}
        <div className="text-left">
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
      

     {/* REVIEW SECTION */}
    <h2 className="text-xl font-bold mt-10 mb-6">Reviews</h2>

  <div className="flex flex-col md:flex-row gap-8">

  {/*  LEFT SIDE (SIDEBAR) */}
  <div className="md:w-2/3 w-full border rounded-lg p-4 bg-gray-50 h-fit">

    {/* Average */}
    <p className="text-2xl font-bold mb-2">
      ⭐ {averageRating} Average Rating
    </p>
    <p className="text-sm text-gray-500 mb-4">
      {reviews.length} reviews
    </p>

    {/* 📊 Rating Filter */}
    {ratingCounts.map(({ star, count }) => (
      <div
        key={star}
        onClick={() => setFilterRating(star)}
        className={`flex items-center gap-2 mb-2 cursor-pointer p-1 rounded ${
          filterRating === star ? "bg-yellow-100" : "hover:bg-gray-100"
        }`}
      >
        <span className="w-10 text-sm">{star}★</span>

        <div className="flex-1 bg-gray-200 h-2 rounded">
          <div
            className="bg-yellow-500 h-2 rounded"
            style={{
              width: reviews.length
                ? `${(count / reviews.length) * 100}%`
                : "0%",
            }}
          />
        </div>

        <span className="text-sm text-gray-600">{count}</span>
      </div>
    ))}

    {/* Clear filter */}
    {filterRating && (
      <button
        onClick={() => setFilterRating(null)}
        className="mt-3 text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Clear Filter
      </button>
    )}

    {/* WRITE REVIEW (NOW ON LEFT) */}
    <div className="mt-6 border-t pt-4">
      <p className="font-semibold mb-2">Write a review</p>

      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl cursor-pointer ${
              (hover || rating) >= star ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        className="w-full border p-2 rounded mb-3 text-sm"
        placeholder="Write your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSubmitReview}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit Review
      </button>
    </div>
  </div>

  {/*RIGHT SIDE (REVIEWS LIST - BIG AREA) */}
  <div className="md:w-1/3 w-full">

    {/*SHOW ALL */}
    {reviews.length > 2 && !filterRating && (
      <button
        onClick={() => setShowAll(!showAll)}
        className="w-30 bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {showAll ? "Show Less" : "Show All Reviews"}
      </button>
    )}

    {/* REVIEWS */}
    {reviews.length === 0 && (
      <p className="text-gray-500 ">No reviews yet.</p>
    )}

    {displayedReviews.map((r, i) => (
      <div key={i} className="border p-4 mt-3 mb-4 rounded bg-white shadow-sm">
        <p className="text-yellow-500 text-lg">
          {"★".repeat(r.rating)}
        </p>
        <p className="font-semibold">{getUserName(r)}</p>
        <p className="text-xs text-gray-400 mb-2">{r.date}</p>
        <p className="text-gray-700">{r.text}</p>
      </div>
    ))}
  </div>
</div>
</div>
);
}