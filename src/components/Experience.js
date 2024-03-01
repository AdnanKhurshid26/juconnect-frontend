import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline, IoMdSchool } from "react-icons/io";

const Experience = (props) => {
    const experience = props.experience;
  
    const [addNew, setAddNew] = useState(false);
  
    return (
      <Accordion>
        <AccordionSummary
          className="font-semibold text-xl flex flex-row justify-between"
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="text-orange-primary flex flex-row gap-2 items-center h-1 w-full">
            <IoMdSchool />
            Experience
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-4">
            {addNew && (
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Company</label>
                  <input
                    type="text"
                    className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Role</label>
                  <input
                    type="text"
                    className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  />
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-1 w-5/12">
                    <label className="text-lg">Start</label>
                    <input
                      type="month"
                      className=" w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-5/12">
                    <label className="text-lg">End</label>
                    <input
                      type="month"
                      className="w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAddNew(false);
                  }}
                  className="text-white mt-2 bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
                >
                  Save
                </button>
              </div>
            )}
            {!addNew && (
              <button
                onClick={() => {
                  setAddNew(true);
                }}
                className="text-white bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
              >
                <IoMdAddCircleOutline className="font-bold" />
                Add
              </button>
            )}
            {experience.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between items-center gap-5"
              >
                <CgEditBlackPoint className="text-orange-primary" />
                <div className="w-full flex flex-col gap-1">
                  <div className="text-lg font-semibold">{item.name}</div>
                  <div className="text-base">
                    {item.role}, {item.start}-{item.end}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };
export default Experience
