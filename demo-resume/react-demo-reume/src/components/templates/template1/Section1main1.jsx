import React from "react";
import Main from "./Main";
import Navbar from "./Navbar";
import About from "./About";
import Education from "./Education";
const Section1main1 = () => {
  return (
    <div className=" w-full  max-h-full  bg-gradient-to-tr from-slate-300 via-fuchsia-50 to-cyan-100 ">
      <Navbar />
      <Main />
      <About/>
    </div>
  );
};

export default Section1main1;
