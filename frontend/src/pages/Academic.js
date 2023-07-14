import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import LeftSide from "../components/LeftSide";
import axios from "axios";
import CreatePost from "../components/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../feature/postReducer";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Academic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stateChanged, setStateChanged] = useState(false);

  const updateState = (e, newState) => {
    e.preventDefault();
    setShowModal(newState);
    setStateChanged(!stateChanged);
  };

  useEffect(() => {
    dispatch(getAllPost())
      .then(() => setIsLoading(false))
      .catch((error) => console.log(error));
  }, [stateChanged]);


  const postDetails = useSelector((state) => state.posts.allPost.result);
  console.log(postDetails);

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

  return (
    <>
      <NavBar />
      <div className="w-full items-center flex justify-center">
        <div className="flex justify-start w-[90%] md:flex-row xl:w-[80%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
          <LeftSide />
          <div className="w-[60%]">
            <CreatePost loggedUserData={user} />
            {/* show post started */}
            {/* post div  */}
            <div className="flex flex-col gap-y-3 mb-24">
              {isLoading ? (
                <Skeleton count={5} height={200} />
              ) : (
                postDetails &&
                postDetails.map((val) => (
                  <>
                    <div
                      key={val._id}
                      onClick={(e) => {
                        navigate(`/problem/academic/${val._id}`);
                      }}
                    >
                      <Card
                        updateState={updateState}
                        postData={val}
                        postOwner={val.postedBy}
                        loggedUserData={user}
                      />
                    </div>
                  </>
                ))
              )}
            </div>
            {/* show post ended  */}
            {/* {showModal ? (
              <SinglePost
                setShowModal={setShowModal}
                updateState={updateState}
                postData={selectedPostData}
                loggedUserData={loggedUserData}
              />
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Academic;
