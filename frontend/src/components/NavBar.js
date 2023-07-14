import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export const NavBar = () => {
  const navigate = useNavigate();
  const [loggedUserData, setLoggedUserData] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setLoggedUserData(data.user);
    });
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex items-center justify-between w-[90%] md:flex-row xl:w-[80%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
          <div className="left-side flex items-center justify-center">
            {/* logo */}
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685553246/logo1_xyzn0h.png"
                alt="logo"
                className="w-[6rem]"
              />
            </div>
            <span className="font-poppins ml-5 leading-relaxed">
              Study <span className="text-green">Smarter</span>, not{" "}
              <span className="text-green">Harder</span>
            </span>
          </div>
          <div className="right-side">
            <div className="nav-content flex items-center justify-center gap-x-6">
              <span>
                <BsSearch size={20} className="text-green" />
              </span>
              <span>
                <IoMdNotificationsOutline size={27} className="text-green" />
              </span>
              <div className="cursor-pointer">
                <Link to="/profile">
                  {loggedUserData && loggedUserData.profilePic ? (
                    <img
                      src={loggedUserData.profilePic}
                      alt="profile"
                      className="md:w-[2rem] xl:w-[3rem] xl:h-[3rem] md:h-[2rem] rounded-full border-solid border-2 border-green"
                    />
                  ) : loggedUserData && loggedUserData.gender === "male" ? (
                    <img
                      src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685553367/male-avatar_anrusj.png"
                      alt="profile"
                      className="md:w-[2rem] xl:w-[3rem] xl:h-[3rem] md:h-[2rem] rounded-full border-solid border-2 border-green"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685553415/female-avatar_awisdo.png"
                      alt="profile"
                      className="md:w-[2rem] xl:w-[3rem] xl:h-[3rem] md:h-[2rem] rounded-full border-solid border-2 border-green"
                    />
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
