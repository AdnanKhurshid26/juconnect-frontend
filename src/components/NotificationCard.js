import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
const {backendUrl, appendToUrl} = require("../constants");

const NotificationCard = (props) => {
    const data = props.data
    const [getLocalStorage, setLocalStorage, removeLocalStorage] = useLocalStorage("token");
    const token = getLocalStorage();

    const navigate = useNavigate();
    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    }


    async function acceptNotification(event) {
      event.stopPropagation();
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(appendToUrl(backendUrl, `notification/accept_notif`), options);
        if (response.ok) {
            const data = await response.json();
            window.alert(data.message);
            props.removeReceiveNotifFromList(data.id)
            console.log(data);
        }
        else{
            const data = await response.json();
            window.alert(data.message);
            console.log(data);
        }
    }


  return (
    <div
      className={`border-b-2 border-neutral-300 p-4 flex flex-row gap-2 justify-between items-center   lg:w-6/12 rounded-md  ${
        !data.seen && "bg-backg-light"
      }`}
      onClick = {() => navigate(`/project/${data.project_id}`)}
    >
      <img
        src={require("../assets/james.jpg")}
        alt=""
        className="h-16 w-auto rounded-full"
      />
      <div className="w-10/12 text-orange-dark flex flex-col gap-4">
        <div className="w-full flex flex-row justify-between items-center ">
          <div>

          <span className="text-lg font-semibold">{data.requestNotif ? data.from_name:data.to_name}</span>{" "}
          {data.requestNotif
            ? "Has invited you to join their project"
            : "Has been invited to join your project"}
            </div>
                      {data.requestNotif &&(
            <button className="text-white mt-2 bg-orange-primary  py-1 px-2 flex flex-row gap-1 items-center justify-center text-base font-semibold rounded-md"
            onClick={acceptNotification}>Accept</button>
          )}
        </div>
        <div className="w-full justify-between flex flex-row">
          <div className="text-lg font-semibold ">{data.project_name}</div>
          <div className="text-sm italic">{formatDate(data.date)}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
