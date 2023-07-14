import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import Notice from "../components/Notice";
import Buttons from "../components/Buttons";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState();

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
    });
  }, []);
  console.log(user);

  return (
    <>
      <NavBar />
      <div className="w-full items-center flex justify-center">
        <div className="flex items-center justify-start w-[90%] md:flex-row xl:w-[80%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
          <div className="font-opensans tracking-wide text-sm">
            Welcome <span className="font-bold uppercase">{user?.fullname} , </span>Ready to
            boost your productivity and conquer academic challenges?
          </div>
        </div>
      </div>
      <div className="w-full items-center flex justify-center flex-col mb-10">
        <Notice />
        <Buttons />
      </div>
    </>
  );
};

export default Home;
