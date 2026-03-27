import React from 'react'

const AdminHeader = () => {
  return (
    <div className='w-full h-[10vh] px-5 py-3 flex items-center justify-between fixed top-0 left-0 z-50 bg-white shadow-md'>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Roboto:wght@400;500&family=Fira+Code&display=swap" rel="stylesheet"></link>
        <div className='w-[60%] flex justify-around items-center'>
            <ul className='w-[50%] flex justify-between pl-3 font-medium lg:text-xl'>
                <li className='hover:text-gray-500 cursor-pointer'>Dash board</li>
                <li className='hover:text-gray-500 cursor-pointer'>Products</li>
                <li className='hover:text-gray-500 cursor-pointer'>Orders</li>
            </ul>
            <h1 className='font-bold text-4xl'>scnt.</h1>
        </div>
        <div className='lg:w-[20%] w-[30%]'>
            <div className='w-[100%] border-1 border-gray-300 rounded-lg flex items-center'>
                <input type="text" placeholder='search' className='outline-0 p-1.5'/>
                <svg className='ml-18' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader