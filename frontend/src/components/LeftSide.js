import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { TbMessageCircle2Filled } from "react-icons/tb";
import { MdLogout } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { SiAnswer } from "react-icons/si";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { authActions } from "../feature/authReducer";
axios.defaults.withCredentials = true;

const LeftSide = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //send logout request
  const sendLogoutRequest = async () => {
    const res = await axios
      .post("http://localhost:3001/logout", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
  };

  // logout handling-->
  const handleLogout = async () => {
    sendLogoutRequest()
      .then(() => dispatch(authActions.logout()))
      .then(() => navigate("/login"));
  };

  return (
    <>
      <div className="hidden md:w-[25%] md:flex flex-col gap-y-10 sticky top-10 h-max">
        <div className="w-full flex flex-col items-center justify-end">
          <div className="flex flex-col items-start justify-center gap-y-6 select-none">
            <Link to="/">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <AiFillHome color="#5fcf80" size={25} />
                </i>
                <span className="font-poppins">Home</span>
              </div>
            </Link>

            <Link to="/message">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <TbMessageCircle2Filled color="#5fcf80" size={25} />
                </i>
                <span className="font-poppins">Chat</span>
              </div>
            </Link>

            <Link to="/problem/academic">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <BsFillPatchQuestionFill color="#5fcf80" size={25} />
                </i>
                <span className="font-poppins">Problem</span>
              </div>
            </Link>

            <Link to="/tasker">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <FaTasks color="#5fcf80" size={25} />
                </i>
                <span className="font-poppins">Tasker</span>
              </div>
            </Link>

            <Link to="/answer/onlinesearch">
              <div className="flex gap-x-4 items-center justify-center cursor-pointer">
                <i>
                  <SiAnswer color="#5fcf80" size={25} />
                </i>
                <span className="font-poppins">Answer</span>
              </div>
            </Link>

            <div
              className="flex gap-x-4 items-center justify-center cursor-pointer"
              onClick={handleLogout}
            >
              <i>
                <MdLogout color="#5fcf80" size={25} />
              </i>
              <span className="font-poppins">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
