import React, { useState } from "react";
import { backendUrl, appendToUrl } from "../constants";
import { insertData } from "../utils/insertUtils";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AddProjectForm = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const [formData, setFormData] = useState({
    title: "",
    max_members: "",
    start_date: "",
    end_date: "",
    description: "",
    demo_link: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your code here to submit the form data
    const token = getLocalStorage();
    const url = appendToUrl(backendUrl, "project");

    formData.start_date = new Date(formData.start_date).toISOString();
    formData.end_date = new Date(formData.end_date).toISOString();
    formData.max_members = parseInt(formData.max_members);

    const response = await insertData(formData, url, token);

    if (response.ok) {
      console.log(response);
      // Reset form fields
      setFormData({
        title: "",
        max_members: "",
        start_date: "",
        end_date: "",
        description: "",
        demo_link: "",
      });
    } else {
      window.alert("Error in adding project");
      setFormData({
        title: "",
        max_members: "",
        start_date: "",
        end_date: "",
        description: "",
        demo_link: "",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-orange-100 p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block mb-1">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-red-500 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="maxMembers" className="block mb-1">
              Max Members:
            </label>
            <input
              type="number"
              id="max_members"
              name="max_members"
              value={formData.max_members}
              onChange={handleChange}
              className="border border-red-500 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block mb-1">
              Start Date:
            </label>
            <input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="border border-red-500 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block mb-1">
              End Date:
            </label>
            <input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="border border-red-500 rounded px-3 py-2 w-full"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-1">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-red-500 rounded px-3 py-2 w-full h-24"
            ></textarea>
          </div>
          <div>
            <label htmlFor="demoLink" className="block mb-1">
              Demo Link:
            </label>
            <input
              type="text"
              id="demo_link"
              name="demo_link"
              value={formData.demo_link}
              onChange={handleChange}
              className="border border-red-500 rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProjectForm;
