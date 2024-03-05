import React, { useState } from 'react';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    maxMembers: '',
    startDate: '',
    endDate: '',
    description: '',
    creatorId: '',
    demoLink: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your code here to submit the form data
    console.log(formData);
    // Reset form fields
    setFormData({
      title: '',
      maxMembers: '',
      startDate: '',
      endDate: '',
      description: '',
      creatorId: '',
      demoLink: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-orange-100 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block mb-1">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label htmlFor="maxMembers" className="block mb-1">Max Members:</label>
            <input type="number" id="maxMembers" name="maxMembers" value={formData.maxMembers} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-1">Start Date:</label>
            <input type="datetime-local" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-1">End Date:</label>
            <input type="datetime-local" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full" />
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-1">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full h-24"></textarea>
          </div>
          <div>
            <label htmlFor="creatorId" className="block mb-1">Creator ID:</label>
            <input type="number" id="creatorId" name="creatorId" value={formData.creatorId} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label htmlFor="demoLink" className="block mb-1">Demo Link:</label>
            <input type="text" id="demoLink" name="demoLink" value={formData.demoLink} onChange={handleChange} className="border border-red-500 rounded px-3 py-2 w-full" />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
