import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { CiNoWaitingSign } from "react-icons/ci";
import { GrInProgress } from "react-icons/gr";

const Progress = (props) => {
  const progress = props.progress;

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
        <GrInProgress />
          Progress
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-4">
          {addNew && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Highlights/Stage</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Tasks</label>
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
          {progress.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-5"
            >
              <CgEditBlackPoint className="text-orange-primary" />
              <div className="w-full flex flex-col gap-1">
                <div className="text-lg font-semibold">{item.stage}</div>
                <div className="text-base text-sm">
                  ({item.start} - {item.end})
                </div>
                {/* <div className="text-base font-semibold">{item.describe}</div> */}
                {item.describe.map((actionitem, innerindex) => (
                  <div
                    key={innerindex}
                    className="flex flex-row items-center gap-1"
                  >
                    {((actionitem.status===1)&&(<IoCheckmarkDoneCircleSharp />))||
                    ((actionitem.status===0)&&(<GrInProgress />))||
                    ((actionitem.status===-1)&&(<CiNoWaitingSign />))}
                    <div className="text-base text-lg text-sm italic">{actionitem.actionitem}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Progress;
