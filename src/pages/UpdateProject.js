import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import UpdateProjectForm from '../components/UpdateProjectForm';
import { useLocation } from 'react-router-dom';

const UpdateProject = () => {
    const location = useLocation();
    const project = location.state?.data;
    //console.log(project);
  return (
    <div>
        <Header headertext="Update Project" />
        <UpdateProjectForm project= {project} />
        <Navbar />
    </div>
  );
};

export default UpdateProject;
