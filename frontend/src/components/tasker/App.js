import React from "react";
import AppNotes from "./Components/Notes";
import "@fortawesome/fontawesome-free/css/all.css";
import { NavBar } from "../NavBar";
import LeftSide from "../LeftSide";

function App() {
  return (
    <>
      <NavBar />
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-4">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
          {/* left side  */}
          <LeftSide />
          <div className="w-[75%]">
            <AppNotes />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
