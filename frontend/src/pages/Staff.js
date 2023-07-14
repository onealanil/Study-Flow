import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import LeftSide from "../components/LeftSide";
import { AiOutlineSound } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoPersonAddOutline } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loggedUser, setLoggedUser] = useState();

  const sendRequestAllUser = async () => {
    const res = await axios
      .get(`http://localhost:3001/getalluser`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequestAllUser().then((data) => {
      setAllUsers(data.users);
    });
  }, []);

  const handleSearchFunction = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    const filtered = allUsers?.filter(
      (user) =>
        user.username.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.fullname.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  //my id
  const sendRequestLoggedUser = async () => {
    const res = await axios
      .get("http://localhost:3001/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequestLoggedUser().then((data) => {
      setLoggedUser(data.user);
      console.log(data.user);
    });
  }, []);

  //   add to conversation
  const addConversationHandler = async (id) => {
    await axios
      .post(
        `http://localhost:3001/message/conversation`,
        {
          senderId: loggedUser?._id,
          receiverId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        alert("Successfully Added!, Now you can chat")
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <NavBar />
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-4">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
          {/* left side  */}
          <LeftSide />
          {/* right side start  */}
          <div className="md:w-[75%] w-full">
            <div className="w-full flex md:flex-row flex-col justify-center items-center gap-y-5 md:gap-y-0 md:justify-start">
              {/* search function start */}
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[20rem] lg:h-[30rem] pb-5">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* search button */}
                  <div>
                    <form class="flex items-center">
                      <label for="simple-search" class="sr-only">
                        Search
                      </label>
                      <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green focus:border-green block md:w-96 pl-10 p-2.5"
                          placeholder="Search person..."
                          required
                          value={searchValue}
                          onChange={handleSearchFunction}
                          autoComplete="off"
                        />
                      </div>
                      <button
                        type="submit"
                        class="p-2.5 ml-2 text-sm font-medium text-orange bg-green rounded-lg focus:ring-4"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                        <span class="sr-only">Search</span>
                      </button>
                    </form>
                  </div>
                  <div
                    className="py-2 px-4 bg-green flex items-center justify-center space-x-3 text-white rounded-md cursor-pointer"
                    onClick={() => {
                      navigate("/message");
                    }}
                  >
                    <span>Go to chat</span>
                    <BiMessageRounded />
                  </div>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
                  <span className="text-green font-poppins">Results:</span>

                  {/* search results  */}
                  <div className="w-full md:w-[75%]">
                    {searchValue !== "" ? (
                      <>
                        {filteredUsers?.map((val) => (
                          <div
                            className="flex flex-row gap-x-2 w-full p-3 space-x-2 items-start justify-end select-none"
                            key={val._id}
                          >
                            <div className="w-[25%]">
                              <Link to={`/profile/${val._id}`}>
                                {val && val.profilePic ? (
                                  <img
                                    src={val.profilePic}
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                ) : val && val.gender === "male" ? (
                                  <img
                                    src="../assets/images/male-avatar.png"
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                ) : (
                                  <img
                                    src="../assets/images/female-avatar.png"
                                    alt="suggestion"
                                    className="w-[3rem] h-[3rem] rounded-full"
                                  />
                                )}
                              </Link>
                            </div>
                            <div className="w-[40%] flex flex-col gap-y-1">
                              <span className="text-sm font-poppins font-semibold  max-[1067px]:text-xs">
                                {val.fullname}
                              </span>
                              <span className="text-xs max-[1067px]:hidden">
                                {val?.who}
                              </span>
                            </div>
                            <div className="w-[35%] flex items-center justify-center cursor-pointer">
                              <div
                                className="flex gap-x-2 items-center justify-center mt-1 w-[100%] cursor-pointer py-2 px-4 bg-green text-xs rounded-md  max-[1067px]:bg-white text-white  max-[1067px]:text-green"
                                onClick={() => {
                                  addConversationHandler(val?._id);
                                }}
                              >
                                <span className="font-poppins text-xs">
                                  Add to Conversation
                                </span>
                                <IoPersonAddOutline size={25} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="flex gap-x-4 items-center justify-start">
                          <AiOutlineSound size={25} color="#5fcf80" />
                          <span>Type username or full name</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* search function end  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staff;
