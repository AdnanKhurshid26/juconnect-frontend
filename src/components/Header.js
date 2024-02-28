import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = ({headertext}) => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the history
  };

  return (
    <div className="flex flex-row justify-between items-center w-full border-b border-neutral-300 px-4 py-2 sticky bg-white top-0 h-16">
      <button onClick={handleGoBack}>
        <IoArrowBack className="w-full h-10" />
      </button>

      
      <div className="text-lg font-semibold">{headertext}</div>
      <Link to="/student-profile">
      <button>
        <img
          src={require("../assets/james.jpg")}
          alt=""
          className="h-10 w-auto rounded-full"
        />
      </button>
      </Link>
      
    </div>
  );
};

export default Header;
