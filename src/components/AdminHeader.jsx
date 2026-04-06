import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, Search, LogOut, Menu, X, Settings } from 'lucide-react';

const AdminHeader = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to highlight active link - checks if current path starts with the link path
  const isActive = (path) => location.pathname === path ? 'text-black font-bold' : 'text-gray-400';

  return (
    <nav className='w-full h-[10vh] px-4 md:px-8 py-3 flex items-center justify-between fixed top-0 left-0 z-[100] bg-white border-b border-gray-100 shadow-sm'>
      
      {/* 1. LOGO & NAVIGATION */}
      <div className='flex items-center gap-6 lg:gap-12'>
        <Link to="/" className='font-bold text-2xl md:text-3xl tracking-tighter flex items-center'>
          scnt. <span className='text-[9px] bg-black text-white px-2 py-0.5 rounded ml-2 uppercase tracking-widest italic font-black'>Admin</span>
        </Link>
        
        {/* Desktop Nav */}
        <ul className='hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-bold'>
          <li className={`${isActive('/admin')} hover:text-black transition-colors`}>
                <Link to="/admin" className="flex items-center gap-2 text-nowrap">
                    <LayoutDashboard size={14}/> Dashboard
                </Link>
            </li>
            <li className={`${isActive('/admin/orders')} hover:text-black transition-colors`}>
                <Link to="/admin/orders" className="flex items-center gap-2 text-nowrap">
                    <ShoppingBag size={14}/> Orders
                </Link>
            </li>
            <li className={`${isActive('/admin/management')} hover:text-black transition-colors`}>
                <Link to="/admin/management" className="flex items-center gap-2 text-nowrap">
                    <Settings size={14}/> CRUD / Manage
                </Link>
            </li>
        </ul>
      </div>

      {/* 2. SEARCH & ACTIONS */}
      <div className='flex items-center gap-2 md:gap-4'>
        {/* Search Bar - Hidden on mobile */}
        <div className='hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:ring-1 focus-within:ring-black transition-all'>
          <input 
            type="text" 
            placeholder='Quick search...' 
            className='bg-transparent outline-none text-xs w-32 lg:w-48'
          />
          <Search size={14} className="text-gray-400" />
        </div>

        {/* Exit Admin Button */}
        <Link 
          to="/" 
          className='flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10'
        >
          <LogOut size={14} />
          <span className='hidden sm:inline'>Exit Panel</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className='xl:hidden p-2 text-black'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 3. MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className='absolute top-[10vh] left-0 w-full bg-white border-b border-gray-200 p-8 flex flex-col gap-6 xl:hidden animate-in slide-in-from-top duration-300 shadow-2xl'>
           <Link to="/admin" onClick={() => setIsMenuOpen(false)} className='text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 py-2 border-b border-gray-50'>
            <LayoutDashboard size={18} className="text-gray-400"/> Dashboard
          </Link>
          <Link to="/admin/orders" onClick={() => setIsMenuOpen(false)} className='text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 py-2 border-b border-gray-50'>
            <ShoppingBag size={18} className="text-gray-400"/> Orders Log
          </Link>
          <Link to="/admin/management" onClick={() => setIsMenuOpen(false)} className='text-xs font-black uppercase tracking-[0.2em] flex items-center gap-4 py-2 border-b border-gray-50'>
            <Settings size={18} className="text-gray-400"/> CRUD Management
          </Link>
          
          <div className='pt-4'>
             <div className='flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3'>
              <input type="text" placeholder='Search everything...' className='bg-transparent outline-none text-sm w-full' />
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminHeader;