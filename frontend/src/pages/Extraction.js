import React, { useState, useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { RiEarthLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import LeftSide from "../components/LeftSide";

const Extraction = () => {
  const [content, setContent] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const answerHandler = async () => {
    alert("wait for the response!")
    if (content && question) {
      try {
        const url = "http://192.168.33.134:5000/get_answer";
        const headers = { "Content-Type": "application/json" };

        const requestData = {
          query: content,
          question: question,
        };

        fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(requestData),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error: " + response.statusText);
            }
          })
          .then((data) => {
            console.log(data);
            setAnswer(data.answer)
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {/* <div>
        <input
          type="text"
          placeholder="Username"
          className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <button onClick={answerHandler}>Send</button>
      </div> */}
      <div>
        <NavBar />
        <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-4">
          <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
            <LeftSide />
            <div className="w-full bg-[#f7fafa] h-[24rem] flex flex-col gap-y-10 border-[1px] border-b-gray-50 rounded-md">
              <div className="h-[20%] p-5 pl-8">
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm border border-gray-300 focus:outline-none "
                  placeholder="Paste your content here..."
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
              <div className="h-[60%] p-5 pl-8 flex flex-col overflow-y-scroll">
                <span className="text-green">Answer:</span>
                <div>
                  <span className="font-opensans text-sm">
                    {answer && <>{answer}</>}
                  </span>
                </div>
              </div>
              {/* chat end  */}
              <div className="h-[20%] flex items-center justify-center">
                <div className=" bottom-0 h-16 px-3">
                  {/* chat input start  */}
                  <div className="flex items-center">
                    {/* <form class="flex items-center"> */}
                    <div class="relative w-full">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <RiEarthLine />
                      </div>
                      <input
                        type="text"
                        id="message"
                        className="border border-gray-300 w-[100%] text-gray-900 text-sm rounded-lg focus:outline-none  block md:w-96 pl-10 p-2.5"
                        placeholder="Based on your content, Ask a Question..."
                        autoComplete="off"
                        required
                        onChange={(e) => setQuestion(e.target.value)}
                        value={question}
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

export default Extraction;
