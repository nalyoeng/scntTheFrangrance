import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import { Package, Search, Calendar, User, DollarSign, ChevronRight } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Load orders from Local Storage
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);
  }, []);

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.orderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-gray-50 pb-20'>
      <AdminHeader />
      
      <main className='max-w-7xl mx-auto px-4 md:px-8 pt-32'>
        {/* Header Section */}
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12'>
          <div>
            <h1 className='text-3xl font-black uppercase italic tracking-tighter'>Orders Control</h1>
            <p className='text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-2'>Manage customer requests</p>
          </div>

          <div className='relative w-full md:w-80'>
            <input 
              type="text" 
              placeholder="Search Order ID or Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={16} />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className='bg-white rounded-3xl p-20 text-center border border-dashed border-gray-200'>
            <Package size={48} className='mx-auto text-gray-200 mb-4' />
            <p className='text-gray-400 font-medium'>No orders found in database.</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredOrders.map((order) => (
              <div key={order.orderId} className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all'>
                {/* Order Summary Row */}
                <div className='p-6 flex flex-wrap items-center justify-between gap-4'>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors'>
                      <Package size={20} />
                    </div>
                    <div>
                      <h2 className='font-black text-sm uppercase tracking-tight'>{order.orderId}</h2>
                      <div className='flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase mt-1'>
                        <span className='flex items-center gap-1'><Calendar size={10}/> {order.date}</span>
                        <span className='flex items-center gap-1'><User size={10}/> {order.customerName}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-8'>
                    <div className='text-right'>
                      <p className='text-[9px] font-bold text-gray-400 uppercase tracking-widest'>Revenue</p>
                      <p className='font-black text-xl'>${Number(order.total).toFixed(2)}</p>
                    </div>
                    <div className='px-4 py-1.5 bg-yellow-50 text-yellow-600 rounded-full text-[10px] font-black uppercase tracking-widest'>
                      {order.status}
                    </div>
                  </div>
                </div>

                {/* Items Breakdown (Collapsible style) */}
                <div className='bg-gray-50/50 border-t border-gray-50 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {order.items.map((item, idx) => (
                    <div key={idx} className='flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100'>
                      <img src={item.img} alt="" className='w-10 h-10 object-cover rounded-md' />
                      <div className='overflow-hidden'>
                        <p className='text-[11px] font-bold truncate uppercase'>{item.name}</p>
                        <p className='text-[9px] text-gray-400 font-bold'>QTY: {item.quantity_requested || 1} • ${item.price}</p>
                      </div>
                    </div>
                  ))}
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