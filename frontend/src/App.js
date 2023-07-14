import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Collage from "./pages/Collage";
import Academic from "./pages/Academic";
import Login from "./pages/loginSignup/Login";
import Signup from "./pages/loginSignup/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Profile } from "./pages/Profile";
import Message from "./pages/message/Message";
import Extraction from "./pages/Extraction";
import OnlineSearch from "./pages/OnlineSearch";
import Staff from "./pages/Staff";
import SinglePage from "./pages/SinglePage";
import Notes from "../src/components/tasker/App";
import Career from "./pages/Career";

const App = () => {
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Login />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route
            path="/problem/college"
            element={isLoggedIn ? <Collage /> : <Login />}
            exact
          />
          <Route
            path="/message"
            element={isLoggedIn ? <Message /> : <Login />}
            exact
          />
          <Route
            path="/problem/academic"
            element={isLoggedIn ? <Academic /> : <Login />}
            exact
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Login />}
            exact
          />
          <Route
            path="/answer/extraction"
            element={isLoggedIn ? <Extraction /> : <Login />}
            exact
          />
          <Route
            path="/answer/onlinesearch"
            element={isLoggedIn ? <OnlineSearch /> : <Login />}
            exact
          />
          <Route
            path="/staff"
            element={isLoggedIn ? <Staff /> : <Login />}
            exact
          />
            <Route
            path="/problem/academic/:id"
            element={isLoggedIn ? <SinglePage /> : <Login />}
            exact
          />
            <Route
            path="/tasker"
            element={isLoggedIn ? <Notes /> : <Login />}
            exact
          />
            <Route
            path="/guidance"
            element={isLoggedIn ? <Career /> : <Login />}
            exact
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default App;
