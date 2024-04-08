import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Spinner from "../components/Spinner";
const Search = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");

  const [searchValue, setSearchValue] = useState("");
  const token = getLocalStorage();
  const [loading, setLoading] = useState(true);
  const [searchedProjects, setSearchedProjects] = useState([]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleSearch = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        search: searchValue,
      }),
    };

    const response = await fetch(
      appendToUrl(backendUrl, `project/search`),
      options
    );
    if (response.ok) {
      const data = await response.json();
      setSearchedProjects(data);
      setSearchValue("");
      setLoading(false);
    }

    else{
      window.alert("No projects found");
      setSearchValue("");
    }
  }

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
        appendToUrl(backendUrl, "project/recommendation"),
        options
      );
      if (response.ok) {
        const data = await response.json();
        setSearchedProjects(data);
        console.log(data);
        setLoading(false);
      }
    }

    getProjects().then(() => console.log("Projects Fetched"));
  }, []);
  if(loading){
    return (
      <div>
        <Header headertext="Search" />
        <div className="w-full flex flex-col items-center justify-center">
        <SearchBar/>
        <div className="min-h-screen grid grid-cols-2 w-full lg:w-6/12 gap-2  p-2">
          <Spinner />
        </div>
      </div>
        <Navbar />
      </div>
    )
  }
  return (
    <div>
      <Header headertext="Search" />

      <div className="w-full flex flex-col items-center justify-center">
        <SearchBar value={searchValue} onSearchChange={handleChange} onSearchClick={handleSearch}/>
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
