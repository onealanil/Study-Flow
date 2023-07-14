import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../feature/loginSignupReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cShowPassword, setCshowPassword] = useState(false);
  const [gender, setGender] = useState("");

  //for toggle eye icon
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const togglecShowPassword = () => setCshowPassword(!cShowPassword);

  const signupDetails = useSelector((state) => state.loginSignup);
  console.log(signupDetails)

  const handleToast = (signupDetails) => {
    switch (signupDetails.signupStatus) {
      case "pending":
        if (toastId.current === null) {
          toastId.current = toast.info("Loading...", {
            position: "top-right",
            autoClose: 8000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        break;
      case "success":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: signupDetails.signupUserDetails[0].message,
            type: toast.TYPE.SUCCESS,
            autoClose: 10000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
        }
        break;
      case "failed":
        if (toastId.current !== null) {
          toast.update(toastId.current, {
            render: signupDetails.signupError,
            type: toast.TYPE.ERROR,
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          toastId.current = null;
        }
        break;
      default:
        break;
    }
  };

  // call the handleToast function when signupDetails changes
  useEffect(() => {
    if (signupDetails && signupDetails.signupStatus) {
      handleToast(signupDetails);
    }
  }, [signupDetails]);

  // signupHandler
  const signupHandler = (e) => {
    e.preventDefault();
    if (password === cPassword) {
      const signupData = {
        username: userName,
        email,
        password: password,
        gender,
        fullname: fullName,
      };
      console.log(signupData);
      dispatch(signupUser(signupData));
    } else {
      toast.error("password and confirm password does not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  console.log(gender);

  return (
    <>
      <>
        <div className="bg-white  inset-0 flex items-center justify-center mt-1 md:mt-5 select-none">
          <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[75%] gap-x-4 p-0 md:p-5 items-center justify-center">
            <div className="w-full flex flex-col md:w-[50%] gap-y-3 p-4">
              <div className="w-full flex flex-col items-center justify-center cursor-pointer select-none">
                <img
                  src="../assets/images/logo1.png"
                  alt="logo"
                  className="w-[6rem]"
                />
              </div>
              <div className="w-full flex items-center justify-center flex-col gap-y-2">
                <span className="text-[1rem] md:text-[1.5rem] font-black leading-relaxed tracking-wide">
                  Create your account
                </span>
                <span className="font-poppins text-xs">
                  Already have an account?
                  <Link to="/login">
                    <span className="ml-2 text-green">Login</span>
                  </Link>
                </span>
              </div>
              <form onSubmit={signupHandler}>
                <div className="w-full flex flex-col items-center juistify-center mt-5 gap-y-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    pattern="[a-z0-9._%+-]+@iic\.edu\.np$"
                  />

                  {/* for gender  */}
                  <select
                    id="gender"
                    class=" border md:w-[90%] xl:w-[80%] 2xl:w-[75%] text-sm text-gray-400 rounded-md focus:outline-none focus:ring-green block w-full p-2.5"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option selected>Gender</option>
                    <option value="male" className="hover:bg-green">
                      Male
                    </option>
                    <option value="female">Female</option>
                  </select>

                  {/* for password  */}
                  <div className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                    >
                      {showPassword ? (
                        <AiFillEye className="h-5 w-5" />
                      ) : (
                        <AiFillEyeInvisible className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {/* for confirm password  */}
                  <div className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] relative">
                    <input
                      type={cShowPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green"
                      onChange={(e) => setCPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={togglecShowPassword}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                      required
                    >
                      {cShowPassword ? (
                        <AiFillEye className="h-5 w-5" />
                      ) : (
                        <AiFillEyeInvisible className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] items-center justify-between mt-2">
                    <div>
                      <input
                        id="link-checkbox"
                        type="checkbox"
                        checked={isChecked}
                        className="w-4 h-4  bg-gray-100 border-gray-300 rounded focus:outline-none"
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <label
                        for="link-checkbox"
                        className="ml-2 mt-1 text-sm font-medium font-poppins"
                      >
                        I agree the terms and conditions
                      </label>
                    </div>
                    <span className="text-orange font-opensans font-semibold text-xs cursor-pointer">
                      Read terms
                    </span>
                  </div>
                  {isChecked ? (
                    <button className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] font-poppins text-sm leading-relaxed px-4 py-2 cursor-pointer bg-green text-white rounded-md text-center mt-2">
                      Signup
                    </button>
                  ) : (
                    <span className="w-full md:w-[90%] xl:w-[80%] 2xl:w-[75%] font-poppins text-sm leading-relaxed px-4 py-2 bg-green text-white rounded-md text-center mt-2">
                      Signup
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Signup;
