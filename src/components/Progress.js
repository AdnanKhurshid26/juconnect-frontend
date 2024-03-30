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
import { useLocalStorage } from "../hooks/useLocalStorage";
import { backendUrl, appendToUrl } from "../constants";

const Progress = (props) => {
  const progress = props.progress;

  const localDt = (
    dt // return local Date time
  ) => {
    let now = new Date(dt);
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setSeconds(0); // remove seconds
    now.setMilliseconds(0); // remove milliseconds
    return now;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    //also inclue time in the date (hours and minutes)
    //include hours and minutes
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

  };

  const id = Number.parseInt(props.id);
  console.log(id);

  const [addNew, setAddNew] = useState(false);
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const [newProgress, setNewProgress] = useState({
    title: "",
    description: "",
    date: new Date(),
    project_id: id,
  });
  const token = getLocalStorage();

  async function addTimeLine() {
    //take date to iso string
    if(newProgress.title===""||newProgress.description===""||newProgress.date===""){
      window.alert("Please fill all the fields");
      return;
    }
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(newProgress),
    };
    const response = await fetch(
      appendToUrl(backendUrl, `project/add_timeline`),
      options
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setNewProgress({
        title: "",
        description: "",
        date: "",
        project_id: id,
      });
    }
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
          <GrInProgress />
          TimeLine Events
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-4">
          {addNew &&  (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Title</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  value={newProgress.title}
                  onChange={(e) => {
                    setNewProgress({ ...newProgress, title: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Description</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  value={newProgress.description}
                  onChange={(e) => {
                    setNewProgress({
                      ...newProgress,
                      description: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col gap-1 w-5/12">
                  <label className="text-lg">Date</label>
                  <input
                    type="datetime-local"
                    className=" w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    value={localDt(newProgress.date).toISOString().slice(0, 16)}
                    onChange={(e) => {
                      setNewProgress({
                        ...newProgress,
                        date: new Date(e.target.value).toISOString(),
                      });
                    }}
                  />
                </div>
                {/* <div className="flex flex-col gap-1 w-5/12">
                  <label className="text-lg">End</label>
                  <input
                    type="month"
                    className="w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  />
                </div> */}
              </div>
              <button
                onClick={() => {
                  // const date = new Date(newProgress.date).toISOString();
                  // console.log(date)
                  // //change date of new progress
                  // setNewProgress({ ...newProgress, date: date });
                  console.log(newProgress);
                  addTimeLine();
                  setAddNew(false);
                }}
                className="text-white mt-2 bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          )}
          {!addNew && props.editable &&  (
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
                <div className="text-lg font-semibold">{item.title}</div>
                <div className="text-base text-sm">{formatDate(item.date)}</div>
                {/* <div className="text-base font-semibold">{item.describe}</div> */}
                <div className="text-base text-lg text-sm italic">
                  {item.description}
                </div>
                {/* {item.describe.map((actionitem, innerindex) => (
                  <div
                    key={innerindex}
                    className="flex flex-row items-center gap-1"
                  >
                    {((actionitem.status===1)&&(<IoCheckmarkDoneCircleSharp />))||
                    ((actionitem.status===0)&&(<GrInProgress />))||
                    ((actionitem.status===-1)&&(<CiNoWaitingSign />))}
                    <div className="text-base text-lg text-sm italic">{actionitem.actionitem}</div>
                  </div>
                ))} */}
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Progress;
