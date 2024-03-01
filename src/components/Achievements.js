import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";

const Achievements = (props) => {
  const achievements = props.achievements;

  const [addNew, setAddNew] = useState(false);

  return (
    <Accordion>
      <AccordionSummary
        className="font-semibold text-xl"
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="text-orange-primary flex flex-row gap-2 items-center h-1">
          <EmojiEventsIcon />
          Achievements
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-4">
        {addNew && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                />
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
          {achievements.map((item, index) => (
            <div key={index} className="flex flex-row justify-between items-center gap-5">
              <CgEditBlackPoint className="text-orange-primary" />
              <div className="w-full flex flex-col gap-1">
                <div className="text-base">
                  {item}
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Achievements;
