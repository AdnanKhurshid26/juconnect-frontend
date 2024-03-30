import React from "react";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { backendUrl, appendToUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FacultyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage("token");
  const [getRole,setRole,removeRole] = useLocalStorage("role")

  async function submitHandler() {
    console.log("Here")
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };
    const response = await fetch(
      appendToUrl(backendUrl, "auth/login/faculty"),
      options
    );
    
    setEmail("");
    setPassword("");

    if (response.ok) {
      const data = await response.json();
      setLocalStorage(data.token);
      setRole(data.role)
      if(data.role=="Student"){
        navigate("/student-profile");
      }

      else{
        navigate("/faculty-profile");
      }
      console.log(data);
    }

    else{
      const data = await response.json();
      alert(data.message)
    }
  }
  return (
    <div className="flex bg-backg-light">
      <div className="gap-5 flex flex-col justify-start items-center h-screen w-full pt-10">
        <img
          src={require("../assets/logo.png")}
          alt=""
          className="h-40 w-auto"
        />
        <div className="p-2 w-full text-center bg-[#a18d8d] font-normal text-white text-xl px-2">
          Faculty Login
        </div>
        <div className="p-2 w-full text-center bg-[#a18d8d] font-normal text-white text-xl px-2">
          Connect and Collaborate with ease
        </div>
        <div className="px-8 flex flex-col gap-4 w-full">
          <div className=" w-full flex flex-col gap-2 tracking-wider">
            <label className="text-lg font-semibold text-neutral-600 ">
              Email
            </label>
            <input
              className="w-full bg-backg-light font-semibold border-2 border-neutral-500  h-12 rounded-md p-4  text-neutral-600 text-lg focus:outline-none"
              placeholder="Enter your Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" w-full flex flex-col gap-2 tracking-wider">
            <label className="text-lg font-semibold text-neutral-600 ">
              Password
            </label>
            <input
              className="w-full bg-backg-light font-semibold border-2 border-neutral-500  h-12 rounded-md p-4  text-neutral-600 text-lg focus:outline-none"
              placeholder="Enter your Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          {/* <div className=" w-full flex flex-col gap-2 tracking-wider">
            <label className="text-lg font-semibold text-neutral-600 ">
              Confirm Password
            </label>
            <input
              className="w-full bg-backg-light font-semibold border-2 border-neutral-500  h-12 rounded-md p-4  text-neutral-600 text-lg focus:outline-none"
              placeholder="Enter your Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div> */}

          {/* <div className=" w-full flex flex-col gap-2 tracking-wider">
            <label className="text-lg font-semibold text-neutral-600 ">
              Email
            </label>
            <input
              className="w-full bg-backg-light font-semibold border-2 border-neutral-500  h-12 rounded-md p-4  text-neutral-600 text-lg focus:outline-none"
              placeholder="Enter your email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div> */}
          <button
            className="h-12 rounded-md text-white text-xl font-lg font-bold text-center w-full bg-red-primary cursor-pointer"
            onClick={submitHandler}
          >
            Login
          </button>
          <div class="inline-flex items-center py-4  justify-center w-full">
            <hr class="w-full h-px bg-gray-200 border-0 dark:bg-gray-700" />
            <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-backg-light left-1/2 ">
              or
            </span>
          </div>
          {/* <div className="w-full flex flex-row gap-10 ">
            <button className="h-12 rounded-md  text-white text-xl font-lg font-bold text-center w-full bg-orange-primary cursor-pointer">
              JUMS
            </button>
            <button className="h-12 rounded-md  text-white text-xl font-lg font-bold text-center w-full bg-orange-primary  cursor-pointer">
              Google
            </button>
          </div> */}
          <div className="text-center w-full text-lg">
            Don't have an account?{" "}
            <button className="text-orange-primary font-bold text-xl" onClick={()=>{navigate("/faculty-signup")}}>
              Signup
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;