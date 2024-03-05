import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { RiMessage2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IoIosAdd } from 'react-icons/io';

const Navbar = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleIconHover = (icon) => {
    setHoveredIcon(icon);
  };
  
  const pathName = window.location.pathname;

  return (
    <div className="bottom-0 w-full border-t-2 h-16 border-gray-400 bg-white z-10 flex flex-row gap-4 justify-center items-center p-3 sticky">
      <Link className="w-full" to='/home'>
        <button
          className={`w-full ${
            hoveredIcon === "home" ? "text-red-primary" : ""
          } ${
            pathName === "/home" ? "text-orange-primary" : ""
          }`}
          onMouseEnter={() => handleIconHover("home")}
        >
          <MdOutlineHome className="w-full h-10" />
        </button>
      </Link>

      <Link to="/search"
        className={`w-full ${
          hoveredIcon === "search" ? "text-red-primary" : ""
        }  ${
          pathName === "/search" ? "text-orange-primary" : ""
        }`}
        onMouseEnter={() => handleIconHover("search")}
      >
        <IoSearch className="w-full h-10" />
      </Link>
      <Link  to='/notifications'
        className={`w-full ${
          hoveredIcon === "notifications" ? "text-red-primary" : ""
        }  ${
          pathName === "/notifications" ? "text-orange-primary" : ""
        }`}
        onMouseEnter={() => handleIconHover("notifications")}
      >
        <IoMdNotificationsOutline className="w-full h-10" />
      </Link>
      <Link to='/add-project'
        className={`w-full ${
          hoveredIcon === "message" ? "text-red-primary" : ""
        } `}
        onMouseEnter={() => handleIconHover("message")}
      >
        <IoIosAdd className="w-full h-10" />
      </Link>
    </div>
  );
};

export default Navbar;
