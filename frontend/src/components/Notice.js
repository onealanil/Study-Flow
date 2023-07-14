import React from "react";

const Notice = () => {
  return (
    <>
      <div className="notice-container flex-col items-center justify-between w-[90%] md:flex-row xl:w-[78%] 2xl:w-[75%] gap-x-4 p-0 md:p-5 border-gray-300 border-[1px] h-[12rem] bg-gray-100 rounded-lg">
        <span className="font-opensans font-bold tracking-wider border-b-2 border-black pb-2">
          Notice Board
        </span>

        <div className="mt-4 h-[7rem] overflow-y-scroll">
          {/* one notice start */}
          <div className="flex flex-col p-2">
            <span className="text-xs font-thin tracking-wider">
              17 May -SSD
            </span>
            <span className="text-sm font-medium tracking-wide">
              {" "}
              Due to some technical problems, today's session has been relocated
              to Room Bhojpur.
            </span>
          </div>
          {/* one notice end  */}
          {/* one notice start */}
          <div className="flex flex-col p-2">
            <span className="text-xs font-thin tracking-wider">
              18 May -Nikesh Regmi
            </span>
            <span className="text-sm font-medium tracking-wide">
              {" "}
              If you have any questions related to the assignment, you can post
              them in the Academic Problem field or feel free to contact me.
            </span>
          </div>
          {/* one notice end  */}
          {/* one notice start */}
          <div className="flex flex-col p-2">
            <span className="text-xs font-thin tracking-wider">
              19 May -finance
            </span>
            <span className="text-sm font-medium tracking-wide">
              {" "}
              Please clear your semster fees before the exam.
            </span>
          </div>
          {/* one notice end  */}
        </div>
      </div>
    </>
  );
};

export default Notice;
