import React,{useState,useEffect} from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import image from "../assets/james.jpg";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { appendToUrl, backendUrl } from "../constants";

const collaborators = [


    {
      id: 1,
      name: 'Aditya',
      description: 'BCSE-4',
      imageSrc: image,
      imageAlt: 'profile pic',
      href: '#',
    },
    {
        id: 2,
        name: 'Aditya',
        description: 'BCSE-4',
        imageSrc: image,
        imageAlt: 'profile pic',
        href: '#',
    },
    {
        id: 3,
        name: 'Aditya',
        description: 'BCSE-4',
        imageSrc: image,
        imageAlt: 'profile pic',
        href: '#',
    },
    {
        id: 3,
        name: 'Aditya',
        description: 'BCSE-4',
        imageSrc: image,
        imageAlt: 'profile pic',
        href: '#',
    },
    {
        id: 3,
        name: 'Aditya',
        description: 'BCSE-4',
        imageSrc: image,
        imageAlt: 'profile pic',
        href: '#',
    },
    {
        id: 3,
        name: 'Aditya',
        description: 'BCSE-4',
        imageSrc: image,
        imageAlt: 'profile pic',
        href: '#',
    },
  ]

const Home2 = (props) => {
    const [recommendations, setRecommendations] = useState([]);
    const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage("token");
    const token = getLocalStorage();

    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
      async function getProjects() {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        };
        
        let promiseArray  = [];
        promiseArray.push(fetch(appendToUrl(backendUrl, "project/recommendation"),options));
        promiseArray.push(fetch(appendToUrl(backendUrl, "project/most_recent"),options));

        const responses = await Promise.all(promiseArray);

        if (responses[0].ok) {
            const data = await responses[0].json();
            setRecommendations(data);
            console.log(data);
            }
        if (responses[1].ok) {
            const data = await responses[1].json();
            setRecentProjects(data);
            console.log(data);
            }   
      }
  
      getProjects().then(() => console.log("Projects Fetched"));
    }, []);
  return (
    <div className="min-h-screen flex flex-col p-2 gap-2 w-full lg:items-center">
      <Header headertext="Home" />

      <div class="flex justify-center items-center border rounded-md p-4">
        <img src={image} alt="Profile Picture" class="w-20 h-20 rounded-full mr-4" />
        <div class="flex flex-col">
            <h3 class="text-lg font-bold">John Doe's Dashboard</h3>
            <p class="text-gray-500">User Role: Student</p>
            <p class="text-gray-500">User Email: abc@gmail.com</p>
            <a href="/student-profile" class="text-gray-500 hover:underline">Profile Settings</a>
        </div>
      </div>
      
      {/* <div className="p-2 flex flex-col gap-4  lg:items-center">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div> */}

<div className="mx-auto flex max-w-7xl px-4 sm:px-4 lg:px-6">
    <div className="mx-auto max-w-2xl py-6 sm:py-10 lg:max-w-none lg:py-22">
        <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
        <div className="mt-6 gap-4 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
        {recentProjects.map((recommendation) => (
            <div className="group-relative">
            <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                <ProjectCard data={recommendation} id={recommendation.id}/>
            </div>
        </div>
            ))}
        </div>
        {/* <div className="mt-6 gap-4 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors:</p>
                    </h3>
                </div>
            </div>
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors: Aditya, Tanvir, Korim </p>
                    </h3>
                </div>
            </div>
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors:</p>
                    </h3>
                </div>
            </div>
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors:</p>
                    </h3>
                </div>
            </div>
                
        </div> */}
    </div>
</div>

<div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6">
    <div className="mx-auto max-w-2xl py-6 sm:py-6 lg:max-w-none lg:py-22">
        <h2 className="text-2xl font-bold text-gray-900">Recommended Projects</h2>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
        {recommendations.map((recommendation) => (
            <div className="group-relative">
            <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                <ProjectCard data={recommendation} id={recommendation.id}/>
            </div>
        </div>
            ))}
        </div>

        {/* <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors:</p>
                    </h3>
                </div>
            </div>
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors:</p>
                    </h3>
                </div>
            </div>
            <div className="group-relative">
                <div className="relative h-60 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-50">
                    <ProjectCard/>
                    <h3 className="mt-4 text-sm text-gray-500">
                    <p className="text-base font-semibold text-gray-900">Contributors:</p>
                    </h3>
                </div>
            </div>
                
        </div> */}
    </div>
</div>

<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl py-4 font-bold text-gray-900">Frequent Collaborators</h2>

        <div className="grid grid-cols-5 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {collaborators.map((collaborator) => (
            <a key={collaborator.id} href={collaborator.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={collaborator.imageSrc}
                  alt={collaborator.imageAlt}
                  className="h-40 w-40 object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{collaborator.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{collaborator.description}</p>
            </a>
          ))}
        </div>
      </div>

      <div className=" flex fixed right-0 top-1/2 transform -translate-y-1/2 gap-2 border lg:items-center justify-center rounded-md">    
