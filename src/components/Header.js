import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Header = ({headertext}) => {

  const navigate = useNavigate();
  const [getRole,setRole,removeRole] = useLocalStorage("role")
  const [getToken,setToken,removeToken] = useLocalStorage("token")

  const handleLogout = (event) => {
    //stop onclick propagation
    event.stopPropagation();
    removeRole();
    removeToken();
    navigate("/");
  }
  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the history
  };
  const profileLink = getRole() === "Student" ? "/student-profile" : "/faculty-profile";
  return (
    <div className="flex flex-row justify-between items-center w-full border-b border-neutral-300 px-4 py-2 sticky bg-white top-0 h-16">
      <button onClick={handleGoBack}>
        <IoArrowBack className="h-10" />
      </button>

      
      <div className="text-lg font-semibold">{headertext}</div>
      
      <div className="flex flex-row justify-center items-center gap-4">
      <button className="text-orange-primary font-bold text-xl" onClick={handleLogout}>
              Logout
      </button>{" "}
      <button>
        <img
          src={require("../assets/james.jpg")}
          alt=""
          className="h-10 w-auto rounded-full"
          onClick={()=>{navigate(profileLink)}}
        />
      </button>
      </div>
      
    </div>
  );
};

export default Header;
