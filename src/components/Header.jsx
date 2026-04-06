import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, cartCount } = useAuth(); // 2. Get user and logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Send them home after logout
  };
  

  return (
    <nav className='w-full h-[10vh] px-8 py-3 flex items-center justify-between fixed top-0 left-0 z-50 bg-white drop-shadow-sm'>
      {/* Font import should ideally be in index.html, but keeping it here for now */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />

      {/* Navigation Links & Logo */}
      <div className='flex items-center gap-12'>
        <ul className='flex items-center gap-8 font-medium text-md lowercase'>
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
        <div className='w-full border border-gray-400 rounded-full px-4 py-1.5 flex items-center bg-gray-50'>
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
      <div className='flex items-center gap-4'>
        {user ? (
          // IF USER IS LOGGED IN: Show Profile/Name and Logout
          <div className='flex items-center gap-4'>
            <div className='relative cursor-pointer hover:text-gray-600 transition-colors'>
              <Link to='cart'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                
                {/* 6. The Badge: Only shows if count > 0 */}
                {cartCount > 0 && (
                  <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black px-1 py-0.5 rounded-full min-w-[18px] flex items-center justify-center border-2 border-white tabular-nums'>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
            <span className='text-sm font-medium text-gray-600'>
              Hello, <span className='text-black font-bold'>{user.name}</span>
            </span>
            
            {/* If they are an admin, maybe show a link to the dashboard */}
            {user.role === 'admin' && (
              <Link to="/admin" className='text-sm text-blue-600 hover:underline'>Admin</Link>
            )}

            <button 
              onClick={handleLogout}
              className='bg-black text-white px-5 py-1.5 rounded-full hover:bg-gray-800 transition-colors text-sm font-medium'
            >
              Log out
            </button>
          </div>
        ) : (
          // IF NO USER: Show Login and Sign Up
          <div className='flex items-center border border-gray-200 rounded-full overflow-hidden shadow-sm'>
            <Link 
              to="/login" 
              className='px-5 py-1.5 hover:bg-gray-100 transition-colors text-sm font-medium border-r border-gray-200'
            >
              Log in
            </Link>
            <Link 
              to="/login" // Usually points to the same component but sets action to Sign Up
              className='bg-black text-white px-5 py-1.5 hover:bg-gray-800 transition-colors text-sm font-medium'
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;