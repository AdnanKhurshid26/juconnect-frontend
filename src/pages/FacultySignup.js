import React from "react";
import { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { backendUrl, appendToUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FacultySignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [googleScholarUrl, setGoogleScholarUrl] = useState("");
  const navigate = useNavigate();

  const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage("token");

  async function submitHandler() {
    console.log("Here")
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, google_scholar_url: googleScholarUrl }),
    };

    if(!validateEmail(email)){
      alert("Invalid Email")
      return;
    }

    if(!confirmPasswordMatch(password, confirmPassword)){
        alert("Passwords do not match")
        return;
    }

    const response = await fetch(
      appendToUrl(backendUrl, "auth/signup/otp/faculty"),
      options
    );
    
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setGoogleScholarUrl("");

    if (response.ok) {
        if (response.ok) {
            const data = await response.json();
            navigate('/otp',{state: {email: email,role:"Faculty"}})
        }
    }

    else{
      const data = await response.json();
      alert(data.message)
    }
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function confirmPasswordMatch(password, confirmPassword) {
    return password.length > 0 && password === confirmPassword;
  }

  return (
    <div className="flex bg-backg-light overflow-auto">
      <div className="gap-5 flex flex-col justify-start items-center h-screen w-full pt-10">
        <img
          src={require("../assets/logo.png")}
          alt=""
          className="h-40 w-auto"
        />
        <div className="p-2 w-full text-center bg-[#a18d8d] font-normal text-white text-xl px-2">
          Faculty Signup
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



          <div className=" w-full flex flex-col gap-2 tracking-wider">
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
          </div>

          <div className=" w-full flex flex-col gap-2 tracking-wider">
            <label className="text-lg font-semibold text-neutral-600 ">
                Google Scholar URL
            </label>
            <input
              className="w-full bg-backg-light font-semibold border-2 border-neutral-500  h-12 rounded-md p-4  text-neutral-600 text-lg focus:outline-none"
              placeholder="Enter your Google Scholar Url"
              type="text"
              value={googleScholarUrl}
              onChange={(e) => setGoogleScholarUrl(e.target.value)}
            />
          </div>

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
            Sign Up
          </button>
          {/* <div className="w-full flex flex-row gap-10 ">
            <button className="h-12 rounded-md  text-white text-xl font-lg font-bold text-center w-full bg-orange-primary cursor-pointer">
              JUMS
            </button>
            <button className="h-12 rounded-md  text-white text-xl font-lg font-bold text-center w-full bg-orange-primary  cursor-pointer">
              Google
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default FacultySignup;