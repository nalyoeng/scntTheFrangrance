import React from 'react'

const Contactus = () => {
  return (
    <div id='contact' className='scroll-mt-[10vh] w-[80%] m-auto border-0 bg-gray-50 p-5 rounded-xl shadow-md shadow-gray-400 mt-[50px] flex justify-content-around'>
        <div className='w-[50%] flex flex-col items-center'>
            <h1 className='font-bold text-[28px] text-center'>Get in touch</h1>
            <div className='flex flex-col justify-center items-center pt-5'>
                <p className='text-[20px]'><span className='font-bold'>Email: </span>scntthefragrance@gmail.com</p>
                <p className='text-[20px]'><span className='font-bold'>Social: </span>scntTheFragrance (Instagram)</p>
                <p className='text-[20px]'>Scnt.- The Fragrance (Facebook)</p>
                <p className='text-[20px]'><span className='font-bold'>Location: </span>Phnom Penh, Cambodia</p>
            </div>           
        </div>
        <div className='w-[50%] flex flex-col justify-center items-center'>
            <h1 className='font-bold text-[28px] text-center'>Send Us a Message</h1>
            <div className='flex flex-col pt-5 gap-5'>
                <input className='w-[300px] border-1 border-gray-400 rounded-md p-1' type="text" placeholder='Your Name'/>
                <input className='w-[300px] border-1 border-gray-400 rounded-md p-1' type="text" placeholder='Your email'/>
                <textarea className='w-[300px] border-1 border-gray-400 rounded-md p-1' name="" id="" placeholder='Your message'></textarea>
                <div className='p-2 rounded-md bg-blue-700 w-[30%] text-center text-white cursor-pointer hover:bg-blue-800'>Submit</div>
            </div>
        </div>
    </div>
  )
}

export default Contactus