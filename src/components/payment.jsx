import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, ArrowRight, X } from "lucide-react"; 
import "./payments.css";
import ac from '../assets/ac.png';
import paypal from '../assets/paypal.png';
import aba from '../assets/aba.png';

function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { refreshCartCount } = useAuth();
    
    const [cart, setCart] = useState([]);
    const [selectedPayment, setSelectedPayment] = useState('aba');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // 1. LOAD & SYNC DATA
    useEffect(() => {
        const selectedIds = location.state?.items || [];
        const fullCart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (selectedIds.length === 0) {
            navigate('/cart');
            return;
        }

        // Filter items and ensure we use 'quantity_requested' consistently
        const itemsToPay = fullCart.filter(item => selectedIds.includes(item.id));
        setCart(itemsToPay);
    }, [location.state, navigate]);

    // 2. QUANTITY CONTROLS (Updated to match your naming convention)
    const updateQty = (id, delta) => {
        const updated = cart.map(item => {
            if (item.id === id) {
                const newQty = (item.quantity_requested || 1) + delta;
                return { ...item, quantity_requested: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        setCart(updated);
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        if (updated.length === 0) navigate('/cart');
        setCart(updated);
    };

    // 3. FINAL PAYMENT & STORAGE CLEANUP
    const handlePayment = () => {
        setIsProcessing(true);

        // Simulate processing time
        setTimeout(() => {
            const paidIds = cart.map(item => item.id);
            const fullCart = JSON.parse(localStorage.getItem("cart") || "[]");
            
            // REMOVE only the items that were just paid for
            const remainingCart = fullCart.filter(item => !paidIds.includes(item.id));

            localStorage.setItem("cart", JSON.stringify(remainingCart));
            refreshCartCount(); // Update the header icon immediately

            setIsProcessing(false);
            setShowModal(true); // Show the success popup
        }, 1500);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity_requested || 1)), 0);

    return (
        <div className="checkout-container relative min-h-screen bg-gray-50">
            <div className="left">
                <div className="items-box">
                    <div className="items-header">
                        <h2>Items to Checkout</h2>
                        <span className="remove-all" onClick={() => navigate('/cart')}>Cancel Order</span>
                    </div>

                    {cart.map(item => (
                        <div className="item-card" key={item.id}>
                            <img src={item.img || ac} alt={item.name} />
                            <div className="item-info">
                                <h4 className="item-title">{item.name}</h4>
                                <div className="price">
                                    <span className="new-price">US$ {item.price}</span>
                                </div>
                                <div className="quantity">
                                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                                    <span>{item.quantity_requested || 1}</span>
                                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                                </div>
                            </div>
                            <span className="remove" onClick={() => removeItem(item.id)}><X size={14}/></span>
                        </div>
                    ))}
                </div>

                <div className="summary-box">
                    <h2>Order Summary</h2>
                    <div className="summary-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Shipping</span><span className="text-green-600 font-bold">FREE</span></div>
                    <hr />
                    <div className="total"><span>Total Price</span><span>${total.toFixed(2)}</span></div>
                </div>
            </div>

            <div className="right">
                <h2>Secure Payment</h2>
                <div className='payment-methods'>
                    <img src={aba} className={selectedPayment === 'aba' ? 'active' : ''} onClick={() => setSelectedPayment('aba')} alt="aba"/>
                    <img src={paypal} className={selectedPayment === 'paypal' ? 'active' : ''} onClick={() => setSelectedPayment('paypal')} alt="paypal"/>
                </div>

                <div className='input'><label>Cardholder name</label><input type="text" placeholder="Full Name" /></div>
                <div className='input'><label>Card number</label><input type="text" placeholder="0000 0000 0000 0000" /></div>
                <div className='row'>
                    <div className='input'><label>Exp. Date</label><input type="text" placeholder="MM/YY" /></div>
                    <div className='input'><label>CVC</label><input type="text" placeholder="123" /></div>
                </div>

                <button 
                    className={`pay-btn ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    onClick={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Validating..." : `Pay $${total.toFixed(2)}`}
                </button>
            </div>

            {/* SUCCESS MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] animate-in fade-in duration-300">
                    <div className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl scale-in-center">
                        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-2">Order Confirmed</h2>
                        <p className="text-gray-400 text-sm mb-8">Your payment was successful. Your items are being prepared for shipment.</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="w-full bg-black text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gray-800 transition-all"
                        >
                            Back to Store <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;