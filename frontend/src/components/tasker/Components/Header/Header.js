import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import "../../App.css";

const Header = ({ setStageToShow }) => {
  return (
    <div className="header w-[100%]">
      <div className="w-[100%] flex items-center justify-center gap-x-5">
        <span
          onClick={() => setStageToShow("complete")}
          className=" text-[1rem] font-poppins cursor-pointer"
        >
          Completed
          <i
            style={{ marginLeft: "10px", color: "#39c983" }}
            className="fas fa-check-circle"
          ></i>
        </span>
        <span
          onClick={() => setStageToShow("inprogress")}
          className=" font-poppins cursor-pointer"
        >
          In Progress
          <i
            style={{ marginLeft: "10px", color: "#DDB21A" }}
            className="fas fa-tasks"
          ></i>
        </span>
        <span onClick={() => setStageToShow("")} className="font-poppins cursor-pointer">
          All
          <i
            style={{ marginLeft: "10px", color: "#ab89e3" }}
            className="fas fa-eye"
          ></i>
        </span>
      </div>
    </div>
  );
};

export default Header;
