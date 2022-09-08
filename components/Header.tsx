import React, { useState, createContext } from "react";
import Link from "next/link";

import { useAppContext } from "../components/context";

// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../components/firebase/firebase-config";
import SignUp from "./authcomponent/SignUp";

export function Header() {
  const [signup, setsignup] = useState(false);
  const {
    user,

    logout,

    // sign in & sign up
  } = useAppContext();
  const [sign, setsign] = useState(0);
  const [usersetting, setusersetting] = useState(false);

  const displayName = user && user.displayName;
  const [followed, setfollowed] = useState(false);

  function Clickedfollow() {
    const usermail = { userEmail: user?.email };

    if (user) {
      // addDoc(collection(db, "Followed"), usermail)
      //   .then(() => {
      setfollowed((prev) => !prev);
      // })
      // .catch((error) => {
      //   console.log(error.message);
      // });
    } else {
      setsignup(true);
    }
  }
  return (
    <div className=" shadow-2xl  z-10">
      <header className="flex   justify-between font-poppins items-center p-3 sm:p-5 wrapper">
        <div className="flex items-center space-x-0 sm:space-x-5">
          <Link passHref href="/">
            <img
              src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
              alt=""
              className="h-10 hidden sm:block cursor-pointer"
            />
          </Link>
          <Link passHref href="/">
            <img
              src="https://cdn3.iconfinder.com/data/icons/social-media-black-white-2/1151/Medium_logo_-_black-512.png"
              alt=""
              className="h-14 sm:hidden cursor-pointer"
            />
          </Link>
          <div className="hidden md:inline-flex items-center space-x-5">
            <h3 className="cursor-pointer">About</h3>
            <h3 className="cursor-pointer">Contact</h3>
            <h3
              onClick={Clickedfollow}
              className={`${
                followed
                  ? "border-[1px] cursor-pointer rounded-full border-blue-600 hover:border-blue-800 duration-500  px-6 py-2 text-gray-900"
                  : "bg-blue-600 cursor-pointer rounded-full hover:bg-blue-700 duration-500  px-4 py-2 text-white"
              }`}
            >
              {followed ? "Following" : "Follow"}
            </h3>
          </div>
        </div>
        <div className="flex   items-center  space-x-5 text-blue-600 ">
          {user && (
            <div className="relative">
              <div
                onClick={() => setusersetting((prev) => !prev)}
                className="w-10 h-10 cursor-pointer  rounded-full"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} className="rounded-full" alt="" />
                ) : (
                  <div className="bg-blue-600  cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                    <span className="text-white cursor-pointer uppercase">
                      {displayName?.slice(0, 2)}
                    </span>
                  </div>
                )}
              </div>
              <div
                onClick={() => setusersetting(false)}
                className={usersetting ? " fixed  inset-0 z-30" : ""}
              ></div>
              <div
                className={`${
                  usersetting
                    ? "bg-gray-200 z-50 translate-x-[0%] opacity-100 duration-300 ease-in-out  w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute top-20 right-0  "
                    : "bg-gray-200 z-50  translate-x-[200%] opacity-0 duration-300 ease-in-out   w-[20rem] sm:w-[25rem] px-10 py-8 rounded-lg shadow-lg absolute top-20 right-0  "
                }`}
              >
                <h2
                  onClick={() => {
                    setusersetting((prev) => !prev);
                    logout();
                  }}
                  className="text-gray-800 hover:text-black duration-75 text-md cursor-pointer"
                >
                  Sign out
                </h2>
                <div className="my-4 border-b-2 border-gray-400" />
                <div className="flex justify-start space-x-4  items-center">
                  {user?.photoURL ? (
                    <img
                      className="w-10 h-10 rounded-full "
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <div className="bg-blue-600 cursor-pointer flex justify-center items-center rounded-full h-10 w-10">
                      <span className="text-white uppercase">
                        {user.displayName?.slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="">
                    <h2 className="text-gray-900 text-sm capitalize">
                      {user && displayName}
                    </h2>
                    <h3 className="text-gray-600 text-sm ">
                      @{user && user.email?.split("@")[0]}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!user && (
            <div className="flex justify-center items-center space-x-5">
              <h3
                className="cursor-pointer"
                onClick={() => {
                  setsignup(true);
                  setsign(1);
                }}
              >
                Sign In
              </h3>
              <h3
                onClick={() => setsignup(true)}
                className="border px-4 py-1 cursor-pointer hover:bg-blue-600 hover:text-white duration-200 rounded-full border-blue-600"
              >
                Get Started
              </h3>
            </div>
          )}
        </div>
      </header>
      {/* SIGN UP */}
      {/* SIGN UP */}
      <SignUp
        setsign={setsign}
        setsignup={setsignup}
        sign={sign}
        signup={signup}
      />
      {/* SIGN UP */}
      {/* SIGN UP */}
    </div>
  );
}

export default Header;
