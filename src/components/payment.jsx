import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, ArrowRight, X, Minus, Plus, CreditCard, ShieldCheck, AlertCircle } from "lucide-react"; 
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

    // --- FORM STATE ---
    const [formData, setFormData] = useState({
        fullName: "",
        cardNumber: "",
        expDate: "",
        cvc: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const selectedIds = location.state?.items || [];
        const fullCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (selectedIds.length === 0) {
            navigate('/cart');
            return;
        }
        const itemsToPay = fullCart.filter(item => selectedIds.includes(item.id));
        setCart(itemsToPay);
    }, [location.state, navigate]);

    // --- INPUT HANDLERS WITH FORMATTING ---
    const handleInputChange = (e) => {
        let { name, value } = e.target;

        // Auto-format Expiry Date (MM/YY)
        if (name === "expDate") {
            value = value.replace(/\D/g, ""); // Remove non-digits
            if (value.length > 2) value = value.substring(0, 2) + "/" + value.substring(2, 4);
        }
        // Auto-format Card Number (Spaces every 4 digits)
        if (name === "cardNumber") {
            value = value.replace(/\D/g, "").substring(0, 16);
            value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        }
        // Limit CVC
        if (name === "cvc") value = value.replace(/\D/g, "").substring(0, 3);

        setFormData({ ...formData, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: "" }); // Clear error when typing
    };

    // --- VALIDATION LOGIC ---
    const validateForm = () => {
        let newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
        if (formData.cardNumber.replace(/\s/g, "").length < 16) newErrors.cardNumber = "Invalid card number";
        if (!/^\d{2}\/\d{2}$/.test(formData.expDate)) newErrors.expDate = "Use MM/YY";
        if (formData.cvc.length < 3) newErrors.cvc = "Invalid CVC";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = () => {
        if (!validateForm()) return; // Stop if validation fails

        setIsProcessing(true);
        setTimeout(() => {
            const paidIds = cart.map(item => item.id);
            const fullCart = JSON.parse(localStorage.getItem("cart") || "[]");
            
            const newOrder = {
                orderId: `ORD-${Date.now().toString().slice(-6)}`,
                customerName: formData.fullName,
                items: cart,
                total: total,
                date: new Date().toLocaleString(),
                status: 'Pending'
            };

            const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
            localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));

            const remainingCart = fullCart.filter(item => !paidIds.includes(item.id));
            localStorage.setItem("cart", JSON.stringify(remainingCart));
            refreshCartCount();

            setIsProcessing(false);
            setShowModal(true);
        }, 1500);
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = (item.quantity_requested || 1) + delta;
                return { ...item, quantity_requested: newQty > 0 ? newQty : 1 };
            }
            return item;
        }));
    };

    const removeItem = (id) => {
        const updated = cart.filter(item => item.id !== id);
        if (updated.length === 0) navigate('/cart');
        setCart(updated);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity_requested || 1)), 0);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-black uppercase italic mb-8 tracking-tighter">Checkout</h1>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT SIDE: Items & Summary */}
                    <div className="flex-1 space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="font-bold text-lg">Items to Checkout ({cart.length})</h2>
                                <button onClick={() => navigate('/cart')} className="text-xs font-bold text-red-500 uppercase hover:underline">Cancel</button>
                            </div>
                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div className="flex gap-4 p-4 rounded-xl border border-gray-50 bg-gray-50/50 relative group" key={item.id}>
                                        <img src={item.img || ac} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow-sm" />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-sm md:text-base pr-6">{item.name}</h4>
                                                <p className="font-black text-red-600 text-lg">$ {item.price}</p>
                                            </div>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:bg-gray-100"><Minus size={14}/></button>
                                                <span className="font-bold text-sm">{item.quantity_requested || 1}</span>
                                                <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:bg-gray-100"><Plus size={14}/></button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeItem(item.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors">
                                            <X size={18}/>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="font-bold text-black">${total.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-600 font-bold">FREE</span></div>
                                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                    <span className="font-bold text-lg uppercase tracking-tighter">Total Price</span>
                                    <span className="text-2xl font-black">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Secure Payment with Validation */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-green-600">
                                <ShieldCheck size={20} />
                                <h2 className="font-bold uppercase tracking-widest text-[10px]">Secure Payment</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                                <div className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-center transition-all ${selectedPayment === 'aba' ? 'border-red-500 bg-red-50' : 'border-gray-100 hover:border-gray-300'}`} onClick={() => setSelectedPayment('aba')}><img src={aba} alt="aba" className="h-8 object-contain" /></div>
                                <div className={`cursor-pointer border-2 rounded-xl p-4 flex items-center justify-center transition-all ${selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:border-gray-300'}`} onClick={() => setSelectedPayment('paypal')}><img src={paypal} alt="paypal" className="h-8 object-contain" /></div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400">Cardholder name</label>
                                    <input name="fullName" value={formData.fullName} onChange={handleInputChange} type="text" className={`w-full bg-gray-50 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none ${errors.fullName ? 'border-red-500' : 'border-transparent'}`} placeholder="Full Name" />
                                    {errors.fullName && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{errors.fullName}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold uppercase text-gray-400">Card number</label>
                                    <div className="relative">
                                        <input name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} type="text" className={`w-full bg-gray-50 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none ${errors.cardNumber ? 'border-red-500' : 'border-transparent'}`} placeholder="0000 0000 0000 0000" />
                                        <CreditCard className="absolute right-3 top-3 text-gray-300" size={18} />
                                    </div>
                                    {errors.cardNumber && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{errors.cardNumber}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400">Exp. Date</label>
                                        <input name="expDate" value={formData.expDate} onChange={handleInputChange} type="text" className={`w-full bg-gray-50 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none ${errors.expDate ? 'border-red-500' : 'border-transparent'}`} placeholder="MM/YY" />
                                        {errors.expDate && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{errors.expDate}</p>}
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold uppercase text-gray-400">CVC</label>
                                        <input name="cvc" value={formData.cvc} onChange={handleInputChange} type="text" className={`w-full bg-gray-50 border rounded-xl p-3 text-sm focus:ring-2 focus:ring-black outline-none ${errors.cvc ? 'border-red-500' : 'border-transparent'}`} placeholder="123" />
                                        {errors.cvc && <p className="text-red-500 text-[10px] flex items-center gap-1"><AlertCircle size={10}/>{errors.cvc}</p>}
                                    </div>
                                </div>
                            </div>

                            <button 
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all active:scale-95 ${isProcessing ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 shadow-xl shadow-gray-200'}`} 
                                onClick={handlePayment}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Validating..." : `Pay $${total.toFixed(2)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal remains the same */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] px-4">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Order Confirmed</h2>
                        <p className="text-gray-400 text-sm mb-10 leading-relaxed">Your payment was successful. Your items are being prepared for shipment.</p>
                        <button onClick={() => navigate('/')} className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                            Back to Store <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;