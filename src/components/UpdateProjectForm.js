import React, { useState } from "react";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { insertData } from "../utils/insertUtils";

const UpdateProjectForm = ({ project: updateProj }) => {
  
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");
  const token = getLocalStorage();

  const [formData, setFormData] = useState({
    title: updateProj.title,
    max_members: updateProj.max_members,
    description: updateProj.description,
    demo_link: updateProj.demo_link,
  });

//   async function updateProject(){
//     const options = {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//       body: JSON.stringify(updateProj),
//     };
//     const response = await fetch(
//       appendToUrl(backendUrl, `project`),
//       options
//     );
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       window.alert(data.message);
//     }
//     else{
//       const data = await response.json();
//       console.log(data);
//       window.alert(data.message);
//     }
//   }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    console.log('update');
    return;
  };



  return (
    <div className="max-w-4xl mx-auto mt-8 bg-backg-light p-8 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Update Project</h1>
      <form onSubmit={handleUpdate}>
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
              className=" border-orange-primary border-2 rounded px-3 py-2 w-full"
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
              className=" border-orange-primary border-2 rounded px-3 py-2 w-full"
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
              className=" border-orange-primary border-2 rounded px-3 py-2 w-full h-24"
            ></textarea>
          </div>
          <div>
            <label htmlFor="demoLink" className="">
              Demo Link:
            </label>
            <input
              type="text"
              id="demo_link"
              name="demo_link"
              value={formData.demo_link}
              onChange={handleChange}
              className=" border-orange-primary border-2 rounded px-3 py-2 w-full"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-orange-dark text-white w-full font-semibold px-4 py-2 rounded hover:bg-orange-dark"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProjectForm;
