import React, { useEffect, useState } from "react";
import { FaLocationDot, FaPen } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import Achievements from "../components/Achievements";
import Experience from "../components/Experience";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { insertData } from "../utils/insertUtils";

const StudentProfile = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const token = getLocalStorage();
  const [studentProfile, setStudentProfile] = useState({});
  console.log(token);
  const [toggleAdd, setToggleAdd] = useState(false);
  const [professionalInterests, setProfessionalInterests] = useState([]);
  const [inputProfessionalInterest, setInputProfessionalInterest] =
    useState("");

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
        console.log(data);
        setStudentProfile(data);
        setProfessionalInterests(data.student_profile.professional_interests);
      }
    }

    getStudentProfile().then(() => console.log("Student Profile Fetched"));
  }, []);

  async function addProfessionalInterest() {
    const data = {
      professional_interest_name: inputProfessionalInterest,
    };

    try {
      const responseData = await insertData(
        data,
        appendToUrl(
          backendUrl,
          "user/professional_interests/add_professional_interest_name"
        ),
        token
      );
      window.alert(responseData.message);

      setProfessionalInterests([
        ...professionalInterests,
        { name: inputProfessionalInterest },
      ]);
    } catch (e) {
      window.alert(e.message);
    }
  }
  if (Object.keys(studentProfile).length == 0) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <Header headertext="Student Profile" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full lg:items-center">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md lg:w-6/12">
          <div className="flex flex-row w-full  p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold invisible">
                {" "}
                Edit <FaPen />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">
                {Object.keys(studentProfile).length > 0 && studentProfile.name}
              </p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool />{" "}
                {Object.keys(studentProfile).length > 0 && studentProfile.email}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <IoMdSchool />{" "}
                {Object.keys(studentProfile).length > 0 &&
                  studentProfile.student_profile.program}
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <FaLocationDot />
                {Object.keys(studentProfile).length > 0 &&
                  studentProfile.student_profile.degree_name}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 p-2 text-sm">
            {professionalInterests.map((interest) => (
              <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
                {interest.name}
              </div>
            ))}
            {toggleAdd && (
              <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
                <input
                  type="text"
                  value={inputProfessionalInterest}
                  onChange={(e) => setInputProfessionalInterest(e.target.value)}
                ></input>
              </div>
            )}
            <div
              className="bg-orange-500 text-white-500 font-medium px-1 rounded flex items-center justify-center"
              onClick={() => {
                let add = toggleAdd;

                if (add && inputProfessionalInterest.length > 0) {
                  addProfessionalInterest();
                  setInputProfessionalInterest("");
                }
                setToggleAdd(!add);
              }}
            >
              {toggleAdd
                ? inputProfessionalInterest.length > 0
                  ? "Save"
                  : "Close"
                : "Add"}
            </div>
          </div>
          <div>
            {Object.keys(studentProfile).length > 0 && (
              <Experience
                experience={studentProfile.student_profile.work_experiences}
              />
            )}
            {Object.keys(studentProfile).length > 0 && (
              <Achievements
                achievements={studentProfile.student_profile.achievements}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full  lg:w-6/12">
          <p className="text-2xl font-semibold">Projects created by you</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            {Object.keys(studentProfile).length > 0 &&
              studentProfile.created_projects.map((project) => (
                <ProjectCard data={project} id={project.id} />
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 border w-full  lg:w-6/12">
          <p className="text-2xl font-semibold">Projects joined</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            {Object.keys(studentProfile).length > 0 &&
              studentProfile.projects.map((project) => (
                <ProjectCard data={project} id={project.id} />
              ))}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default StudentProfile;
