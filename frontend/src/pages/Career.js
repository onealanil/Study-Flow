import React from "react";
import { NavBar } from "../components/NavBar";
import LeftSide from "../components/LeftSide";

const Career = () => {
  return (
    <>
      <NavBar />
      <div className="bg-white w-full flex items-center md:justify-center justify-center  mt-1 md:mt-5 select-none mb-4">
        <div className="flex flex-col w-[90%] md:flex-row xl:w-[85%] 2xl:w-[70%] gap-x-4 p-0 md:p-5">
          {/* left side  */}
          <LeftSide />
          {/* right side start  */}
          <div className="md:w-[60%] w-full">
            {/* posts div for tips  */}
            <span className="font-poppins font-bold">Career guidance : </span>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 my-4 mb-12">
              {/* card start  */}
              <div className="hover:text-green cursor-pointer select-none">
                <div className="w-[100%] h-[15rem] relative">
                  <img
                    src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685570935/Screenshot_2023-06-01_035324_p8ikvr.png"
                    alt="card-image"
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-2">
                  <span className="font-poppins text-xs leading-relaxed tracking-wide line-clamp-4 h-[5rem]">
                    Few hours left, kindly join us for this expert session.
                    <br />
                    <br />
                    Date: Today Time: 3PM WAT| 5PM EAT | 2PM GMT For AAD Topic:
                    RecyclerView with Pagination Library Part 2 + Introduction
                    to a Pluralsight course Venue: Youtube -
                    https://youtu.be/jwEtVVsuYsk For GCP Topic: Setting Up GCP
                    SDK Venue: Youtube - https://youtu.be/P6ts9WThim4
                  </span>
                </div>
              </div>
              {/* card end  */}
              {/* card start  */}
              <div className="hover:text-green cursor-pointer select-none">
                <div className="w-[100%] h-[15rem] relative">
                  <img
                    src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685571268/Screenshot_2023-06-01_035903_jooxp0.png"
                    alt="card-image"
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-2">
                  <span className="font-poppins text-xs leading-relaxed tracking-wide line-clamp-4 h-[5rem]">
                    You can apply internship here,<br/>
                    For more information visit: https://internshipnepal.com/
                  </span>
                </div>
              </div>
              {/* card end  */}
               {/* card start  */}
               <div className="hover:text-green cursor-pointer select-none">
                <div className="w-[100%] h-[15rem] relative">
                  <img
                    src="https://res.cloudinary.com/dcnm2ql9y/image/upload/v1685571564/Screenshot_2023-06-01_040359_yfmdw9.png"
                    alt="card-image"
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-2">
                  <span className="font-poppins text-xs leading-relaxed tracking-wide line-clamp-4 h-[5rem]">
                    <span className="font-bold">Write a CV Like a pro!</span><br/><br/>
                    CV stands for Curriculum Vitae, which is a document that provides a summary of a person's education, work experience, skills, and other relevant qualifications. It is commonly used during job applications, internships, academic admissions, and other professional endeavors.
                  </span>
                </div>
              </div>
              {/* card end  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
