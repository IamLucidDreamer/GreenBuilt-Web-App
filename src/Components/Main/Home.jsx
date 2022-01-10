// @uthor Manas

import React from "react";
import Logo from "../../Assets/GREENBUILT.png";
import HeaderLogo from "../../Assets/green transparent.png";
import FooterLogo from "../../Assets/GREENBUILT all purple.png";
import MobileScreen from "../../Assets/mobile.png";
import Coupon from "../../Assets/price.png";
import Offers from "../../Assets/OFF.png";
import Reward from "../../Assets/REWARD.png";
import Blueprint from "../../Assets/bp2.png";

const Home = () => {
  return (
    <div className="font-montserrat">
      <div className="bg-heroBg bg-no-repeat bg-cover bg-center">
        <div className="min-h-screen bg-gradient-to-br from-purple-1 to-transparent">
          {/* Header */}
          <header class="text-gray-600 body-font">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
              <div>
                <img src={HeaderLogo} alt="" className="w-12 h-12" />
              </div>
              <div>
                <button class="inline-flex items-center bg-transparent border-2 py-1 px-3 focus:outline-none hover:bg-green-1 hover:border-green-1 rounded text-base mt-4 md:mt-0 text-white hover:text-purple-1 duration-500">
                  LogIn
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Hero Section */}

          <div className="flex flex-row items-center justify-around container mx-auto">
            <div className="mt-12 sm:mt-32 md:mt-56 flex-1 ml-4 md:ml-20">
              <h1 className="text-6xl font-light text-white leading-snug">
                Let's Save the <br />
                <span className="font-semibold text-transparent bg-clip-text bg-green-1">
                  Planet Together
                </span>
              </h1>
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>

      {/* Section 2 */}

      <div className="py-24 px-4 lg:px-12 container mx-auto">
        <h1 className="text-5xl md:text-6xl text-center leading-normal text-purple-1">
          Greener, Cleaner
          <br />
          <span className="font-semibold">Future Awaits</span>
        </h1>
        <div className="pt-20 flex flex-col md:flex-row justify-between items-center">
          <div className="border-4 border-green-1 w-10/12 md:w-1/2 pb-10 rounded-lg">
            <div className="bg-section2 bg-no-repeat bg-cover bg-center w-full h-96 -mt-8 -ml-8 rounded-lg"></div>
          </div>
          <div className="md:w-1/2">
            <p className="text-xl md:text-2xl pt-10 md:p-8">
              Climate change is the greatest long term threat of our time, but
              we together can stop it from threatening the existence of the
              Human race. At GreenBuilt we try and find Innovative solutions to
              the problems of tomorrow and solving them today. We understand
              that all of us together can bring about a positive change to fight
              against this global threat.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 */}

      <div className="bg-purple-1">
        <div className="py-24 px-4 lg:px-12 container mx-auto">
          <h1 className="text-5xl md:text-6xl text-center leading-normal text-white font-light">
            What We
            <span className="font-semibold text-green-1"> Offer</span>
          </h1>
          <p className="text-xl text-center leading-normal text-white font-light md:w-1/3 mx-auto py-4">
            We show our love and affection when you support a green energy
            powered industry.
          </p>
          <div className="pt-8 flex flex-col md:flex-row justify-evenly items-center">
            <div className="bg-white p-4 rounded-lg w-10/12 md:w-1/4 m-4">
              <h2 className="text-2xl font-medium text-center">
                Reward Points
              </h2>
              <img src={Reward} alt="" className="w-56 mx-auto" />
            </div>
            <div className="bg-white p-4 rounded-lg w-10/12 md:w-1/4 m-4">
              <h2 className="text-2xl font-medium text-center">
                Exclusive Offers
              </h2>
              <img src={Offers} alt="" className="w-56 mx-auto" />
            </div>
            <div className="bg-white p-4 rounded-lg w-10/12 md:w-1/4 m-4">
              <h2 className="text-2xl font-medium text-center">
                Special Coupons
              </h2>
              <img src={Coupon} alt="" className="w-56 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}

      <div className="py-24 px-12 container mx-auto">
        <h1 className="text-6xl text-center leading-normal text-purple-1">
          Greener, Cleaner
          <br />
          <span className="font-semibold">Future Awaits</span>
        </h1>
        <div className="pt-20 flex flex-row justify-between items-center">
          <div className="w-1/2">
            <h1 className="text-2xl p-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h1>
          </div>
          <div className="border-4 border-green-1 w-1/2 pb-10 rounded-lg">
            <div className="bg-section2 bg-no-repeat bg-cover bg-center w-full h-96 -mt-8 -ml-8 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Section 6 */}

      <div className="pt-24 px-12 container bg-purple-1">
        <h1 className="text-6xl text-center leading-normal text-green-1">
          Lorem Ipsum Dolor
        </h1>
        <div className="pt-20 flex flex-row justify-between items-center">
          <div className="w-1/2">
            <h1 className="text-2xl p-8 text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h1>
          </div>
          <div className="w-1/2">
            <img src={Blueprint} alt="" className="" />
          </div>
        </div>
      </div>

      {/* Section 7 */}

      <div className="py-24 px-12 container bg-white">
        <h1 className="text-6xl text-center leading-normal text-green-1">
          Lorem Ipsum Dolor
        </h1>
        <div className="pt-8 flex flex-row">
          <div className="">
            <img
              className="h-56 w-56"
              alt=""
              src="../../../public\logo512.png"
            />
          </div>
          <div className=""></div>
        </div>
      </div>

      {/* Section 8 */}

      <div className="py-24 px-12 bg-purple-1">
        <div className="pt-8 container mx-auto flex flex-row items-center justify-evenly">
          <div className="">
            <img src={MobileScreen} alt="" className="w-56 h-96" />
          </div>
          <div className="">
            <h1 className="text-6xl text-left leading-normal text-white">
              Hop on <br />
              <span className="text-green-1 font-semibold">board!</span>
            </h1>
            <button class="inline-flex items-center bg-transparent border-2 py-1 px-3 focus:outline-none hover:bg-green-1 hover:border-green-1 rounded text-base mt-8 text-white hover:text-purple-1 duration-500">
              SignUp
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>

            <p className="mt-8 text-white font-semibold">
              Download the Mobile App
            </p>
            <div className="flex flex-row items-center justify-between">
              <button class="inline-flex items-center bg-transparent border-2 py-1 px-3 focus:outline-none hover:bg-green-1 hover:border-green-1 rounded text-base mt-8 text-white hover:text-purple-1 duration-500">
                iOS
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
              <button class="inline-flex items-center bg-transparent border-2 py-1 px-3 focus:outline-none hover:bg-green-1 hover:border-green-1 rounded text-base mt-8 text-white hover:text-purple-1 duration-500">
                Android
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}

      <footer className="pt-16 px-12">
        <div className="container mx-auto border-b-2 border-purple-1 pb-8">
          <div className="flex items-start justify-evenly">
            <div>
              <nav className="flex flex-col">
                <a>Careers</a>
                <a>About</a>
                <a>Investors</a>
              </nav>
            </div>
            <div>
              <img src={FooterLogo} alt="" className="w-24 h-24" />
            </div>
            <div>
              <nav className="flex flex-col">
                <a>Careers</a>
                <a>About</a>
                <a>Investors</a>
              </nav>
            </div>
          </div>
        </div>
        <p className="text-center text-sm py-3">
          © 2022 GreenBuilt - All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default Home;
