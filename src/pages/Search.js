import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
const Search = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");

  const token = getLocalStorage();
  const [searchedProjects, setSearchedProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await fetch(
        appendToUrl(backendUrl, "project/get_all_excluding_id"),
        options
      );
      if (response.ok) {
        const data = await response.json();
        setSearchedProjects(data);
        console.log(data);
      }
    }

    getProjects().then(() => console.log("Projects Fetched"));
  }, []);
  return (
    <div>
      <Header headertext="Search" />

      <div className="w-full flex flex-col items-center justify-center">
        <SearchBar />
        <div className="min-h-screen grid grid-cols-2 w-full lg:w-6/12 gap-2  p-2">
          {searchedProjects.map((project) => (
            <ProjectCard
              data={project}
              editable={false}
              id={project.id}
              key={project.id}
              notMember={true}
            />
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Search;
