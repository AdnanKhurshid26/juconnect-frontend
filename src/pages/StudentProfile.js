import React, { useEffect, useState } from "react";
import { FaLocationDot, FaPen } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import Achievements from "../components/Achievements";
import Education from "../components/Education";
import Experience from "../components/Experience";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Publications from "../components/Publications";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { backendUrl, appendToUrl } from "../constants";

const StudentProfile = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const token = getLocalStorage();
  const [studentProfile, setStudentProfile] = useState({});
  console.log(token)

  useEffect(() => {
    async function getStudentProfile() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await fetch(appendToUrl(backendUrl, "profile"), options);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setStudentProfile(data);
      }
    }

    getStudentProfile().then(() => console.log("Student Profile Fetched"));
  }, []);

  const experience = [
    {
      name: "Amazon India",
      role: "SDE Intern",
      start: "May 2023",
      end: "July 2023",
    },
    {
      name: "CMATER Lab",
      role: "Heavy ML Researcher",
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

  const achievements = [{
    title: "2 times HackOn with Amazon Winner",
    description: "Redbus Hackathon Winner",
    link: "abc.com/paper",
    date: "2023-05"
  }
  ];

  const publications = [
    {
      title: `Applications opened for "Generative AI and Web3" project`,
      link: "abc.com/paper",
    },
    {
      title: `Applications opened for "Generative AI and Web3" project`,
      link: "abc.com/paper",
    },
  ];

  return (
    <div>
      <Header headertext="Student Profile" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md">
          <div className="flex flex-row w-full p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold ">
                {" "}
                Edit <FaPen />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">{Object.keys(studentProfile).length>0 && studentProfile.name}</p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool /> {Object.keys(studentProfile).length>0 && studentProfile.student_profile.program}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <FaLocationDot />{Object.keys(studentProfile).length>0 && studentProfile.student_profile.degree_name}
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
            {Object.keys(studentProfile).length>0 && <Experience experience={studentProfile.student_profile.work_experiences} />}
            {Object.keys(studentProfile).length>0 && <Achievements achievements={studentProfile.student_profile.achievements} />}
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects created by you</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            {Object.keys(studentProfile).length>0 && studentProfile.projects.map((project) => (
              <ProjectCard data={project} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects joined</p>
          {/* <div className="flex flex-row overflow-scroll w-full gap-2">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div> */}
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default StudentProfile;
