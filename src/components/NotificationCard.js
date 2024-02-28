import React from "react";

const NotificationCard = (props) => {
    const data = props.data
  return (
    <div
      className={`border-b-2 border-neutral-300 p-2 flex flex-row gap-2 justify-between items-center ${
        !data.seen && "bg-backg-light"
      }`}
    >
      <img
        src={require("../assets/james.jpg")}
        alt=""
        className="h-10 w-auto rounded-full"
      />
      <div className="w-10/12 text-orange-dark flex flex-col">
        <div className="w-full">
          <span className="text-lg font-semibold">{data.name}</span>{" "}
          {data.requestNotif
            ? "has requested to join your project."
            : "has accepted your request to join."}
        </div>
        <div className="w-full justify-between flex flex-row">
          <div className="text-lg font-semibold ">{data.project}</div>
          <div className="text-sm italic">1h</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
