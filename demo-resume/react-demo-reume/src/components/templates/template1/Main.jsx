import React from "react";

const Main = () => {
  return (
    <>
      <div
      id="main"
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="card md:card-side bg-gradient-to-tr from-slate-300 via-fuchsia-50 to-cyan-100 shadow-xl w-full  p-5">
            <figure className="w-56 lg:w-96">
              {" "}
              <img
                className="w-56 mask mask-circle hover:mask-squircle"
                // src="https://res.cloudinary.com/dranaclni/image/upload/v1686133460/cenIN/avatars/cf6k0nkbrqnldjok8r46.png"
                src="https://avatars.githubusercontent.com/u/88196283?v=4"
              />
              <div className=" hidden lg: card-body lg:!flex"></div>
              <div className=" hidden lg: card-body lg:!flex "></div>
            </figure>
            <div className="card-body w-60 md:w-96">
              <h2 className="card-title">👋 I am Mahendra S H</h2>
              <p className=" font-normal">
                {" "}
                "Computer science student and Passionate about creating
                responsive and user-friendly web applications"
              </p>
              <div className="card-actions justify-center md:justify-end">
                <button className="btn btn-primary btn-sm"> contact</button>
                <button className="btn btn-ghost btn-sm"> download cv</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
