import React, { useState } from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

import { MdOutlineHome } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleIconHover = (icon) => {
    setHoveredIcon(icon);
  };



  return (
    <div className='bottom-0 w-full border-t-2  border-gray-400 bg-white z-10 flex flex-row gap-4 justify-center items-center p-3 sticky'>
      <button
        className={`w-full ${hoveredIcon === 'home' ? 'text-red-primary' : ''}`}
        onMouseEnter={() => handleIconHover('home')}

      >
        <MdOutlineHome className='w-full h-10' />
      </button>
      <button
        className={`w-full ${hoveredIcon === 'profile' ? 'text-red-primary' : ''}`}
        onMouseEnter={() => handleIconHover('profile')}
     
      >
        <IoSearch  className='w-full h-10' />
      </button>
      <button
        className={`w-full ${hoveredIcon === 'message' ? 'text-red-primary' : ''}`}
        onMouseEnter={() => handleIconHover('message')}
  
      >
        <RiMessage2Line className='w-full h-10' />
      </button>
      <button
        className={`w-full ${hoveredIcon === 'settings' ? 'text-red-primary' : ''}`}
        onMouseEnter={() => handleIconHover('settings')}

      >
        <IoMdNotificationsOutline className='w-full h-10' />
      </button>
    </div>
  );
};

export default Navbar;
