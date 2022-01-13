import React from "react";
import { Link } from "react-router-dom";

import FooterLogo from "../../Assets/GREENBUILT all purple.png";

const Login = () => {
  return (
    <div>
      <div className="min-h-screen bg-purple-1 flex items-center justify-center bg-log bg-center bg-no-repeat bg-cover">
        <div className="w-1/3 bg-white rounded-lg p-4">
          <img src={FooterLogo} className="w-16 h-16 mx-auto" alt="" />
          <h1 className="text-xs text-purple-1 py-2 text-center">LogIn with</h1>
          <div className="border-b-1 border-purple-1 flex flex-col md:flex-row items-center justify-evenly">
            <button className="bg-green-1 py-1.5 px-3 rounded-lg m-2">
              Google
            </button>
            <button className="bg-green-1 py-1.5 px-3 rounded-lg m-2">
              Facebook
            </button>
            <button className="bg-green-1 py-1.5 px-3 rounded-lg m-2">
              Others
            </button>
          </div>
          <h1 className="text-xs text-purple-1 pt-3 text-center">
            Or LogIn with Credentials
          </h1>
          <form className="">
            <div className="my-2 flex flex-col">
              <label className="text-sm text-purple-1 py-1.5 font-semibold">
                Email
              </label>
              <input
                placeholder="Email"
                className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
              />
            </div>
            <div className="my-2 flex flex-col">
              <label className="text-sm text-purple-1 py-1.5 font-semibold">
                Password
              </label>
              <input
                placeholder="Password"
                className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
              />
            </div>
            <button
              type="submit"
              className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
            >
              LogIn
            </button>
          </form>
          <h1 className="text-xs text-purple-1 pt-2 text-center">
            New around here ?{" "}
            <Link to="../signup" className="font-bold hover:underline">
              {" "}
              Sign Up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
