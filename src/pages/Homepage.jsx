import React from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import {Products} from '../productDetails'
import Contactus from '../components/Contactus'
import Footer from '../components/Footer'

const Homepage = () => {
  const displayProducts = Products.slice(0, 4);
  
  return (
    <div className='h-[100vh] pt-[10vh]'>
      <Header/>
      <div className=' w-full h-[25vh] flex flex-col justify-center items-center mt-[10vh]'>
        <h1 className='text-[45px]'>Quality & Affordable</h1>
        <h1 className='text-[45px]'>Support our Local Brands</h1>
      </div>

      <Carousel/>

      <div className='w-full flex flex-col justify-center items-center mt-5'>
        <h1 className='text-[45px]'>Promotion</h1>
        <div className=" w-[90%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {displayProducts.map((item) => (
            <div key={item.id} className="border-0 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={item.src} alt={item.name} className="w-full h-full object-cover"/>
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id='our-story' className='scroll-mt-[10vh] w-[60%] flex flex-col justify-content-center items-center m-auto pt-3 my-10'>
        <h1 className='text-[45px]'>Our Story</h1>
        <p className='text-[28px] text-center pt-3'>Minimalism in design, complexity in scent. We believe in "Quiet Luxury." No loud branding, no synthetic fillers. Just high-quality, locally sourced ingredients that linger long after you’ve left the room.</p>
      </div>

      <Contactus/>
      <Footer/>
    </div>
  )
}

export default Homepage