<div class="flex flex-col items-end pl-8 pr-4 py-3">
    <div class="w-full md:pl-2 xl:pl-1 hover:transform hover:scale-110 transition-transform">
        <div class="bg-green-600 border rounded shadow p-3">
            <div class="flex flex-col">
                <div class="flex-shrink pl-1"><i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-center">
                    <h5 class="text-white">Profile Views</h5>
                    <h3 class="text-white text-3xl">50<span class="text-green-400"><i class="fas fa-caret-down"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full pt-3 md:pl-2 xl:pl-1 hover:transform hover:scale-110 transition-transform">
        <div class="bg-blue-600 border rounded shadow p-3">
            <div class="flex flex-col items-center">
                <div class="flex-shrink pl-1"><i class="fas fa-users fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-center">
                    <h5 class="text-white">Ongoing Projects</h5>
                    <h3 class="text-white text-3xl">3 <span class="text-blue-400"><i class="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full pt-3 md:pl-2 xl:pl-1 hover:transform hover:scale-110 transition-transform">
        <div class="bg-orange-600 border rounded shadow p-3">
            <div class="flex flex-col items-center">
                <div class="flex-shrink pl-1"><i class="fas fa-user-plus fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-center pr-1">
                    <h5 class="text-white">Completed Projects</h5>
                    <h3 class="text-white text-3xl">5 <span class="text-orange-400"><i class="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full pt-3 md:pl-2 xl:pl-1 hover:transform hover:scale-110 transition-transform">
        <div class="bg-red-600 border rounded shadow p-3">
            <div class="flex flex-col items-center">
                <div class="flex-shrink pl-1"><i class="fas fa-tasks fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-center">
                    <h5 class="text-white">To Do List</h5>
                    <h3 class="text-white text-3xl">7</h3>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full pt-3  md:pl-2 xl:pl-1 hover:transform hover:scale-110 transition-transform">
        <div class="bg-purple-600 border rounded shadow p-3">
            <div class="flex flex-col items-center">
                <div class="flex-shrink pl-1"><i class="fas fa-server fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-center">
                    <h5 class="text-white">New Notifications</h5>
                    <h3 class="text-white text-3xl">2</h3>
                </div>
            </div>
        </div>
    </div>
    {/* <div class="w-full md:w-1/2 xl:w-1/3 pt-3 px-3 md:pl-2 xl:pl-1">
        <div class="bg-pink-600 border rounded shadow p-2">
            <div class="flex flex-row items-center">
                <div class="flex-shrink pl-1 pr-4"><i class="fas fa-inbox fa-2x fa-fw fa-inverse"></i></div>
                <div class="flex-1 text-right">
                    <h5 class="text-white">Issues</h5>
                    <h3 class="text-white text-3xl">3 <span class="text-pink-400"><i class="fas fa-caret-up"></i></span></h3>
                </div>
            </div>
        </div>
    </div> */}
</div>
</div>


      <Navbar />
    </div>
  );
};

export default Home2;
