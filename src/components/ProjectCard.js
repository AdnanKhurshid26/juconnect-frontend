import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const ProjectCard = (props) => {
  console.log(props.data)
  const getDateStringFromISO = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  }

  const data = props.data;
  return (
    <div className="flex flex-col bg-orange-dark p-4 rounded-md gap-3 text-white w-full min-w-80">
      <div className="flex flex-row gap-2 items-center justify-center ">
        <div className="flex flex-col gap-0">
          <div className="text-md">{data.title}</div>
        </div>
      </div>
      <div className=" font-semibold">
        {data.description}
      </div>
      <div className="flex flex-row justify-between items-center gap-3">
        {/* <button className="bg-white text-orange-primary border w-5/12 border-white px-2 py-1 flex flex-row gap-1 items-center justify-center text-lg font-bold rounded-md">
            <IoMdAddCircleOutline className="font-bold"/>
            Join
        </button> */}
        <div className="italic">{getDateStringFromISO(data.start_date)}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
