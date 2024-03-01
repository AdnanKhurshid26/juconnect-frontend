import React from "react";
import { FaLocationDot, FaPen } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import Achievements from "../components/Achievements";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Publications from "../components/Publications";
const StudentProfile = () => {
  const experience = [
    {
      name: "Amazon India",
      role: "SDE Intern",
      start: "May 2023",
      end: "July 2023",
    },
    {
      name: "CMATER Lab",
      degree: "Heavy ML Researcher",
      start: "April, 2021",
      end: "Present",
    },
  ];
  const education = [
    {
      name: "Jadavpur University",
      degree: "B.E CSE",
      start: "2020",
      end: "2024",
    },
    {
      name: "La Martinière Calcutta",
      degree: "Higher Secondary",
      start: "2018",
      end: "2020",
    },
  ];

  const achievements = [
    "2 times HackOn with Amazon Winner","Redbus Hackathon Winner"
  ];

  const publications =  [
    {
      title:`Applications opened for "Generative AI and Web3" project`,
      link:"abc.com/paper"
    },
    {
      title:`Applications opened for "Generative AI and Web3" project`,
      link:"abc.com/paper"
    }
  ]

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
              <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold ">
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
            <Experience experience={experience}/>
            <Education education={education} />
            <Achievements achievements={achievements} />
            <Publications publications={publications}/>
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
