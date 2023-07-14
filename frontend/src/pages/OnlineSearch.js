import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavBar } from "../components/NavBar";
import LeftSide from "../components/LeftSide";
import { IoSend } from "react-icons/io5";
import { RiEarthLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OnlineSearch = () => {
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [searchedContent, setSearchedContent] = useState("");
  const [keyword, setKeyword] = useState("");

  const answerHandler = async () => {
    alert("wait for the response")
    try {
      const url = "http://192.168.33.134:5000/search";
      const headers = { "Content-Type": "application/json" };

      fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ query: content }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.statusText);
          }
        })
        .then((data) => {
          const keyword = data.keyword;
          const summary = data.summary;
          const url = data.url;
          setSearchedContent(summary);
          setUrl(url);
          setKeyword(keyword);
          console.log(keyword);
          console.log(summary);
          console.log(url);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <div>
    //   <input
    //     type="text"
    //     placeholder="Username"
    //     className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
    //     onChange={(e) => setContent(e.target.value)}
    //     required
    //   />
    //   <button onClick={answerHandler}>Send</button>
    //   <div>
    //     <span>{keyword && <>{keyword}</>}</span>
    //   </div>
    //   <div>
    //     <span>{searchedContent && <>{searchedContent}</>}</span>
    //   </div>
    //   <div>
    //     <span>{url && <>{url}</>}</span>
    //   </div>
    // </div>
    <>
      <div>
        <NavBar />
        <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-4">
          <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
            <LeftSide />
            <div className="w-full bg-[#f7fafa] h-[24rem] flex flex-col border-[1px] border-b-gray-50 rounded-md">
              <div className="h-[80%] p-5 pl-8 flex flex-col gap-y-5 overflow-y-scroll">
                <span>
                  Keyword:{" "}
                  <span className="text-green font-opensans">
                    {keyword && <>{keyword}</>}
                  </span>
                </span>
                <div>
                  <span className="font-opensans text-sm">
                    {searchedContent && <>{searchedContent}</>}
                  </span>
                </div>
                <span>
                  {url && "For more details, you can visit"}
                  <span className="text-green">{url && <>{url}</>}</span>
                </span>
              </div>
              {/* chat end  */}
              <div className="h-[20%] flex items-center justify-center">
                <div className=" bottom-0 h-16 px-3">
                  {/* chat input start  */}
                  <div className="flex items-center">
                    {/* <form
                      class="flex items-center"
                      onSubmit={answerHandler}
                    > */}
                      <div class="relative w-full">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <RiEarthLine />
                        </div>
                        <input
                          type="text"
                          id="message"
                          className="border border-gray-300 w-[100%] text-gray-900 text-sm rounded-lg focus:outline-none  block md:w-96 pl-10 p-2.5"
                          placeholder="Ask a Question..."
                          autoComplete="off"
                          required
                          onChange={(e) => setContent(e.target.value)}
                          value={content}
                        />
                      </div>
                      <button
                        type="submit"
                        className="p-2.5 ml-2 text-sm font-medium text-orange bg-green rounded-lg focus:ring-0"
                        onClick={answerHandler}
                      >
                        <IoSend size={25} />
                      </button>
                    {/* </form> */}
                  </div>
                  {/* chat input end  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineSearch;
