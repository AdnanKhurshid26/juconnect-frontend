import React, { useEffect, useState } from "react";
import { FaLocationDot, FaPen } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import ExpandableInput from "../components/ExpandableInput";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import Publications from "../components/Publications";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { insertData } from "../utils/insertUtils";

const FacultyProfile = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");

  const token = getLocalStorage();

  const [facultyProfile, setFacultyProfile] = useState({});
  console.log(token);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [researchInterests, setResearchInterests] = useState([]);
  const [inputResearchInterest, setInputResearchInterest] = useState("");
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    async function getFacultyProfile() {
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
        console.log(data);
        setFacultyProfile(data);
        setResearchInterests(data.faculty_profile.research_interests);
      }
    }

    getFacultyProfile().then(() => console.log("Faculty Profile Fetched"));
  }, []);

  async function updateProfile(){
    if(facultyProfile.name.length == 0 || facultyProfile.designation.length == 0 || facultyProfile.department.length == 0){
      window.alert("Please fill all the fields");
      return;
    }

    const data = {
      name: facultyProfile.name,
      designation: facultyProfile.designation,
      department: facultyProfile.department,
    };

    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(
        appendToUrl(backendUrl, "profile"),
        options
      );

      if (response.ok) {
        const responseData = await response.json();
        window.alert(responseData.message);
      }

    } catch (e) {
      window.alert(e.message);
    }
  }

  async function addResearchInterest() {
    const data = {
      research_interest_name: inputResearchInterest,
    };

    try {
      const responseData = await insertData(
        data,
        appendToUrl(
          backendUrl,
          "user/research_interests/add_research_interest_name"
        ),
        token
      );
      window.alert(responseData.message);

      setResearchInterests([
        ...researchInterests,
        { name: inputResearchInterest },
      ]);
    } catch (e) {
      window.alert(e.message);
    }
  }
  if (Object.keys(facultyProfile).length == 0) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header headertext="Faculty Profile" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full lg:items-center">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md lg:w-6/12">
          <div className="flex flex-row w-full  p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              {/* <img
                src={require("../assets/james.jpg")}
                alt=""
                className="h-20 w-auto rounded-full"
              /> */}
              <button
                className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold 
              "
                onClick={() => {
                  if (editable) {
                    updateProfile();
                  }
                  let edit = editable;
                  setEditable(!edit);
                }}
              >
                {" "}
                {editable ? "Save" : "Edit"} <FaPen />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">
                <ExpandableInput
                  value={facultyProfile.name}
                  className={
                    "bg-transparent " + (editable ? "" : "focus:outline-none")
                  }
                  readOnly={!editable}
                  onChange={(event) => {
                    if (editable) {
                      setFacultyProfile({
                        ...facultyProfile,
                        name: event.target.value,
                      });
                    }
                  }}
                />
              </p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool /> {facultyProfile.email}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool />
                
                <ExpandableInput
                  value={facultyProfile.designation}
                  className={
                    "bg-transparent " + (editable ? "" : "focus:outline-none")
                  }
                  readOnly={!editable}
                  onChange={(event) => {
                    if (editable) {
                      setFacultyProfile({
                        ...facultyProfile,
                        designation: event.target.value,
                      });
                    }
                  }}
                />
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool />
                <ExpandableInput
                  value={facultyProfile.department}
                  className={
                    "bg-transparent " + (editable ? "" : "focus:outline-none")
                  }
                  readOnly={!editable}
                  onChange={(event) => {
                    if (editable) {
                      setFacultyProfile({
                        ...facultyProfile,
                        department: event.target.value,
                      });
                    }
                  }}
                />
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
            {toggleAdd && (
              <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
                <input
                  type="text"
                  value={inputResearchInterest}
                  onChange={(e) => setInputResearchInterest(e.target.value)}
                ></input>
              </div>
            )}
            <div
              className="bg-orange-500 text-white-500 font-medium px-1 rounded flex items-center justify-center"
              onClick={() => {
                let add = toggleAdd;

                if (add && inputResearchInterest.length > 0) {
                  addResearchInterest();
                  setInputResearchInterest("");
                }
                setToggleAdd(!add);
              }}
            >
              {toggleAdd
                ? inputResearchInterest.length > 0
                  ? "Save"
                  : "Close"
                : "Add"}
            </div>
          </div>
          <div>
            {/* <Experience experience={experience}/>
            <Education education={education} />
            <Achievements achievements={achievements} />
            <Publications publications={publications}/> */}

            <Publications publications={facultyProfile.faculty_profile.publications} />
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full lg:w-6/12">
          <p className="text-2xl font-semibold">Projects created by you</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            {Object.keys(facultyProfile).length > 0 &&
              facultyProfile.created_projects.map((project) => (
                <ProjectCard data={project} id={project.id} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full lg:w-6/12">
          <p className="text-2xl font-semibold">Projects joined</p>
          <div className="flex flex-row overflow-scroll w-full gap-2 ">
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

export default FacultyProfile;
