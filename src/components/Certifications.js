import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { PiCertificateFill } from "react-icons/pi";
import { insertData } from "../utils/insertUtils";
import { backendUrl, appendToUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Certifications = (props) => {
  const certifications = props.certifications;
  const nonEditable = props.nonEditable;
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const [addNew, setAddNew] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [date_from, setDateFrom] = useState("");
  const [date_to, setDateTo] = useState("");

  async function addCertification(data) {
    //check for empty string

    if (
      data.title === "" ||
      data.description === "" ||
      data.link === "" ||
      data.date_from === "" ||
      data.date_to === ""
    ) {
      window.alert("Please fill all the fields");
      return;
    }
    const token = getLocalStorage();
    const to_date = new Date(data.date_to).toISOString();
    const from_date = new Date(data.date_from).toISOString();

    const body = {
      title: data.title,
      description: data.description,
      link: data.link,
      date_from: from_date,
      date_to: to_date,
    };
    const url = appendToUrl(backendUrl, "user/certifications");
    const response = await insertData([body], url, token);

    if (response.ok) {
      window.alert("Certification added successfully");
    } else {
      window.alert("Failed to add certification");
    }
  }

  function convertDateToString(date) {
    // in format dd/mm//yyyy assume date is iso string
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    return `${year}/${month}/${day}`;
  }

  return (
    <Accordion>
      <AccordionSummary
        className="font-semibold text-xl"
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="text-orange-primary flex flex-row gap-2 items-center h-1">
          <PiCertificateFill />
          Certifications
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-4">
          {addNew && !nonEditable && (
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-lg">Title</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Description</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg">Link</label>
                <input
                  type="text"
                  className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col gap-1 w-5/12">
                  <label className="text-lg">Date Valid From</label>
                  <input
                    type="month"
                    className="w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    value={date_from}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1 w-5/12">
                  <label className="text-lg">Date Valid Till</label>
                  <input
                    type="month"
                    className="w-full border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                    value={date_to}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  setAddNew(false);
                  addCertification({
                    title,
                    description,
                    link,
                    date_to,
                    date_from,
                  });
                  setDateFrom("");
                  setDateTo("");
                  setDescription("");
                  setLink("");
                  setTitle("");
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

          {/* --------------------Uncomment to display certifications-------------------- */}

          {certifications.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-5"
            >
              <CgEditBlackPoint className="text-orange-primary" />
              <div className="w-full flex flex-col gap-1">
                <div className="text-base">
                  {item.title}, {convertDateToString(item.date_to)} ,
                  <a href={item.link}>Link</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Certifications;
