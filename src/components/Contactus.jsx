import React from 'react'

const Contactus = () => {
  return (
    <div 
      id='contact' 
      className='scroll-mt-[10vh] w-[95%] md:w-[80%] m-auto border-0 bg-gray-50 p-5 md:p-10 rounded-xl shadow-md shadow-gray-400 mt-[50px] flex flex-col md:flex-row justify-around gap-10 md:gap-0'
    >
        {/* Left Section: Contact Info */}
        <div className='w-full md:w-[50%] flex flex-col items-center'>
            <h1 className='font-bold text-2xl md:text-[28px] text-center'>Get in touch</h1>
            <div className='flex flex-col justify-center items-center pt-5 space-y-2'>
                <p className='text-base md:text-[20px] text-center'>
                  <span className='font-bold'>Email: </span>scntthefragrance@gmail.com
                </p>
                <p className='text-base md:text-[20px] text-center'>
                  <span className='font-bold'>Social: </span>scntTheFragrance (Instagram)
                </p>
                <p className='text-base md:text-[20px] text-center'>
                  Scnt.- The Fragrance (Facebook)
                </p>
                <p className='text-base md:text-[20px] text-center'>
                  <span className='font-bold'>Location: </span>Phnom Penh, Cambodia
                </p>
            </div>           
        </div>

        {/* Right Section: Form */}
        <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
            <h1 className='font-bold text-2xl md:text-[28px] text-center'>Send Us a Message</h1>
            <div className='flex flex-col pt-5 gap-5 w-full max-w-[400px] md:max-w-[300px]'>
                <input 
                  className='w-full border border-gray-400 rounded-md p-2' 
                  type="text" 
                  placeholder='Your Name'
                />
                <input 
                  className='w-full border border-gray-400 rounded-md p-2' 
                  type="text" 
                  placeholder='Your email'
                />
                <textarea 
                  className='w-full border border-gray-400 rounded-md p-2 min-h-[100px]' 
                  placeholder='Your message'
                ></textarea>
                
                <div className='p-2 rounded-md bg-blue-700 w-full md:w-[40%] text-center text-white cursor-pointer hover:bg-blue-800 transition-colors'>
                  Submit
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contactus