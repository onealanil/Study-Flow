import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import LeftSide from "../components/LeftSide";
import { FaCommentAlt } from "react-icons/fa";
import { BsFillHeartFill, BsFillSendCheckFill } from "react-icons/bs";
import { AiFillCloseCircle, AiTwotoneSave } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addComment } from "../feature/commentSlice";
import { format } from "timeago.js";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";

const SinglePage = () => {
  const dispatch = useDispatch();
  const id = useParams();
  const [postData, setPostData] = useState();
  // const toastId = useRef(null);
  // const [likeLength, setLikeLength] = useState(postData?.likes.length);
  // const [updatedPostData, setUpdatedPostData] = useState(postData);
  // const [updatedLoggedUserData, setUpdatedLoggedUsertData] =
  //   useState(loggedUserData);
  // const [comment, setComment] = useState("");
  // const [allComment, setAllComment] = useState();
  // const [saved, setSaved] = useState(false);

  // const closingHandler = (e) => {
  //   updateState(e, false);
  //   setShowModal(false);
  // };

  // const sendRequestComment = async () => {
  //   const res = await axios
  //     .get(`http://localhost:3001/post/${postData?._id}/comments`, {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };

  // useEffect(() => {
  //   sendRequestComment().then((data) => setAllComment(data.comments));
  // }, []);

  // const likePostHandler = async () => {
  //   try {
  //     const response = await axios.put(
  //       "http://localhost:3001/post/like",
  //       { postId: postData?._id },
  //       { withCredentials: true }
  //     );
  //     setUpdatedPostData(response.data.result); // update the state with new data
  //     setLikeLength(response.data.result.likes.length);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const unlikePostHandler = async () => {
  //   try {
  //     const response = await axios.put(
  //       "http://localhost:3001/post/unlike",
  //       { postId: postData?._id },
  //       { withCredentials: true }
  //     );
  //     setUpdatedPostData(response.data.result); // update the state with new data
  //     setLikeLength(response.data.result.likes.length);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const commentHandler = async () => {
  //   const data = {
  //     postId: postData?._id,
  //     comment,
  //   };
  //   dispatch(addComment(data));
  // };

  // const commentsData = useSelector((state) => state.comments);

  // const handleToast = (commentsData) => {
  //   switch (commentsData.allCommentStatus) {
  //     case "pending":
  //       if (toastId.current === null) {
  //         toastId.current = toast.info("Loading...", {
  //           position: "top-right",
  //           autoClose: 2000,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       }
  //       break;
  //     case "success":
  //       if (toastId.current !== null) {
  //         toast.update(toastId.current, {
  //           render: "Comment, added successfully",
  //           type: toast.TYPE.SUCCESS,
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         toastId.current = null;
  //         sendRequestComment().then((data) => setAllComment(data.comments));
  //         setComment("");
  //       }
  //       break;
  //     case "failed":
  //       if (toastId.current !== null) {
  //         toast.update(toastId.current, {
  //           render: "Something went wrong",
  //           type: toast.TYPE.ERROR,
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         toastId.current = null;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // // call the handleToast function when commentsData changes
  // useEffect(() => {
  //   if (commentsData && commentsData.allCommentStatus) {
  //     handleToast(commentsData);
  //   }
  // }, [commentsData]);

  // useEffect(() => {
  //   if (
  //     updatedLoggedUserData &&
  //     updatedLoggedUserData.savedPost.includes(postData?._id)
  //   ) {
  //     setSaved(true);
  //   }
  // }, [updatedLoggedUserData]);
  //to fetch data

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:3001/post/singlepost/${id.id}`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setPostData(data.result[0]);
    });
  }, []);

  console.log(postData);
  return (
    <>
      <NavBar />
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-4">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
          {/* left side  */}
          <LeftSide />
          {/* right side start  */}
          <div className="md:w-[75%] w-full">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <div className="flex gap-x-4">
                  {postData && postData.postedBy.profilePic ? (
                    <img
                      src={postData?.postedBy.profilePic}
                      alt="other-profile-pic"
                      className="w-[4rem] h-[4rem] rounded-full"
                    />
                  ) : postData && postData.postedBy.gender === "male" ? (
                    <img
                      src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685553367/male-avatar_anrusj.png"
                      alt="other-profile-pic"
                      className="w-[4rem] h-[4rem] rounded-full"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685553415/female-avatar_awisdo.png"
                      alt="other-profile-pic"
                      className="w-[4rem] h-[4rem] rounded-full"
                    />
                  )}
                  <div className="flex flex-col gap-y-1">
                    <span className="text-sm font-poppins font-semibold">
                      {postData?.postedBy.fullname}
                    </span>
                    <span className="text-xs font-thin">
                      {format(postData?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              {/*body*/}
              <div className=" p-6 flex flex-col w-full">
                <div
                  className={`flex flex-col md:flex-col md:h-full md:gap-y-2  ${
                    !postData?.picture || !postData?.content
                      ? "md:items-start md:justify-start"
                      : ""
                  }`}
                >
                  {postData?.picture && (
                    <img
                      src={postData?.picture}
                      alt="single-img"
                      className="md:w-full md:h-full bg-cover"
                      style={{ objectFit: "cover" }}
                    />
                  )}

                  <p className="my-4 pr-3 md:m-1 text-slate-500 text-lg leading-relaxed h-full  md:overflow-y-auto scrollbar select-none scrollbar-thumb-orange scrollbar-track-gray-100 scrollbar-w-1 overflow-y-scroll">
                    {postData && parse(postData?.content)}
                  </p>
                </div>
                {/* comment section start  */}
                <div>
                  <hr className="border-1 border-black my-5" />
                  <div className="comment flex flex-col justify-center items-center">
                    <form className="w-full">
                      <div className="flex items-center border-b border-teal-500 py-2">
                        <input
                          className="appearance-none  border-none w-full text- mr-3 py-1 px-2 leading-tight focus:outline-none font-poppins"
                          type="text"
                          placeholder="Answer this problem ....."
                          aria-label="Full name"
                        />
                        <div className="flex gap-x-5">
                          <BsFillSendCheckFill
                            size={25}
                            color="green"
                            className="cursor-pointer"
                          />
                          <RxCross2
                            size={25}
                            color="red"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* comment start  */}
                  <div className="flex gap-2 mt-5 ">
                    <img
                      src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685553415/female-avatar_awisdo.png"
                      alt="other-profile-pic"
                      className="w-[2rem] h-[2rem] md:w-[3rem] md:h-[3rem] rounded-full"
                    />

                    <div className="flex flex-col w-full py-2 bg-white rounded-lg  shadow-2xl">
                      <div className="flex  ml-4 justify-between">
                        <span className="tracking-wider font-bold text-xs mt-2 cursor-pointer">
                          Nikesh
                        </span>
                        <span className="font-time text-xs mr-2 mt-2 cursor-pointer">
                          12 min ago
                        </span>
                      </div>
                      <span className="mx-4 my-2 font-hotTopicsFont text-sm tracking-wider text-gray-500">
                        You can find the solution, through this website:
                        "https://stackoverflow.com/questions/57036377/my-local-images-are-not-working-once-i-added-parameters-to-the-url-of-the-compon."
                        If you have any query than feel free to contact me.
                      </span>
                    </div>
                  </div>
                  {/* comment end  */}
                </div>
                {/* comment section end  */}
              </div>
              {/*footer*/}
              <div className="flex items-center gap-x-6 justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                {/* <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                  {updatedPostData.likes.includes(loggedUserData?._id) ? (
                    <BsFillHeartFill
                      color="#f5190a"
                      size={25}
                      onClick={unlikePostHandler}
                    />
                  ) : (
                    <BsFillHeartFill
                      color="gray"
                      size={25}
                      onClick={likePostHandler}
                    />
                  )}

                  <span>{likeLength}</span>
                </div>
                <div className="flex gap-x-2 items-center justify-center cursor-pointer">
                  <FaCommentAlt color="gray" size={25} />
                  <span>{allComment?.length}</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePage;
