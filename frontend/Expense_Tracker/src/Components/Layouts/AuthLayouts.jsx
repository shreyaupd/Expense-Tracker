import React from "react";
import graph from "../../Images/graph.png";
import { LuTrendingUpDown } from "react-icons/lu";
import Logo from "../../Images/logo.png";
const AuthLayouts = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen pt-5 px-12 pb-10 bg-indigo-100">
        <div className="h-20 w-29 flex items-center justify-center">
          <img
            src={Logo}
            alt="logo"
            className="h-full w-full object-contain p-1 mb-2"
          />
        </div>
        {children}
      </div>

      <div className="hidden md:flex w-[80vw] h-screen bg-blue-200 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Decorative circles */}
        <div className="w-48 h-48 rounded-[100px] bg-blue-600 absolute -top-7 -left-7"></div>
        <div className="w-48 h-48 rounded-[100px] border-[20px] z-10 border-violet-600 absolute top-[20%] left-[65%]"></div>
        <div className="w-48 h-48 rounded-[100px] z-1 bg-orange-500 absolute top-[40%] -left-7"></div>

        {/* Title section */}
        <div className="absolute top-[28%] left-[2%] text-4xl z-10 font-semibold flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-12 h-12 -mt-58 rounded-full bg-teal-500 backdrop-blur-sm">
            <LuTrendingUpDown className="text-white text-2xl" />
          </span>
          <span className="font-bold">
            Track your
            <br />
            <b className="text-blue-500 px-23">
              expenses <br />{" "}
              <b className="mx-[51%]">
                with
                <br />
                <b>
                  <img
                    src={Logo}
                    className="w-60 ml-34 mt-12 h-19"
                    alt="logo"
                  />
                </b>{" "}
              </b>{" "}
            </b>
          </span>
        </div>

        <div className="absolute -bottom-1 h-[60%] w-full -mx-8  overflow-hidden">
          <div className="relative h-full w-full">
            <img
              src={graph}
              alt="graph"
              className="
                rounded-[32px]
                absolute
                opacity-90
                border-none
                border-white/30"
            />
            <div
              className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-16  
                  bg-gradient-to-b
                  from-blue-200  
                  rounded-t-[32px]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
