import React from "react";

import Logo from "../../../../assets/GREENBUILT.png";

const Dashboard = () => {
  return (
    <div className="w-full flex-row flex">
      <div className="w-2/12 min-h-screen bg-purple-1">
        <img src={Logo} alt="" className="w-20 h-20 mx-auto mt-8 mb-2" />
        <nav className="flex flex-col">
          <button className="text-white py-2 border-2 border-purple-1 hover:border-white rounded-lg hover:bg-white hover:text-purple-1 my-2">
            Dashboard
          </button>
          <button className="text-white py-2 border-2 border-purple-1 hover:border-white rounded-lg hover:bg-white hover:text-purple-1 my-2">
            Dashboard
          </button>
          <button className="text-white py-2 border-2 border-purple-1 hover:border-white rounded-lg hover:bg-white hover:text-purple-1 my-2">
            Dashboard
          </button>
          <button className="text-white py-2 border-2 border-purple-1 hover:border-white rounded-lg hover:bg-white hover:text-purple-1 my-2">
            Dashboard
          </button>
          <button className="text-white py-2 border-2 border-purple-1 hover:border-white rounded-lg hover:bg-white hover:text-purple-1 my-2">
            Dashboard
          </button>
          <button className="text-white py-2 border-2 border-purple-1 hover:border-white rounded-lg hover:bg-white hover:text-purple-1 my-2">
            Dashboard
          </button>
        </nav>
      </div>
      <div className="w-10/12 min-h-screen bg-green-1 bg-opacity-10">
        <div className="bg-purple-1 flex items-center justify-between py-2 px-4">
          <div>
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
              className="w-7 h-7 text-white rotate-180"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </div>
          <h1 className="text-2xl text-white py-2 font-semibold">Dashboard</h1>
          <div>
            <div className="w-7 h-7 rounded-full bg-green-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;
