import React from "react";
import { IoArrowBack } from "react-icons/io5";

const Header = ({headertext}) => {


  return (
    <div className="flex flex-row justify-between items-center w-full border-b border-neutral-300 px-4 py-2 sticky bg-white top-0">
      <button>
        <IoArrowBack className="w-full h-10" />
      </button>
      <div className="text-lg font-semibold">{headertext}</div>
      <button>
        <img
          src={require("../assets/james.jpg")}
          alt=""
          className="h-10 w-auto rounded-full"
        />
      </button>
    </div>
  );
};

export default Header;
