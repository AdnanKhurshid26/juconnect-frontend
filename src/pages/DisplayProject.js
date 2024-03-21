import React from "react";
import { FaPen } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { CgEditBlackPoint } from "react-icons/cg";
// import Gallery from "../components/Gallery";
import Progress from "../components/Progress";
import Participant from "../components/Participant";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Links from "../components/Links";
const DisplayProject = () => {
  const participant = [
    {
      name: "Aditya Ganguly",
      role: "Backend",
      start: "May 2023",
      end: "Present",
    },
    {
      name: "Souptik",
      role: "Search Algorithm",
      start: "April, 2021",
      end: "Present",
    },
    {
      name: "Ritodeep Sikdar",
      role: "Frontend",
      start: "April, 2021",
      end: "Present",
    },
    {
      name: "Prof. Sanjoy Kumar Saha",
      role: "Mentor",
      start: "April, 2021",
      end: "Present",
    },
  ];
  const progress = [
    {
      stage: "Ideation and HLD",
      describe: [
        {
          actionitem: "Design the HLD and DB schema",
          status: 1
        },
        {
          actionitem: "Fix the tech stack",
          status: 1
        },
        {
          actionitem: "Front end mocks",
          status: 1
      }],
      start: "Jan, 2024",
      end: "Feb, 2024",
    },
    {
      stage: "Prototype Phase I",
      describe: [
        {
          actionitem: "Developed a working prototype with frontend in react and tailwind and backend and schema with Jums and OTP based auth",
          status: 0
        },
        {
          actionitem: "Integrate all systems",
          status: -1
        },
      ],
      start: "Feb, 2024",
      end: "March, 2024",
    },
  ];

  const links =  [
    {
      title:"Github Link",
      link:"github.com"
    },
    {
      title:"Project Demo",
      link:"abc.com/project/demo"
    },
    {
      title:"Project Docs",
      link:"abc.com/project/docs"
    },

  ]

  return (
    <div>
      <Header headertext="Project" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md">
          <div className="flex flex-row w-full p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              <img
                src={require("../assets/project.png")}
                alt=""
                className="h-20 w-auto rounded-full"
              />
              <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold">
                {" "}
                Edit <FaPen />
              </button>
              <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold">

                Join <IoMdAddCircleOutline />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">JU Campus Connect</p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <MdDescription /> This project aims to increase project collaboration and matching between JU students, faculty and alumni
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <CgEditBlackPoint />
                Status: Ongoing
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <CgEditBlackPoint />
                Maximum Participants: 6
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <CgEditBlackPoint />
                Timeline: January, 2024 - May, 2024</div>
              </div>
          </div>
          <div className="flex flex-wrap gap-1 p-2 text-sm">
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              App Dev
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Project Search
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              React
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              MongoDB
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Hackathon
            </div>
            <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
              Software Development
            </div>
          </div>
          <div>
            <Participant participant={participant}/>
            <Progress progress={progress} />
            <Links links={links}/>
            {/* <Gallery/> */}
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

export default DisplayProject;
