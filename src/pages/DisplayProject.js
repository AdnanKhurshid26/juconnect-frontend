import React, { useEffect, useState } from "react";
import { CgEditBlackPoint } from "react-icons/cg";
import { MdDescription } from "react-icons/md";
// import Gallery from "../components/Gallery";
import { useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import Links from "../components/Links";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Participant from "../components/Participant";
import Progress from "../components/Progress";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { insertData } from "../utils/insertUtils";
import ExpandableInput from "../components/ExpandableInput";

const DisplayProject = () => {
  const { id } = useParams();
  const {state} = useLocation();
  // console.log(id)
  const getDateStringFromISO = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
  };

  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");

  const token = getLocalStorage();

  const [project, setProject] = useState({});
  const [toggleAdd, setToggleAdd] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    async function getProject() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await fetch(
        appendToUrl(backendUrl, `project/${id}`),
        options
      );
      if (response.ok) {
        const data = await response.json();
        setProject(data);
        console.log(data);
        setTags(data.tags);
      }
    }

    getProject().then(() => {});
  }, []);

  async function addTag() {
    //get concatenated string of all tags as well as input tag
    const allTags = tags.map((tag) => tag.name);
    allTags.push(inputTag);

    const tagString = allTags.join(" ");

    const data = {
      tag_name: inputTag,
      project_id: Number.parseInt(id),
      tag_string: tagString,
    };
    try {
      const responseData = await insertData(
        data,
        appendToUrl(backendUrl, "project/add_tag_name"),
        token
      );
      window.alert(responseData.message);

      setTags([...tags, { name: inputTag }]);
    } catch (e) {
      window.alert(e.message);
    }
  }

  async function updateProject(){
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(project),
    };
    const response = await fetch(
      appendToUrl(backendUrl, `project`),
      options
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      window.alert(data.message);
    }
    else{
      const data = await response.json();
      console.log(data);
      window.alert(data.message);
    }
  }
  if (Object.keys(project).length === 0) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <Header headertext="Project" />
      <div className="min-h-screen flex flex-col p-2 gap-2 w-full lg:items-center">
        <div className="flex flex-col gap-2 border-2 border-slate-200 rounded-md lg:w-6/12">
          <div className="flex flex-row w-full p-4  gap-5 bg-orange-primary rounded-t-md text-white ">
            <div className="flex flex-col gap-3">
              <img
                src={require("../assets/project.png")}
                alt=""
                className="h-20 w-auto rounded-full"
              />
              {/* <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold">
                {" "}
                Edit <FaPen />
              </button>
              <button className="px-2 py-1 border-white rounded-md bg-white text-orange-primary border flex flex-row items-center justify-center gap-2 font-semibold">

                Join <IoMdAddCircleOutline />
              </button> */}
              {project.editable && (
                <div className="flex flex-row gap-5 items-center justify-center">
                  <button
                    className="text-white mt-2 bg-red-primary py-1  text-base font-semibold rounded-md w-1/2"
                    onClick={() => {
                      if(editable){
                        updateProject();
                      }
                      let edit = editable;
                      setEditable(!edit);
                    }}
                  >
                    {editable ? "Save" : "Edit"}
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-2xl font-semibold ">
              <ExpandableInput
                  value={project.title}
                  className={
                    "bg-transparent " + (editable ? "" : "focus:outline-none")
                  }
                  readOnly={!editable}
                  onChange={(event) => {
                    setProject({ ...project, title: event.target.value });
                  }}
                />
              </p>
              <div className="flex flex-row gap-1 justify-start items-center">
                <MdDescription />{" "}
                <ExpandableInput
                  value={project.description}
                  className={
                    "bg-transparent " + (editable ? "" : "focus:outline-none")
                  }
                  readOnly={!editable}
                  onChange={(event) => {
                    setProject({ ...project, description: event.target.value });
                  }}
                />
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <CgEditBlackPoint />
                Status: Ongoing
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <CgEditBlackPoint />
                Maximum Participants: <input
                  type="number"
                  value={project.max_members}
                  className={
                    "bg-transparent " + (editable ? "" : "focus:outline-none")
                  }
                  readOnly={!editable}
                  onChange={(event) => {
                    setProject({ ...project, max_members: Number.parseInt(event.target.value) });
                  }}>
                  
                </input>
              </div>
              <div className="flex flex-row gap-1 justify-start items-center">
                <CgEditBlackPoint />
                Start Date: {getDateStringFromISO(project.start_date)}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 p-2 text-sm">
            {tags.map((tag, index) => {
              return (
                <div
                  key={index}
                  className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center"
                >
                  {tag.name}
                </div>
              );
            })}
            {toggleAdd && (
              <div className="bg-slate-100 text-neutral-500 font-medium px-1 rounded flex items-center justify-center">
                <input
                  type="text"
                  value={inputTag}
                  onChange={(e) => setInputTag(e.target.value)}
                ></input>
              </div>
            )}
            {project.editable && (
              <div
                className="bg-orange-500 text-white-500 font-medium px-1 rounded flex items-center justify-center"
                onClick={() => {
                  let add = toggleAdd;

                  if (add && inputTag.length > 0) {
                    addTag();
                    setTags([...tags, inputTag]);
                    setInputTag("");
                  }
                  setToggleAdd(!add);
                }}
              >
                {toggleAdd ? (inputTag.length > 0 ? "Save" : "Close") : "Add"}
              </div>
            )}
          </div>
          {state && state.notMember && (
            <div className="flex flex-row gap-5 items-center justify-center">
              You are not a member of this project. Consider contacting the
              creator to join.
            </div>
          )}
          <div>
            <Participant
              participant={project.users}
              id={id}
              editable={project.editable}
              creator_id={project.creator_id}
            />
            <Progress
              progress={project.timeline_events}
              id={id}
              editable={project.editable}
            />
            
            <Links links={project.project_links} editable={project.editable} id={id} />
            {/* <Links links={links}/> */}
            {/* <Gallery/> */}
          </div>
        </div>
        {/* <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects created by you</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div> */}
        {/* <div className="flex flex-col gap-2 border w-full">
          <p className="text-2xl font-semibold">Projects joined</p>
          <div className="flex flex-row overflow-scroll w-full gap-2">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
          </div>
        </div> */}
      </div>
      <Navbar />
    </div>
  );
};

export default DisplayProject;
