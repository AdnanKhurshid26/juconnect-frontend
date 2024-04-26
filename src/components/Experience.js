import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline, IoMdSchool } from "react-icons/io";
import { backendUrl,appendToUrl } from "../constants";
import { insertData } from "../utils/insertUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Experience = (props) => {
    const experience = props.experience;

    const nonEditable = props.nonEditable;
    const [addNew, setAddNew] = useState(false);
    const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage("token");

    const [company, setCompany] = useState("");
    const [designation, setDesignation] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    function convertDateToString(date){
      // in format dd/mm//yyyy assume date is iso string
      const d = new Date(date);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const day = d.getDate();
      return `${year}/${month}`;
    }

    const addExperience = async (data) => {
      const token = getLocalStorage();
      data.start_date = new Date(data.start_date).toISOString();
      data.end_date = new Date(data.end_date).toISOString();
      const url = appendToUrl(backendUrl, "user/work_experiences");
      const response = await insertData([data],url,token);
      console.log(response)
    }
  
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
            {addNew && !nonEditable && (
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Company</label>
                  <input
                    type="text"
                    className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    value={company}
                    onChange={((e) => setCompany(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Designation</label>
                  <input
                    type="text"
                    className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    value={designation}
                    onChange={((e) => setDesignation(e.target.value))}
                  />
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-col gap-1 w-5/12">
                    <label className="text-lg">Start</label>
                    <input
                      type="month"
                      className=" w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                      value={start}
                      onChange={((e) => setStart(e.target.value))}
                    />
                  </div>
                  <div className="flex flex-col gap-1 w-5/12">
                    <label className="text-lg">End</label>
                    <input
                      type="month"
                      className="w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                      value={end}
                      onChange={((e) => setEnd(e.target.value))}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setAddNew(false)
                    addExperience({ company, designation, start_date:start, end_date:end });
                    setCompany("");
                    setDesignation("");
                    setStart("");
                    setEnd("");
                  }}
                  className="text-white mt-2 bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
                >
                  Save
                </button>
              </div>
            )}
            {!addNew && !nonEditable && (
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
                  <div className="text-lg font-semibold">{item.company}</div>
                  <div className="text-base">
                    {item.designation}, {convertDateToString(item.start_date)}-{convertDateToString(item.end_date)}
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
