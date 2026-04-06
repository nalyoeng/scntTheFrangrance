import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Search, LogOut, Menu, X } from 'lucide-react';

const AdminHeader = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Helper to highlight active link
  const isActive = (path) => location.pathname === path ? 'text-black font-bold' : 'text-gray-400';

  return (
    <nav className='w-full h-[10vh] px-6 py-3 flex items-center justify-between fixed top-0 left-0 z-[100] bg-white border-b border-gray-100 shadow-sm'>
      {/* 1. LOGO & BACK TO SHOP */}
      <div className='flex items-center gap-8'>
        <Link to="/" className='font-bold text-3xl tracking-tighter'>scnt. <span className='text-[10px] bg-black text-white px-2 py-0.5 rounded ml-1 uppercase tracking-widest italic'>Admin</span></Link>
        
        {/* Desktop Nav */}
        <ul className='hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-bold'>
          <li className={`${isActive('/admin')} hover:text-black transition-colors`}>
            <Link to="/admin" className="flex items-center gap-2"><LayoutDashboard size={14}/> Dashboard</Link>
          </li>
          <li className={`${isActive('/admin/management')} hover:text-black transition-colors`}>
            <Link to="/admin" className="flex items-center gap-2"> Products</Link>
          </li>
          <li className={`${isActive('/admin/users')} hover:text-black transition-colors`}>
            <Link to="/admin/orders" className="flex items-center gap-2"> Order</Link>
          </li>
        </ul>
      </div>

      {/* 2. SEARCH & ACTIONS */}
      <div className='flex items-center gap-4'>
        {/* Search Bar - Hidden on mobile */}
        <div className='hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus-within:ring-1 focus-within:ring-black transition-all'>
          <input 
            type="text" 
            placeholder='Search records...' 
            className='bg-transparent outline-none text-xs w-40 lg:w-60'
          />
          <Search size={14} className="text-gray-400" />
        </div>

        {/* Exit Admin Button */}
        <Link 
          to="/" 
          className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-xs font-bold transition-all'
        >
          <LogOut size={14} />
          <span className='hidden sm:inline'>Exit Admin</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className='lg:hidden p-2 text-black'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 3. MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className='absolute top-[10vh] left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-6 lg:hidden animate-in slide-in-from-top duration-300 shadow-xl'>
           <Link to="/admin" onClick={() => setIsMenuOpen(false)} className='text-sm font-bold uppercase tracking-widest flex items-center gap-4'>
            <LayoutDashboard size={18}/> Dashboard
          </Link>
          <Link to="/admin/management" onClick={() => setIsMenuOpen(false)} className='text-sm font-bold uppercase tracking-widest flex items-center gap-4'>
            <Package size={18}/> Products
          </Link>
          <Link to="/admin/users" onClick={() => setIsMenuOpen(false)} className='text-sm font-bold uppercase tracking-widest flex items-center gap-4'>
            <Users size={18}/> Users
          </Link>
          <div className='pt-4 border-t border-gray-50'>
             <div className='flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3'>
              <input type="text" placeholder='Search...' className='bg-transparent outline-none text-sm w-full' />
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminHeader;