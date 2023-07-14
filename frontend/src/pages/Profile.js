import React, { useEffect, useState } from "react";
import { AiFillSetting, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { NavBar } from "../components/NavBar";
import LeftSide from "../components/LeftSide";
axios.defaults.withCredentials = true;

export const Profile = () => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChanged] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      setIsLoading(false);
    });
  }, [stateChanged]);

  return (
    <>
      <NavBar />
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
          {/* left side  */}
          <LeftSide />
          {/* right side start  */}
          <div className="md:w-[75%] w-full">
            <div className="w-full flex md:flex-row flex-col justify-center items-center gap-y-5 md:gap-y-0 md:justify-start">
              <div className="w-[25%] flex items-center justify-around">
                {isLoading || !user ? (
                  <Skeleton circle={true} width="7rem" height="7rem" />
                ) : user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="profile-photo"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                ) : user.gender === "male" ? (
                  <img
                    src="../assets/images/male-avatar.png"
                    alt="profile-photo"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                ) : (
                  <img
                    src="../assets/images/female-avatar.png"
                    alt="profile-photo"
                    className="w-[7rem] h-[7rem] rounded-full"
                  />
                )}
              </div>
              <div className="flex items-center justify-center md:items-start md:justify-start flex-col gap-y-1 w-full md:w-[40%]">
                {isLoading || !user ? (
                  <Skeleton width="10rem" />
                ) : (
                  <span className="text-lg font-semibold">{user.fullname}</span>
                )}
                {isLoading || !user ? (
                  <Skeleton width="8rem" />
                ) : (
                  <span className="text-base font-poppins font-semibold">
                    {user.username}
                  </span>
                )}
                {isLoading || !user ? (
                  <Skeleton width="6rem" />
                ) : (
                  <span className="text-sm ">{user.who}</span>
                )}
              </div>
              <div className="md:w-[75%] w-full flex items-center justify-center md:justify-start cursor-pointer">
                {isLoading ? (
                  <Skeleton width="9rem" height="2.5rem" />
                ) : (
                  <span
                    className="py-2 px-4 bg-green w-36 flex gap-x-2 items-center justify-center text-white rounded-md"
                    onClick={(e) => setIsEditProfile(true)}
                  >
                    Edit profile <AiFillSetting size={25} />
                  </span>
                )}
              </div>
            </div>

            {/* edit profile start  */}
            {/* {isEditProfile ? (
              <EditProfile
                props={handleBoolValueChange}
                loggedUserData={user}
              />
            ) : null} */}
            {/* edit profile end  */}

            {/* following follwers start  */}

            {/* bio start  */}
            <div className="w-full flex items-center justify-center gap-x-4 my-2 md:my-5 select-none">
              {user ? (
                <div className="md:w-[35%] w-[80%] pb-2 flex items-center justify-center">
                  <span className="font-opensans text-xs md:text-sm">
                    {user?.bio}
                  </span>
                </div>
              ) : (
                <Skeleton width={200} height={20} />
              )}
            </div>

            {/* right side end  */}
            <hr className="border-1 border-black my-5" />
          </div>
        </div>
      </div>
    </>
  );
};
