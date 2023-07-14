import React, { useState } from "react";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { SiAnswer } from "react-icons/si";
import { MdPermContactCalendar } from "react-icons/md";
import { RiGuideFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Buttons = () => {
  const navigate = useNavigate();
  const [problem, setProblem] = useState(false);
  const [answer, setAnswer] = useState(false);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="flex  items-center justify-between w-[90%] md:flex-row xl:w-[80%] 2xl:w-[75%] gap-x-4 p-0 md:p-5">
          <div className="flex flex-col w-[100%] gap-y-6">
            <div className="flex w-[100%]  items-center justify-between gap-x-6">
              {/* 1st div  */}
              <div
                className="w-[50%] bg-[#F9F4F2] border-[1px] border-[#f8eeea] p-6 rounded-md flex flex-col gap-y-4 shadow-lg cursor-pointer select-none"
                onClick={() => {
                  setProblem(true);
                }}
              >
                <div className="flex items-center justify-start gap-x-4">
                  <BsFillPatchQuestionFill
                    size={25}
                    className="text-[#F58C5C]"
                  />
                  <span className="capitalize font-poppins font-bold text-[#F58C5C]">
                    Post a problem
                  </span>
                </div>
                <span className="font-opensans text-sm tracking-wide leading-relaxed">
                  Click here to post or view problems related to college or the
                  academic sector.
                </span>
              </div>
              {/* 1st div end  */}

              {/* 2nd div  */}
              <div
                className="w-[50%] bg-[#E7F4F2] border-[1px] border-[#d5eeeb] p-6 rounded-md flex flex-col gap-y-4 shadow-lg cursor-pointer"
                onClick={() => {
                  navigate("/tasker");
                }}
              >
                <div className="flex items-center justify-start gap-x-4">
                  <FaTasks size={25} className="text-[#39C9A7]" />
                  <span className="capitalize font-poppins font-bold text-[#39C9A7]">
                    Student Tasker
                  </span>
                </div>
                <span className="font-opensans text-sm tracking-wide leading-relaxed">
                  Click here to efficiently manage your tasks and assignments,
                  ensuring timely completion.
                </span>
              </div>
              {/* 2nd div end  */}
            </div>
            <div className="flex gap-x-6 w-[100%]items-center justify-between">
              {/* 3rd div start  */}
              <div
                className="w-[50%] bg-[#F0EBF8] border-[1px] border-[#e4daf4] p-6 rounded-md flex flex-col gap-y-4 shadow-lg cursor-pointer"
                onClick={() => setAnswer(true)}
              >
                <div className="flex items-center justify-start gap-x-4">
                  <SiAnswer size={25} className="text-[#ab89e3]" />
                  <span className="capitalize font-poppins font-bold text-[#ab89e3]">
                    Get Answer
                  </span>
                </div>
                <span className="font-opensans text-sm tracking-wide leading-relaxed">
                  You can get your answer within a short period of time by
                  extracting it from the lengthy text or online search.
                </span>
              </div>
              {/* 3rd div end  */}

              {/* 4th div start  */}
              <div
                className="w-[50%] bg-[#e0f9ed] border-[1px] border-[#adf7d3] p-6 rounded-md flex flex-col gap-y-4 shadow-lg cursor-pointer"
                onClick={() => {
                  navigate("/staff");
                }}
              >
                <div className="flex items-center justify-start gap-x-4">
                  <MdPermContactCalendar size={25} className="text-[#39c983]" />
                  <span className="capitalize font-poppins font-bold text-[#39c983]">
                    Connect with other
                  </span>
                </div>
                <span className="font-opensans text-sm tracking-wide leading-relaxed">
                  Click here to establish a connection with your teacher and
                  bridge the gap between them and yourself.
                </span>
              </div>
              {/* 4th div end  */}

              {/* 5th div start  */}
              <div className="w-[50%] bg-[#F6F1DD] border-[1px] border-[#F6F1DD] p-6 rounded-md flex flex-col gap-y-4 shadow-lg cursor-pointer" onClick={()=>{navigate("/guidance")}}>
                <div className="flex items-center justify-start gap-x-4">
                  <RiGuideFill size={25} className="text-[#DDB21A]" />
                  <span className="capitalize font-poppins font-bold text-[#DDB21A]">
                    Career Guidance
                  </span>
                </div>
                <span className="font-opensans text-sm tracking-wide leading-relaxed">
                  Enhance your career by staying up-to-date with the
                  ever-evolving real world and prepare for your future.
                </span>
              </div>
              {/* 5th div end  */}
            </div>
          </div>
        </div>
      </div>

      {problem ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[32rem] lg:h-[32rem] pb-5 z-50">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* notification */}
                  <div className=" md:w-96 pl-10 p-2.5 items-center">
                    <span className="font-poppins text-[1rem] font-bold text-center">
                      Your problem related to?
                    </span>
                  </div>
                  <i
                    className="p-1 ml-auto float-right"
                    onClick={() => setProblem(false)}
                  >
                    <AiOutlineClose
                      size={30}
                      className="text-red-900 block cursor-pointer"
                    />
                  </i>
                </div>
                {/*body*/}
                <div className="w-full flex flex-col my-3 items-center justify-center gap-y-4">
                  <div
                    className="w-[75%] p-5 border-2 border-green rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => {
                      navigate("/problem/academic");
                    }}
                  >
                    <img
                      src="../assets/images/academic.svg"
                      alt="svg-1"
                      className="w-[10rem]"
                    />
                    <span className="font-poppins mt-2">Academic</span>
                  </div>
                  <div
                    className="w-[75%] p-5 border-2 border-green rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    // onClick={() => {
                    //   navigate("/problem/college");
                    // }}
                  >
                    <img
                      src="../assets/images/college.svg"
                      alt="svg-1"
                      className="w-[9rem]"
                    />
                    <span className="font-poppins mt-2">College</span>
                  </div>
                </div>
                {/* body end  */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}

      {/* answers  */}
      {answer ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[32rem] lg:h-[32rem] pb-5 z-50">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  {/* notification */}
                  <div className=" md:w-96 pl-10 p-2.5 items-center">
                    <span className="font-poppins text-[1rem] font-bold text-center">
                      What do you want to do?
                    </span>
                  </div>
                  <i
                    className="p-1 ml-auto float-right"
                    onClick={() => setAnswer(false)}
                  >
                    <AiOutlineClose
                      size={30}
                      className="text-red-900 block cursor-pointer"
                    />
                  </i>
                </div>
                {/*body*/}
                <div className="w-full flex flex-col my-3 items-center justify-center gap-y-4">
                  <div
                    className="w-[75%] p-5 border-2 border-green rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => {
                      navigate("/answer/extraction");
                    }}
                  >
                    <img
                      src="../assets/images/extraction.svg"
                      alt="svg-1"
                      className="w-[10rem]"
                    />
                    <span className="font-poppins mt-2">
                      Extract your content
                    </span>
                  </div>
                  <div
                    className="w-[75%] p-5 border-2 border-green rounded-lg flex flex-col items-center justify-center cursor-pointer"
                    onClick={() => {
                      navigate("/answer/onlinesearch");
                    }}
                  >
                    <img
                      src="../assets/images/onlinesearch.svg"
                      alt="svg-1"
                      className="w-[9rem]"
                    />
                    <span className="font-poppins mt-2">Online Search</span>
                  </div>
                </div>
                {/* body end  */}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Buttons;
