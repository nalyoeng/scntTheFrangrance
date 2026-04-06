import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./ProductGrid";
import { getReviews, addReview } from "./storageReviews";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { user, refreshCartCount } = useAuth();
  
  // --- State ---
  const [qty, setQty] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [filterRating, setFilterRating] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // --- Load Data ---
  useEffect(() => {
    if (product) {
      const allReviews = getReviews();
      setReviews(allReviews.filter((r) => r.productId === product.id));
    }
    window.scrollTo(0, 0); // Scroll to top on load
  }, [product?.id]);

  if (!product) return <div className="h-screen flex items-center justify-center text-gray-500">Product not found</div>;

  // --- Handlers ---
  const handleAddToCart = (isBuyNow = false) => {
    if (!user) {
      alert("Please login to start shopping your favorite scents!");
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const itemIndex = existingCart.findIndex((item) => item.id === product.id);
    let updatedCart = [...existingCart];

    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity_requested += qty;
    } else {
      updatedCart.push({ ...product, quantity_requested: qty });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    refreshCartCount();

    if (isBuyNow) {
      navigate('/payment', { state: { fromCart: false, items: [product.id] } });
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  const handleSubmitReview = () => {
    const currentUser = JSON.parse(localStorage.getItem("current_user"));
    if (!currentUser) return alert("You must be logged in to review.");
    if (!text.trim() || rating === 0) return alert("Please provide a rating and a comment.");

    const newReview = {
      userId: currentUser.id,
      productId: product.id,
      rating,
      text,
      date: new Date().toISOString().split("T")[0],
    };

    addReview(newReview);
    setReviews(getReviews().filter((r) => r.productId === product.id));
    setText("");
    setRating(0);
  };

  // --- Helpers ---
  const getUserName = (review) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.id === review.userId);
    return found ? found.name : "Guest User";
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const displayedReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : showAll ? reviews : [...reviews].reverse().slice(0, 2);

  return (
    <div className="bg-gray-50 h-[100vh] min-h-screen flex flex-col">
      <Header />
      
      {/* Main Content: Changed h-[100vh] to min-h-screen for responsiveness */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 md:py-12 pt-24 md:pt-32">
        
        {/* Product Hero Section */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100 mb-12">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Section */}
            <div className="w-full lg:w-1/2 p-4 md:p-8 lg:p-12 bg-gray-50 flex items-center justify-center">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full max-w-md lg:max-w-full aspect-[4/5] object-cover rounded-2xl shadow-xl transition-transform hover:scale-[1.02] duration-500" 
              />
            </div>

            {/* Right: Details Section */}
            <div className="w-full lg:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-black font-black tracking-widest text-[10px] uppercase bg-gray-100 px-4 py-2 rounded-full">
                    {product.brand}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 tracking-tighter italic uppercase leading-tight">
                {product.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-400 italic mb-6 md:mb-8">{product.fragrance}</p>

              <div className="flex items-center gap-4 md:gap-6 mb-8 border-y border-gray-50 py-6">
                <span className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900">
                  ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-red-500 font-bold text-xs uppercase bg-red-50 px-2 py-1 rounded">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex flex-col gap-2 mb-8">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Quantity</label>
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100 w-fit">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 font-bold hover:bg-gray-200 rounded-lg transition-colors">−</button>
                  <span className="px-6 font-black">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-10 h-10 font-bold hover:bg-gray-200 rounded-lg transition-colors">+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    onClick={() => handleAddToCart(false)} 
                    className="flex-1 bg-black text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-800 transition-all active:scale-95"
                >
                    Add to Cart
                </button>
                <button 
                    onClick={() => handleAddToCart(true)} 
                    className="flex-1 bg-white text-black border-2 border-black px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all active:scale-95"
                >
                    Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-12 md:mt-20">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-xl md:text-2xl font-black uppercase italic">Reviews ({reviews.length})</h2>
                {filterRating && (
                    <button onClick={() => setFilterRating(null)} className="text-xs font-bold text-gray-400 hover:text-black uppercase underline">Clear Filter</button>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                {/* Review Sidebar: Stats & Form */}
                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                        <div className="flex items-baseline gap-2 mb-4">
                            <p className="text-4xl md:text-5xl font-black">⭐ {averageRating}</p>
                            <p className="text-gray-400 text-sm font-bold uppercase">Average</p>
                        </div>
                        
                        <div className="space-y-3 mb-8">
                            {ratingCounts.map(({ star, count }) => (
                                <div 
                                    key={star} 
                                    onClick={() => setFilterRating(star)} 
                                    className={`flex items-center gap-4 cursor-pointer group p-1 rounded-lg transition-colors ${filterRating === star ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                                >
                                    <span className="text-[10px] font-bold w-4">{star}★</span>
                                    <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            className="bg-black h-full transition-all duration-500" 
                                            style={{ width: `${(count / (reviews.length || 1)) * 100}%` }} 
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 w-4">{count}</span>
                                </div>
                            ))}
                        </div>

                        {/* Add Review Form */}
                        <div className="border-t border-gray-100 pt-6 mt-6">
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-4">Write a review</p>
                            
                            {/* Star Rating Selector */}
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={` cursor-pointer text-2xl transition-colors ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-200"}`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            <textarea 
                                value={text} 
                                onChange={(e) => setText(e.target.value)} 
                                className="w-full border border-gray-200 rounded-xl p-4 text-sm mb-4 focus:ring-2 focus:ring-black outline-none min-h-[100px]" 
                                placeholder="Share your experience..." 
                            />
                            <button 
                                onClick={handleSubmitReview} 
                                className="w-full cursor-pointer bg-black text-white py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                Post Review
                            </button>
                        </div>
                    </div>
                </div>

                {/* Review List */}
                <div className="w-full lg:w-2/3 space-y-4">
                    {displayedReviews.length > 0 ? (
                        displayedReviews.map((r, i) => (
                            <div key={i} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm animate-fadeIn">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="text-yellow-400 text-xs mb-1">
                                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                                        </div>
                                        <p className="font-bold text-sm uppercase tracking-tight">{getUserName(r)}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-300 uppercase">{r.date}</span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
                            </div>
                        ))
                    ) : (
                        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center text-gray-400 text-sm">
                            No reviews yet for this rating.
                        </div>
                    )}
                    
                    {reviews.length > 2 && !filterRating && (
                        <button 
                            onClick={() => setShowAll(!showAll)} 
                            className="w-full py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                        >
                            {showAll ? "Show Less" : "View All Reviews"}
                        </button>
                    )}
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}