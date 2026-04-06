import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import { Package, Search, Calendar, User, ShoppingBag, ChevronRight, Clock, Hash, DollarSign } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-[#f8f9fa] pb-20'>
      <AdminHeader />
      
      <main className='max-w-7xl mx-auto px-4 mt-50 md:px-8 pt-32'>
        {/* --- HEADER SECTION --- */}
        <div className='flex flex-col md:flex-row justify-between items-end gap-6 mb-10'>
          <div className='w-full md:w-auto'>
            <div className='flex items-center gap-3 mb-2'>
                <div className='w-2 h-8 bg-black rounded-full'></div>
                <h1 className='text-4xl font-black uppercase italic tracking-tighter'>Order Log</h1>
            </div>
            <p className='text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] ml-5'>
                Monitoring {orders.length} Total Transactions
            </p>
          </div>

          <div className='relative w-full md:w-96'>
            <input 
              type="text" 
              placeholder="Search Customer or Order ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-black outline-none transition-all shadow-sm font-medium"
            />
            <Search className="absolute left-4 top-4.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* --- ORDERS LIST --- */}
        {filteredOrders.length === 0 ? (
          <div className='bg-white rounded-[2rem] p-32 text-center border-2 border-dashed border-gray-100'>
            <ShoppingBag size={80} strokeWidth={0.5} className='mx-auto text-gray-200 mb-6' />
            <h2 className='text-xl font-bold text-gray-300 uppercase tracking-widest'>No Orders Found</h2>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-8'>
            {filteredOrders.map((order) => (
              <div key={order.orderId} className='bg-white rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 overflow-hidden'>
                
                {/* TOP BAR: Order Metadata */}
                <div className='bg-gray-900 text-white p-6 md:px-10 flex flex-wrap justify-between items-center gap-6'>
                    <div className='flex items-center gap-6'>
                        <div className='flex flex-col'>
                            <span className='text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1'>Order ID</span>
                            <span className='font-mono text-lg font-bold'>{order.orderId}</span>
                        </div>
                        <div className='h-10 w-[1px] bg-gray-700 hidden sm:block'></div>
                        <div className='flex flex-col'>
                            <span className='text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1'>Customer</span>
                            <span className='font-bold text-sm uppercase'>{order.customerName}</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-6'>
                         <div className='flex flex-col text-right'>
                            <span className='text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1'>Total Paid</span>
                            <span className='text-2xl font-black text-green-400 italic tracking-tighter'>${Number(order.total).toFixed(2)}</span>
                        </div>
                        <div className='bg-white/10 px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2'>
                            <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                            <span className='text-[10px] font-black uppercase tracking-widest'>{order.status || 'Pending'}</span>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: The Items (Made much clearer) */}
                <div className='p-6 md:p-10 bg-white'>
                    <div className='flex items-center gap-2 mb-6'>
                        <Hash size={14} className='text-gray-400'/>
                        <h3 className='text-[10px] font-black uppercase tracking-[0.3em] text-gray-400'>Manifest / {order.items.length} Items</h3>
                    </div>

                    <div className='space-y-4'>
                        {order.items.map((item, idx) => (
                            <div key={idx} className='flex items-center bg-gray-50/50 hover:bg-gray-50 rounded-2xl p-4 md:p-5 border border-gray-100 transition-colors group'>
                                {/* Larger Image Display */}
                                <div className='w-20 h-24 md:w-24 md:h-28 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm flex-shrink-0'>
                                    <img 
                                        src={item.img} 
                                        alt={item.name} 
                                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                                    />
                                </div>

                                {/* Product Info Breakdown */}
                                <div className='flex-grow px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1'>{item.brand}</p>
                                        <h4 className='text-lg md:text-xl font-black uppercase tracking-tighter leading-none mb-1'>{item.name}</h4>
                                        <p className='text-xs text-gray-400 italic'>{item.fragrance}</p>
                                    </div>

                                    <div className='flex items-center md:justify-end gap-8 md:gap-16'>
                                        <div className='text-center'>
                                            <p className='text-[9px] font-black text-gray-400 uppercase mb-1'>Qty</p>
                                            <p className='font-bold text-sm bg-white border border-gray-200 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm'>
                                                {item.quantity_requested || 1}
                                            </p>
                                        </div>
                                        <div className='text-right'>
                                            <p className='text-[9px] font-black text-gray-400 uppercase mb-1'>Unit Price</p>
                                            <p className='font-bold text-sm'>${item.price}</p>
                                        </div>
                                        <div className='text-right min-w-[80px]'>
                                            <p className='text-[9px] font-black text-gray-400 uppercase mb-1'>Subtotal</p>
                                            <p className='font-black text-base italic'>${(item.price * (item.quantity_requested || 1)).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Footer Info */}
                    <div className='mt-8 pt-8 border-t border-gray-100 flex flex-wrap justify-between items-center text-gray-400'>
                        <div className='flex items-center gap-6'>
                            <span className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest'>
                                <Calendar size={14}/> {order.date}
                            </span>
                            <span className='flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest uppercase'>
                                <Package size={14}/> Standard Shipping
                            </span>
                        </div>
                        <button className='text-[10px] font-black uppercase tracking-widest bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-all active:scale-95 mt-4 md:mt-0'>
                            Mark as Shipped
                        </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;