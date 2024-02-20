import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header headertext="Home" />
      <div className="p-2 flex flex-col gap-4">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
