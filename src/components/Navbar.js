import React from 'react'
import { MdOutlineHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
const Navbar = () => {
  return (
    <div className='bottom-0 w-full border-t-2  border-gray-400 absolute z-10 flex flex-row gap-4 justify-center items-center p-5'>
        <button className='w-full border border-red-500'><MdOutlineHome className='w-full h-10' /></button>
        <button className='w-full border border-red-500'><CgProfile  className='w-full h-10' /></button>
        <button className='w-full border border-red-500'>Message</button>
        <button className='w-full border border-red-500'>Setting</button>
    </div>
  )
}

export default Navbar