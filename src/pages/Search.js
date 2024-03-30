import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import SearchBar from '../components/SearchBar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { backendUrl,appendToUrl } from '../constants'
import userEvent from '@testing-library/user-event'
const Search = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");

  const token = getLocalStorage();
  const [searchedProjects,setSearchedProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await fetch(appendToUrl(backendUrl, "project/get_all_excluding_id"), options);
      if (response.ok) {
        const data = await response.json();
        setSearchedProjects(data);
        console.log(data);
      }
    }

    getProjects().then(() => console.log("Projects Fetched"));
  },[])
  return (
    <div>
      <Header headertext="Search" />
      <SearchBar/>
      <div className="min-h-screen flex flex-col w-full gap-2  p-2">
        {searchedProjects.map((project) => (
          <ProjectCard data={project} editable={false} id={project.id} key={project.id} notMember={true} />
        ))}
      </div>

      <Navbar />
    </div>
  )
}

export default Search
