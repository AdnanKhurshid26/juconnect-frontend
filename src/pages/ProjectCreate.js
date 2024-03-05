import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import AddProjectForm from '../components/ProjectCreateForm';
const CreateProject = () => {

  return (
    <div>
        <Header headertext="Add Project" />
        <AddProjectForm />
        <Navbar />
    </div>
  );
};

export default CreateProject;
