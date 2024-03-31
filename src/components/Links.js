import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React, { useState } from "react";
import { FaLink } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Links = (props) => {
  const links = props.links;
  const id = Number.parseInt(props.id);
  const [addNew, setAddNew] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [stateLink, setStateLink] = useState(links);

  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const token = getLocalStorage();

  async function addLink() {
    const linkData = {
      name: name,
      link: link,
      project_id: id,
    };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(linkData),
      };

      const response = await fetch(
        appendToUrl(backendUrl, "project/add_link"),
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.alert(data.message);
        setStateLink([...stateLink, linkData]);
      } else {
        window.alert("Error adding link");
      }

      setLink("");
      setName("");
    } catch (e) {
      window.alert(e.message);
    }
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
          <LibraryBooksIcon />
          Links
        </div>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col gap-2">
        {addNew && props.editable && (
          <div className="w-full flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-lg">Name</label>
              <input
                type="text"
                className="border border-orange-dark bg-backg-light rounded-sm p-1 px-2 text-base"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <button
              onClick={async () => {
                await addLink();
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
            className="text-white bg-orange-primary  py-1 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md w-full"
          >
            <IoMdAddCircleOutline className="font-bold" />
            Add
          </button>
        )}
        <div className="flex flex-row w-full gap-10">
          {stateLink.map((item, index) => (
            <div
              key={index}
              className="flex flex-row justify-between items-center gap-5"
            >
              <div className="flex flex-row gap-3 justify-center items-center">
                <FaLink className="text-orange-primary" />
                <div className="text-lg font-semibold">
                  <a target="_blank" href={item.link}>
                    {item.name}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Links;
