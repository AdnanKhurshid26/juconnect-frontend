import React from 'react';
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NotificationCard from '../components/NotificationCard';

const Notifications = () => {

    const notifs = [
        {
            name:'Aditya Ganguly',
            project:'Generative AI and Web3',
            requestNotif:true,
            seen:false,

        },
        {
            name:'Adnan Khurshid',
            project:'Nalla NLP Task',
            requestNotif:false,
            seen:true,
        },
        {
            name:'Aditya Ganguly',
            project:'Generative AI and Web3',
            requestNotif:true,
            seen:false,

        },
        {
            name:'Adnan Khurshid',
            project:'Nalla NLP Task',
            requestNotif:false,
            seen:true,
        },
        {
            name:'Aditya Ganguly',
            project:'Generative AI and Web3',
            requestNotif:true,
            seen:false,

        },
        {
            name:'Adnan Khurshid',
            project:'Nalla NLP Task',
            requestNotif:false,
            seen:true,
        },
        {
            name:'Aditya Ganguly',
            project:'Generative AI and Web3',
            requestNotif:true,
            seen:false,

        },
        {
            name:'Adnan Khurshid',
            project:'Nalla NLP Task',
            requestNotif:false,
            seen:true,
        },
    ]

  return (
    <div>
      <Header headertext="Notifications" />
      <div className="min-h-screen flex flex-col w-full border border-red-500">
        {notifs.map((notif, index) => (
          <NotificationCard
            key={index}
            data={notif}
          />
        ))}
      </div>

      <Navbar />
    </div>
  )
}

export default Notifications
