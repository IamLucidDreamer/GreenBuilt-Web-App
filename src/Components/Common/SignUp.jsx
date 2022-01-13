import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../Assets/GREENBUILT all purple.png";

const SignUp = () => {
  return (
    <div>
      <div className="min-h-screen bg-purple-1 flex items-center justify-center bg-log bg-center bg-no-repeat bg-cover">
        <div className="w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg p-4">
          <img src={Logo} className="w-20 h-20 mx-auto" alt="" />
          <h1 className="text-xs text-purple-1 py-2 text-center">LogIn with</h1>
          <div className="border-b-1 border-purple-1 flex flex-col md:flex-row items-center justify-evenly">
            <button className="bg-green-1 py-1.5 px-3 rounded-lg m-2 w-9/12 md:w-1/3">
              Google
            </button>
            <button className="bg-green-1 py-1.5 px-3 rounded-lg m-2 w-9/12 md:w-1/3">
              Facebook
            </button>
            <button className="bg-green-1 py-1.5 px-3 rounded-lg m-2 w-9/12 md:w-1/3">
              Others
            </button>
          </div>
          <h1 className="text-xs text-purple-1 pt-3 text-center">
            Or LogIn with Credentials
          </h1>
          <form className="">
            <div className="my-2 flex flex-col">
              <label className="text-sm text-purple-1 py-1.5 font-semibold">
                Name
              </label>
              <input
                placeholder="Name"
                className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
              />
            </div>
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
            <div className="my-2 flex flex-col">
              <label className="text-sm text-purple-1 py-1.5 font-semibold">
                Confirm Password
              </label>
              <input
                placeholder="Confirm Password"
                className="p-1.5 rounded-lg bg-purple-1 bg-opacity-10 border-2 border-purple-1"
              />
            </div>
            <button
              type="submit"
              className="w-full py-1.5 my-3 bg-purple-1 border-2 border-purple-1 focus:outline-none hover:bg-green-1 rounded text-base text-white font-bold hover:text-purple-1 duration-500"
            >
              SignUp
            </button>
          </form>
          <h1 className="text-xs text-purple-1 pt-2 text-center">
            Already have an account ?{" "}
            <Link to="../login" className="font-bold hover:underline">
              {" "}
              Log In
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
