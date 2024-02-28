import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import SearchBar from '../components/SearchBar'
const Search = () => {
  return (
    <div>
      <Header headertext="Search" />
      <SearchBar />
      <div className="min-h-screen flex flex-col w-full gap-2  p-2">
        <ProjectCard/>
        <ProjectCard/>
      </div>

      <Navbar />
    </div>
  )
}

export default Search
