import React,{useState} from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = (props) => {
  const barValue = props.value
  return (
    <div className="flex flex-col gap-2 sticky bg-white top-16 p-3 lg:w-6/12 ">
      <div className="flex flex-row justify-between items-center w-full ">
        <input
          type="text"
          value = {barValue}
          onChange = {props.onSearchChange}
          className="border border-orange-dark bg-backg-light h-10 w-10/12 rounded-md px-2 py-1 text-lg"
        />

        <button className="pointer" onClick = {props.onSearchClick}>
          <IoSearch className="text-orange-dark w-full h-10" />
        </button>
      </div>
      <div className="text-xl font-semibold">Search Results</div>
    </div>
  );
};

export default SearchBar;
