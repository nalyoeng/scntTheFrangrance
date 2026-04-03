import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='w-full h-[10vh] px-8 py-3 flex items-center justify-between fixed top-0 left-0 z-50 bg-white shadow-sm'>
      {/* Font import should ideally be in index.html, but keeping it here for now */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

      {/* Navigation Links & Logo */}
      <div className='flex items-center gap-12'>
        <ul className='flex items-center gap-8 font-medium text-lg lowercase'>
          <li className='hover:text-gray-500 transition-colors'>
            <Link to='/productgrid'>shop</Link>
          </li>
          {/* Adding the / before the # makes these work from ANY page */}
          <li className='hover:text-gray-500 transition-colors'>
            <a href='/#our-story'>our story</a>
          </li>
          <li className='hover:text-gray-500 transition-colors'>
            <a href='/#contact'>contact us</a>
          </li>
        </ul>
        <Link to="/" className='font-bold text-4xl tracking-tighter'>scnt.</Link>
      </div>

      {/* Search Bar */}
      <div className='hidden md:flex flex-1 max-w-md mx-8'>
        <div className='w-full border border-gray-200 rounded-full px-4 py-1.5 flex items-center bg-gray-50'>
          <input 
            type="text" 
            placeholder='search scents...' 
            className='bg-transparent outline-none w-full text-sm'
          />
          <svg className='text-gray-400' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>
      </div>

      {/* Auth Buttons */}
      <div className='flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm'>
        <button className='px-5 py-1.5 hover:bg-gray-100 transition-colors text-sm font-medium'><Link to="/login">Log in</Link></button>
        <button className='bg-black text-white px-5 py-1.5 hover:bg-gray-800 transition-colors text-sm font-medium'>Sign up</button>
      </div>
    </nav>
  );
}

export default Header;