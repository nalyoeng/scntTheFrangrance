import React from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import { products } from './products'
import Contactus from '../components/Contactus'
import Footer from '../components/Footer'

const Homepage = () => {
  const displayProducts = products.slice(0, 4);
  
  return (
    // Changed h-[100vh] to min-h-screen to allow scrolling on mobile
    <div className='min-h-screen h-[100vh] pt-1'>
      <Header/>
      
      {/* Adjusted text sizes and height for mobile */}
      <div className='w-full min-h-[25vh] flex flex-col justify-center items-center mt-[5vh] md:mt-[10vh] px-4'>
        <h1 className='text-3xl md:text-[45px] text-center leading-tight'>Quality & Affordable</h1>
        <h1 className='text-3xl md:text-[45px] text-center leading-tight'>Support our Local Brands</h1>
      </div>

      <Carousel/>

      <div className='w-full flex flex-col justify-center items-center mt-10 px-4'>
        <h1 className='text-3xl md:text-[45px] mb-4'>Promotion</h1>
        <div className="w-full max-w-[1200px] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {displayProducts.map((item) => (
            <div key={item.id} className="border-0 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover"/>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Adjusted width from fixed 60% to responsive 90% -> 60% */}
      <div id='our-story' className='scroll-mt-[10vh] w-[90%] md:w-[60%] flex flex-col justify-center items-center m-auto pt-3 my-10'>
        <h1 className='text-3xl md:text-[45px]'>Our Story</h1>
        <p className='text-lg md:text-[28px] text-center pt-3 leading-relaxed'>
          Minimalism in design, complexity in scent. We believe in "Quiet Luxury." 
          No loud branding, no synthetic fillers. Just high-quality, locally 
          sourced ingredients that linger long after you’ve left the room.
        </p>
      </div>

      <Contactus/>
      <Footer/>
    </div>
  )
}

export default Homepage