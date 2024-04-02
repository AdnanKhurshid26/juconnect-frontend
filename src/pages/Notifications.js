import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import { appendToUrl, backendUrl } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Spinner from "../components/Spinner";

const Notifications = () => {
  const [getLocalStorage, setLocalStorage, removeLocalStorage] =
    useLocalStorage("token");

  const token = getLocalStorage();
  const [loading, setLoading] = useState(true);
  const [receivedNotifs, setReceivedNotifs] = useState([]);
  const [sentNotifs, setSentNotifs] = useState([]);

  useEffect(() => {
    async function getSentNotifs() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await fetch(
        appendToUrl(backendUrl, "notification/get_notifs/from_id"),
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        data.map((notif) => {
          notif.requestNotif = false;
        })
        setSentNotifs(data);
      }
    }

    async function getReceivedNotifs() {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await fetch(
        appendToUrl(backendUrl, "notification/get_notifs/to_id"),
        options
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        data.map((notif) => {
          notif.requestNotif = true;
        })
        setReceivedNotifs(data);
      }
    }

    let promiseList = [];
    //use promise.all
    promiseList.push(getReceivedNotifs());
    promiseList.push(getSentNotifs());

    Promise.all(promiseList).then(() =>{
      console.log("All Notifications Fetched")
      setLoading(false);
    }
    );

  }, []);

  function removeReceiveNotifFromList(id){
    setReceivedNotifs(receivedNotifs.filter((notif) => notif.id !== id));
  }

  function removeSentNotifFromList(id){
    setSentNotifs(sentNotifs.filter((notif) => notif.id !== id));
  }

  if(loading){
    return (
      <div>
        <Header headertext="Notifications" />
        <div className="min-h-screen flex flex-col w-full">
          <div className="flex justify-center items-center h-20">
            <Spinner />
          </div>
        </div>
        <Navbar />
      </div>
    )
  }

  if (receivedNotifs.length === 0 && sentNotifs.length === 0) {
    return (
      <div>
        <Header headertext="Notifications" />
        <div className="flex flex-row justify-between items-center w-full border-b border-neutral-300 px-4 py-2 sticky bg-white">
          <div></div>
          <div className="text-lg font-semibold">Received Notifications</div>
          <div></div>
        </div>

        <div className="min-h-screen flex flex-col w-full">
          <div className="flex justify-center items-center h-20">
            <div className="text-lg font-semibold">No Notifications</div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-full border-b border-neutral-300 px-4 py-2 sticky bg-white">
          <div></div>
          <div className="text-lg font-semibold">Sent Notifications</div>
          <div></div>
        </div>

        <div className="min-h-screen flex flex-col w-full">
          <div className="flex justify-center items-center h-20">
            <div className="text-lg font-semibold">No Notifications</div>
          </div>
        </div>

        <Navbar />
      </div>
    );
  }

  return (
    <div>
      <Header headertext="Notifications" />
      {receivedNotifs.length > 0 && (
        <div className="flex flex-row justify-between items-center w-full  border-b border-neutral-300 px-4 py-2 bg-white">
          <div></div>
          <div className="text-lg font-semibold">Received Notifications</div>
          <div></div>
        </div>
      )}

      {receivedNotifs.length > 0 && (
        <div className="min-h-screen flex flex-col w-full lg:items-center ">
          {receivedNotifs.map((notif, index) => (
            <NotificationCard key={index} data={notif} removeReceiveNotifFromList={removeReceiveNotifFromList}/>
          ))}
        </div>
      )}

      {sentNotifs.length > 0 && (
        <div className="flex flex-row justify-between items-center w-full border-b border-neutral-300 px-4 py-2 sticky bg-white">
          <div></div>
          <div className="text-lg font-semibold">Sent Notifications</div>
          <div></div>
        </div>
      )}

      {sentNotifs.length > 0 && (
        <div className="min-h-screen flex flex-col w-full lg:items-center ">
          {sentNotifs.map((notif, index) => (
            <NotificationCard key={index} data={notif} />
          ))}
        </div>
      )}

      <Navbar />
    </div>
  );
};

export default Notifications;
