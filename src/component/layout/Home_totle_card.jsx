import React from "react";

const Home_totle_card = (props) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-200 max-w-sm flex-wrap sm:flex-nowrap">
        {/* Left colored vertical bar */}
        <div
          className={`absolute left-0 top-4 bottom-4 w-1 rounded-r-lg ${props.totle_Noch}`}
        ></div>

        {/* Main content */}
        <div className="flex flex-col justify-center">
          <p className="text-blue-600 text-sm font-medium">
            {props.total_title}
          </p>
          <p className="text-2xl font-bold text-gray-800 sm:text-xl max-[365px]:text-lg">
            {props.total_price}
          </p>
        </div>

        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-lg ${props.totle_icon_bg_back}`}
          aria-label={props.total_title}
          title={props.total_title}
        >
          <div
            className={`text-xl font-bold flex items-center justify-center w-6 h-6 ${props.totle_color} ${props.totle_icon_bg} rounded-md`}
          >
            {props.totle_simbol}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_totle_card;
