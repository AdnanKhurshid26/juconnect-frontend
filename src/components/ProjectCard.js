import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const ProjectCard = () => {
  return (
    <div className="flex flex-col bg-orange-dark p-4 rounded-md gap-3 text-white w-full">
      <div className="flex flex-row gap-2 items-center justify-start ">
        <img
          src={require("../assets/james.jpg")}
          alt=""
          className="h-10 w-auto rounded-full"
        />
        <div className="flex flex-col gap-0">
          <div className="text-md">Aditya Ganguly</div>
          <div className="text-sm">Professor at Jadavpur University</div>
        </div>
      </div>
      <div className=" font-semibold">
        Applications opened for "Generative AI and Web3" project
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        <button className="bg-white text-orange-primary border w-5/12 border-white px-2 py-1 flex flex-row gap-1 items-center justify-center text-lg font-bold rounded-md">
            <IoMdAddCircleOutline className="font-bold"/>
            Join
        </button>
        <div className="italic">18/02/2024</div>
      </div>
    </div>
  );
};

export default ProjectCard;
