import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import PublicationCard from "../components/PublicationCard";

const Publications = (props) => {
  const publications = props.publications;
  const [addNew, setAddNew] = useState(false);

  const notEditable = props.notEditable;

  return (
    <Accordion>
      <AccordionSummary
        className="font-semibold text-xl"
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="text-orange-primary flex flex-row gap-2 items-center h-1">
          <LibraryBooksIcon />
          Publications
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-2">
      {addNew && !notEditable && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Title</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Link</label>
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
          {!addNew && !notEditable &&(
            <button
              onClick={() => {
                setAddNew(true);
              }}
              className="text-white bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md w-full"
            >
              <IoMdAddCircleOutline className="font-bold" />
              Add
            </button>
          )}
        <div className="flex flex-row overflow-scroll w-full gap-2">
            {publications.map((item,index)=>(<PublicationCard key={index} publication={item} />))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Publications;
