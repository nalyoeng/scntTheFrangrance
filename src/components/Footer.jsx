import React from 'react'

const Footer = () => {
  return (
    <footer className='w-full bg-gray-100 mt-20 pt-12 pb-6 px-5'>
      {/* Main Footer Content */}
      <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-10 border-b border-slate-800 pb-10'>
        
        {/* Brand Side */}
        <div className='text-center md:text-left'>
          <h2 className='text-white text-2xl font-bold tracking-tighter'>scnt.</h2>
          <p className='text-slate-400 text-sm mt-2 max-w-[250px]'>
            Quiet luxury and complex scents for the modern home.
          </p>
        </div>

        {/* Links Side */}
        <div className='flex gap-12 md:gap-24 text-white text-sm'>
          <ul className='flex flex-col gap-3 items-center md:items-start'>
            <li className='font-semibold text-slate-500 uppercase tracking-widest text-[10px] mb-1'>Explore</li>
            <li className='hover:text-blue-400 cursor-pointer text-gray-500'>About us</li>
            <li className='hover:text-blue-400 cursor-pointer text-gray-500'>Promotion</li>
            <li className='hover:text-blue-400 cursor-pointer text-gray-500'>Top Sale</li>
          </ul>
          
          <ul className='flex flex-col gap-3 items-center md:items-start'>
            <li className='font-semibold text-slate-500 uppercase tracking-widest text-[10px] mb-1'>Shop</li>
            <li className='hover:text-blue-400 cursor-pointer text-gray-500'>Products</li>
            <li className='hover:text-blue-400 cursor-pointer text-gray-500'>Homepage</li>
            <li className='hover:text-blue-400 cursor-pointer text-gray-500'>Local Brands</li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className='text-center pt-8'>
        <p className='text-slate-500 text-xs tracking-wide'>
          &copy; {new Date().getFullYear()} SCNT. - THE FRAGRANCE. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}

export default Footer