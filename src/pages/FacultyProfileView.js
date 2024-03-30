import React, { useState, useEffect } from "react";
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
import { insertData } from "../utils/insertUtils";
import ExpandableInput from "../components/ExpandableInput";
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";

const FacultyProfileView = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const {email} = useParams();
  const token = getLocalStorage();

  const [facultyProfile, setFacultyProfile] = useState({});
  console.log(token);
  const [researchInterests, setResearchInterests] = useState([]);

  useEffect(() => {
    async function getFacultyProfile() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ email }),
      };

      const response = await fetch(appendToUrl(backendUrl, "profile/email"), options);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setFacultyProfile(data);
        setResearchInterests(data.faculty_profile.research_interests);
      }
    }

    getFacultyProfile().then(() => console.log("Faculty Profile Fetched"));
  }, []);

  if (Object.keys(facultyProfile).length == 0) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header headertext="Faculty Profile" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md">
          <div className="flex flex-row w-full p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              {/* <img
                src={require("../assets/james.jpg")}
                alt=""
                className="h-20 w-auto rounded-full"
              /> */}
              <button
                className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold 
              invisible"
              >
                {" "}
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">
                {facultyProfile.name}
              </p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool /> {facultyProfile.email}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool />
                {facultyProfile.designation}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool />
                {facultyProfile.department}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <FaLocationDot /> Kolkata, West Bengal
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 p-2 text-sm">
            {researchInterests.map((interest) => (
              <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
                {interest.name}
              </div>
            ))}
          </div>
          <div>
            {/* <Experience experience={experience}/>
            <Education education={education} />
            <Achievements achievements={achievements} />
            <Publications publications={publications}/> */}
            <Publications publications={facultyProfile.faculty_profile.publications} notEditable={true} />
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects created</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            {Object.keys(facultyProfile).length > 0 &&
              facultyProfile.created_projects.map((project) => (
                <ProjectCard data={project} id={project.id} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects joined</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            {Object.keys(facultyProfile).length > 0 &&
              facultyProfile.projects.map((project) => (
                <ProjectCard data={project} id={project.id} />
              ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default FacultyProfileView;
