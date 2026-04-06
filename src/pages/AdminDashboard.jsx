import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/AdminHeader';
import { getProducts } from './storage'; 
import { TrendingUp, Package, DollarSign, CheckCircle2, AlertCircle, ShoppingBag, BarChart3, ArrowUpRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    preparing: 0,
    todayEarnings: 0,
    todayOrders: 0,
    readyPackages: 0,
    totalRevenue: 0,
    ordersProcessed: 0,
    activeProducts: 0,
    outOfStock: 0,
    completedOrders: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const products = getProducts() || [];
    const today = new Date().toDateString();

    const todayOrdersList = orders.filter(o => new Date(o.date).toDateString() === today);
    const todayEarnings = todayOrdersList.reduce((sum, o) => sum + Number(o.total), 0);
    const pending = orders.filter(o => o.status === 'Pending').length;
    const completed = orders.filter(o => o.status === 'Shipped' || o.status === 'Completed').length;

    setStats({
      preparing: pending,
      todayEarnings: todayEarnings,
      todayOrders: todayOrdersList.length,
      readyPackages: completed,
      totalRevenue: orders.reduce((sum, o) => sum + Number(o.total), 0),
      ordersProcessed: orders.length,
      activeProducts: products.length,
      outOfStock: products.filter(p => p.quantity <= 0).length,
      completedOrders: completed,
      pendingOrders: pending
    });
  }, []);

  return (
    <div className='min-h-screen h-[100vh] bg-[#F8FAFC] w-full'>
      <AdminHeader />
      
      <main className="w-full pt-28 pb-12 px-4 md:px-10 lg:px-12 xl:px-16">
        
        {/* --- HEADER TITLE --- */}
        <div className='mb-10'>
            <div className='flex items-center gap-3 mb-2'>
                <div className='w-2 h-8 bg-black rounded-full'></div>
                <h1 className='text-4xl font-black uppercase italic tracking-tighter'>Control Center</h1>
            </div>
            <p className='text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] ml-5'>
                Real-time Analytics & System Overview
            </p>
        </div>

        {/* --- TOP SECTION: FLUID PERFORMANCE GRID --- */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-10">
            
            {/* Sales Stats - Spans 3 columns on XL screens */}
            <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pending Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-6">
                        <span className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <span className='w-2 h-2 bg-amber-500 rounded-full animate-pulse'></span> Pending
                        </span>
                        <div className='p-3 bg-slate-50 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-colors'>
                            <AlertCircle size={20}/>
                        </div>
                    </div>
                    <div className="text-5xl font-black italic tracking-tighter mb-2">{stats.preparing}</div>
                    <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Awaiting Fulfillment</div>
                </div>

                {/* Earnings Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-6">
                        <span className="bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Revenue</span>
                        <div className='p-3 bg-slate-50 rounded-2xl group-hover:bg-purple-600 group-hover:text-white transition-colors'>
                            <DollarSign size={20}/>
                        </div>
                    </div>
                    <div className="text-5xl font-black italic tracking-tighter mb-2 text-purple-600">
                        ${stats.todayEarnings.toFixed(2)}
                    </div>
                    <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Earned Today</div>
                </div>

                {/* Logistics Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-6">
                        <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Logistics</span>
                        <div className='p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors'>
                            <Package size={20}/>
                        </div>
                    </div>
                    <div className="text-5xl font-black italic tracking-tighter mb-2 text-blue-600">{stats.readyPackages}</div>
                    <div className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Packages Shipped</div>
                </div>

            </div>

            {/* Growth Card - 1 Column on XL */}
            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between border border-slate-800">
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 mb-8 flex items-center gap-2">
                        <BarChart3 size={16}/> Market Trend
                    </h3>
                    <div className="flex items-end justify-between h-24 gap-3 mb-6 px-2">
                        <div className="w-full bg-cyan-500/10 hover:bg-cyan-400 rounded-t-lg transition-all h-[40%]"></div>
                        <div className="w-full bg-cyan-500/10 hover:bg-cyan-400 rounded-t-lg transition-all h-[60%]"></div>
                        <div className="w-full bg-fuchsia-500 rounded-t-lg h-[90%] shadow-[0_0_20px_rgba(217,70,239,0.3)]"></div>
                        <div className="w-full bg-white/10 hover:bg-white rounded-t-lg transition-all h-[30%]"></div>
                        <div className="w-full bg-cyan-500/10 hover:bg-cyan-400 rounded-t-lg transition-all h-[75%]"></div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-400 font-black italic text-xl">
                        <TrendingUp size={20}/> +12%
                    </div>
                    <ArrowUpRight className='text-slate-700' size={24}/>
                </div>
            </div>
        </div>

        {/* --- BOTTOM SECTION: DATA DRILLDOWN --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
            
            {/* Revenue Overview */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Sales History</h2>
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Gross Revenue</span>
                        <p className="text-3xl font-black italic tracking-tighter">${stats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Net Orders</span>
                        <p className="text-3xl font-black italic tracking-tighter">{stats.ordersProcessed}</p>
                    </div>
                </div>
            </div>

            {/* Inventory Overview */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-8">Inventory</h2>
                <div className="space-y-6">
                    <div className="flex justify-between items-end border-b border-slate-50 pb-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase">Active Scents</span>
                        <p className="text-3xl font-black italic tracking-tighter">{stats.activeProducts}</p>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-[11px] font-bold text-red-500 uppercase">Shortage</span>
                        <p className="text-3xl font-black italic tracking-tighter text-red-500">{stats.outOfStock}</p>
                    </div>
                </div>
            </div>

            {/* Status Breakdown - Larger Column on Ultrawide */}
            <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8">
                <div className='flex-1'>
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Fulfillment Distribution</h2>
                    <div className="flex items-center gap-4">
                        <div className='flex-1 bg-slate-900 text-white p-6 rounded-3xl flex flex-col'>
                            <span className="text-[9px] font-bold text-slate-500 uppercase mb-2">Ongoing</span>
                            <span className="text-4xl font-black italic text-fuchsia-400">{stats.pendingOrders}</span>
                        </div>
                        <div className='flex-1 bg-slate-50 p-6 rounded-3xl flex flex-col border border-slate-100'>
                            <span className="text-[9px] font-bold text-slate-400 uppercase mb-2">Finalized</span>
                            <span className="text-4xl font-black italic text-slate-900">{stats.completedOrders}</span>
                        </div>
                    </div>
                </div>
                <div className='md:w-1/3 bg-slate-50 rounded-3xl p-6 flex flex-col justify-center border border-slate-100 border-dashed'>
                    <p className='text-[10px] font-bold text-slate-400 uppercase leading-relaxed text-center'>
                        System is operating at <span className='text-emerald-500'>100% capacity</span>. All local storage nodes are synced.
                    </p>
                </div>
            </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;