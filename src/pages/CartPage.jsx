import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import { Trash2, AlertCircle, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const { refreshCartCount } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(savedCart);
        const inStockIds = savedCart
            .filter(item => item.quantity > 0)
            .map(item => item.id);
        setSelectedIds(inStockIds);
    }, []);

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return; 
        const updatedCart = cartItems.map(item => 
            item.id === id ? { ...item, quantity_requested: newQty } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        refreshCartCount(); 
    };

    const toggleSelect = (id, isOutOfStock) => {
        if (isOutOfStock) return;
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(sId => sId !== id) : [...prev, id]
        );
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setSelectedIds(selectedIds.filter(sId => sId !== id));
        refreshCartCount();
    };

    const totalAmount = cartItems
        .filter(item => selectedIds.includes(item.id))
        .reduce((sum, item) => {
            const qty = item.quantity_requested || 1;
            return sum + (item.price * qty);
        }, 0);

    return (
        <div className="h-[100vh] bg-[#FDFDFD] w-full pb-24 font-['Roboto']">
            <Header />
            
            {/* The Container: Set to 75% of viewport width */}
            <div className="w-[85vw] lg:w-[75vw] mx-auto pt-20">
                
                {/* Back Button & Header */}
                <button 
                    onClick={() => navigate('/productgrid')}
                    className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-8 group"
                >
                    <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Continue Shopping</span>
                </button>

                <header className="mb-16">
                    <h1 className="text-4xl font-black tracking-[ -0.05em] uppercase italic leading-none">Your cart</h1>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="h-[1px] w-12 bg-black"></span>
                        <p className="text-gray-400 text-[11px] font-bold uppercase tracking-[0.3em]">
                            {cartItems.length} Fragrances Selected
                        </p>
                    </div>
                </header>

                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center border-t border-gray-100">
                        <ShoppingBag size={64} strokeWidth={0.5} className="text-gray-200 mb-6" />
                        <h2 className="text-xl font-medium tracking-tight mb-8 text-gray-400">The cart is currently empty.</h2>
                        <button 
                            onClick={() => navigate('/productgrid')}
                            className="bg-black text-white px-14 py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gray-800 transition-all"
                        >
                            Explore Scents
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-20 items-start">
                        
                        {/* LEFT: Clean, Spacious Product List */}
                        <div className="flex-grow w-full lg:w-3/5 divide-y divide-gray-100">
                            {cartItems.map((item) => {
                                const isOutOfStock = item.quantity <= 0;
                                const isSelected = selectedIds.includes(item.id);
                                const currentQty = item.quantity_requested || 1;

                                return (
                                    <div key={item.id} className={`m-5 p-10 rounded-2xl shadow-2xl py-10 flex gap-8 transition-opacity ${isOutOfStock ? 'opacity-40' : 'opacity-100'}`}>
                                        {/* Selection Check */}
                                        <div className="pt-2">
                                            <div 
                                                onClick={() => toggleSelect(item.id, isOutOfStock)}
                                                className={`w-4 h-4 border flex items-center justify-center transition-all cursor-pointer rounded-2xl
                                                    ${isSelected ? 'bg-black border-black' : 'bg-white border-gray-200 hover:border-black'}
                                                `}
                                            >
                                                {isSelected && <div className="w-2 h-2 rounded-2xl bg-white" />}
                                            </div>
                                        </div>

                                        {/* Product Image */}
                                        <div className="w-40 h-48 bg-[#F5F5F5] flex-shrink-0 relative overflow-hidden group">
                                            <img 
                                                src={item.img} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-col justify-between flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-2">{item.name}</h3>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.brand}</p>
                                                </div>
                                                <p className="text-lg font-black italic tracking-tighter">${(item.price * currentQty).toFixed(2)}</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-8">
                                                {/* Stepper */}
                                                <div className="flex items-center border border-gray-200 bg-white">
                                                    <button onClick={() => updateQuantity(item.id, currentQty - 1)} className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">−</button>
                                                    <span className="w-10 text-center text-xs font-bold">{currentQty}</span>
                                                    <button onClick={() => updateQuantity(item.id, currentQty + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-black hover:text-white transition-colors">+</button>
                                                </div>

                                                <button 
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2"
                                                >
                                                    <Trash2 size={14} /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* RIGHT: High-End Summary Card */}
                        <div className="w-full lg:w-[30%] sticky top-40 m-10">
                            <div className="bg-gray-200 text-black p-12 rounded-[2rem] shadow-2xl shadow-black/20">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 mb-10">Checkout Details</h2>
                                
                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between text-xs tracking-widest">
                                        <span className="text-gray-500 uppercase">Subtotal</span>
                                        <span>${totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs tracking-widest">
                                        <span className="text-gray-500 uppercase">Shipping</span>
                                        <span className="text-xs">FREE</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Total</span>
                                        <span className="text-5xl font-black tracking-tighter italic">${totalAmount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => navigate('/payment', { state: { fromCart: true, items: selectedIds } })}
                                    disabled={selectedIds.length === 0}
                                    className="w-full bg-white text-black py-6 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-gray-500 hover:text-white transition-all active:scale-[0.98]"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <p className="mt-8 text-[9px] text-gray-500 text-center uppercase tracking-widest leading-loose">
                                    Secure Checkout Guaranteed <br/>
                                    Tax included where applicable
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;