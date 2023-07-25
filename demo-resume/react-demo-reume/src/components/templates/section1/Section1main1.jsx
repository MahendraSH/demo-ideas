import React from "react";
import Nabar5 from "../template1/Nabar5";
import { Tab } from "@headlessui/react";
const Section1main1 = () => {
  return (
    <div
      className=" w-full  max-h-screen   overflow-hidden  "
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      
      <Nabar5 />
      <div className="hero  ">
        <div className=" hero-overlay  w-full  min-h-screen bg-opacity-60"></div>
        <div className="">
          <div className="card md:card-side bg-base-100 shadow-xl w-full  p-5">
            <figure>
              {" "}
              <img
                className="w-56 mask mask-circle hover:mask-squircle"
                // src="https://res.cloudinary.com/dranaclni/image/upload/v1686133460/cenIN/avatars/cf6k0nkbrqnldjok8r46.png"
                src="https://avatars.githubusercontent.com/u/88196283?v=4"
              />
              <div className=" hidden lg: card-body lg:!flex"></div>
              <div className=" hidden lg: card-body lg:!flex "></div>
            </figure>
            <div className="card-body w-80 lg:w-96">
              <h2 className="card-title">👋 I am Mahendra S H</h2>
              <p className=" font-normal">
                {" "}
                "Computer science student and Passionate about creating
                responsive and user-friendly web applications"
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-sm"> contact</button>
                <button className="btn btn-ghost btn-sm"> download cv</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1main1;
