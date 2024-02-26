import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { FaLocationDot, FaPen } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import PublicationCard from "../components/PublicationCard";
const StudentProfile = () => {
  return (
    <div>
      <Header headertext="Student Profile" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md">
          <div className="flex flex-row w-full p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              <img
                src={require("../assets/james.jpg")}
                alt=""
                className="h-20 w-auto rounded-full"
              />
              <button className="px-2 py-1 border-white border flex flex-row items-center justify-center gap-2 font-semibold ">
                {" "}
                Edit <FaPen />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">Aditya Ganguly</p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool /> Student at Jadavpur Univeristy
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <FaLocationDot /> Kolkata, West Bengal
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 p-2 text-sm">
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Machine Learning
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Big Data
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              UI
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Databases
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              NLP
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Software Development
            </div>
          </div>
          <div>
            <Accordion>
              <AccordionSummary
                className="font-semibold text-xl"
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <div className="text-orange-primary flex flex-row gap-2 items-center h-1">
                  <IoMdSchool />
                  Education
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between items-center gap-5">
                    <CgEditBlackPoint className="text-orange-primary" />
                    <div className="w-full flex flex-col gap-1">
                      <div className="text-lg font-semibold">
                        Jadavpur University
                      </div>
                      <div className="text-base">B.E CSE, 2020-2024</div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-5">
                    <CgEditBlackPoint className="text-orange-primary" />
                    <div className="w-full flex flex-col">
                      <div className="text-lg font-semibold">
                        La Martinière Calcutta
                      </div>
                      <div className="text-base">
                        Higher Secondary, 2018-2020
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
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
                  <div className="flex flex-row justify-between items-center gap-5">
                    <CgEditBlackPoint className="text-orange-primary" />
                    <div className="w-full flex flex-col gap-1">
                      <div className="text-base">
                        2 times HackOn with Amazon Winner
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center gap-5">
                    <CgEditBlackPoint className="text-orange-primary" />
                    <div className="w-full flex flex-col">
                      <div className="text-base">Redbus Hackathon Winner</div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
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
              <AccordionDetails>
                <div className="flex flex-row overflow-scroll w-full gap-2">
                  <PublicationCard />
                  <PublicationCard />
                  <PublicationCard />
                  <PublicationCard />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects created by you</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects joined</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default StudentProfile;
