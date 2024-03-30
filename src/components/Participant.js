import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FcCollaboration } from "react-icons/fc";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { backendUrl,appendToUrl } from "../constants";
import { Numbers } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Participant = (props) => {
    const experience = props.participant;
    const [getLocalStorage, setLocalStorage, removeLocalStorage] =
      useLocalStorage("token");
    const token = getLocalStorage();
    const [addNew, setAddNew] = useState(false);

    const [email, setEmail] = useState("");
    const project_id = Number.parseInt(props.id);
    const creator_id=Number.parseInt(props.creator_id);

    const navigate = useNavigate();

    function emailCheck(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    async function addParticipant() {
      if (email.length == 0) {
        window.alert("Please fill all the fields");
        return;
      }

      if (!emailCheck(email)) {
        window.alert("Please enter a valid email");
        return;
      }
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ email: email, project_id: project_id}),
      };
      const response = await fetch(
        appendToUrl(backendUrl, `project/add_participant/notification`),
        options
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        window.alert(data.message);
        setEmail("");
      }
      else{
        console.log(data);
        window.alert(data.message);
      }
    }

    function navigateHandler(item){
      if(item.role==="Student"){
        navigate(`/student-profile-view/${item.email}`);
      }
      else if(item.role==="Faculty"){
        navigate(`/faculty-profile-view/${item.email}`);
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
            <FcCollaboration />
            Participants
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex flex-col gap-4">
            {addNew && (
              <div className="w-full flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Email</label>
                  <input
                    type="text"
                    className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* <div className="flex flex-col gap-1">
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
                </div> */}
                <button
                  onClick={() => {
                    addParticipant();
                    setAddNew(false);
                  }}
                  className="text-white mt-2 bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
                >
                  Save
                </button>
              </div>
            )}
            {!addNew && props.editable && (
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
                onClick = {()=>navigateHandler(item)}
              >
                <CgEditBlackPoint className="text-orange-primary" />
                <div className="w-full flex flex-col gap-1">
                  <div className="text-lg font-semibold">
                    <img
                      src={require("../assets/james.jpg")}
                      alt=""
                      className="h-10 w-auto rounded-full"
                    />
                    {item.name}{" "}{item.id===creator_id && <span className="text-md text-orange-primary">Creator</span>}
                  </div>
                  <div className="text-base">
                    {item.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    );
  };
export default Participant
