import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-gray-500 mt-10 p-5'>
        <div className='flex justify-evenly text-white text-[15px]'>
            <ul>
                <li className='hover:text-blue-700 cursor-pointer'>About us</li>
                <li className='hover:text-blue-700 cursor-pointer'>Promotion</li>
                <li className='hover:text-blue-700 cursor-pointer'>Top Sale</li>
            </ul>
            <ul>
                <li className='hover:text-blue-700 cursor-pointer'>Products</li>
                <li className='hover:text-blue-700 cursor-pointer'>Homepage</li>
                <li className='hover:text-blue-700 cursor-pointer'>Local Brands</li>
            </ul>
        </div>
        <div className='text-center text-white'>
            <h3>@scnt. - The Fragrance</h3>
        </div>
    </div>
  )
}

export default Footer