import Router from "next/router";
import React, { useEffect } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { BsChevronLeft } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import { VscClose } from "react-icons/vsc";
import { useAppContext } from "../context";
interface Props {
  sign: number;
  signup: boolean;
  setsignup: any;
  setsign: any;
}

const SignUp = ({ sign, signup, setsignup, setsign }: Props) => {
  const {
    user,
    signInWithGoogle,
    signUpWithGoogle,
    // sign in & sign up
    handlesubmit,
    login,

    setregisteremail,

    setregisterpassword,
    messageerr,

    messageerr1,

    messageerr2,

    setloginemail,

    setloginpassword,
    successlogin,

    // sign in & sign up
  } = useAppContext();
  useEffect(() => {
    if (user) {
      setsignup(false);
    }
  }, [user]);

  return (
    <div>
      {(() => {
        if (sign === 0) {
          return (
            <div className="text-center">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100   backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100  z-[100] md:z-10 ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto  rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full  md:mx-[20rem] my-[10rem]">
                    <div
                      className="p-4  cursor-pointer  z-50  absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8  text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex-col font-poppins text-2xl  flex justify-center my-10">
                          <h1 className="py-10">Join Medium.</h1>
                          <h2 className="text-sm max-w-[24rem] m-auto">
                            Create an account to receive great stories in your
                            inbox, personalize your homepage, and follow authors
                            and topics that you love.
                          </h2>
                        </div>
                        <div>
                          <div
                            onClick={signUpWithGoogle}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-[13px] px-4 py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <FcGoogle className="h-[19px] w-[19px]" />
                            <h2>Sign up with Google</h2>
                          </div>
                          <div
                            onClick={() => {
                              setsign(2);
                            }}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-10 px-[21px] py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <IoMailOutline className="h-[19px] w-[19px] text-black" />
                            <h2>Sign up with Email </h2>
                          </div>
                        </div>
                        <div className="font-poppins mb-16 text-sm flex justify-center">
                          Already have an account? {"  "}
                          <span
                            onClick={() => setsign(1)}
                            className="text-blue-600 cursor-pointer font-bold ml-2"
                          >
                            {" "}
                            Sign in
                          </span>
                        </div>
                        <div className="font-poppins  mb-20   text-center text-gray-600 text-xs flex justify-center items-center">
                          <h2>
                            Click “Sign Up” to agree to Medium’s Terms of
                            Service and acknowledge that Medium’s Privacy Policy
                            applies to you.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 1) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 z-50 cursor-pointer absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize  font-poppins text-2xl  flex justify-center py-10">
                          <h1>Welcome back.</h1>
                        </div>
                        <div>
                          <div
                            onClick={signInWithGoogle}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-[13px] px-4 py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <FcGoogle />
                            <h2>Sign in with Google</h2>
                          </div>
                          <div
                            onClick={() => {
                              setsign(3);
                            }}
                            className="flex w-fit m-auto  items-center justify-center space-x-4 border-[1px] mb-10 px-[21px] py-2 cursor-pointer  border-gray-600 hover:border-gray-900 rounded-full font-poppins text-sm text-gray-800"
                          >
                            <IoMailOutline className="h-[19px] w-[19px] text-black" />
                            <h2>Sign in with Email </h2>
                          </div>
                        </div>
                        <div className="font-poppins mb-16 text-sm flex justify-center">
                          No account?
                          <span
                            onClick={() => setsign(0)}
                            className="text-blue-600 cursor-pointer font-bold ml-2"
                          >
                            {" "}
                            Create one
                          </span>
                        </div>
                        <div className="font-poppins  mb-20   text-center text-gray-600 text-xs flex justify-center items-center">
                          <h2>
                            Click “Sign In” to agree to Medium’s Terms of
                            Service and acknowledge that Medium’s Privacy Policy
                            applies to you.
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 2) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 cursor-pointer absolute top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10  md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex flex-col  font-poppins text-2xl  space-y-2 justify-center py-10">
                          <h1>Sign up with email</h1>
                          <h2 className="capitalize  font-poppins text-sm  ">
                            Enter your email address to create an account.
                          </h2>
                        </div>
                        <form
                          onSubmit={handlesubmit}
                          className="flex flex-col w-[90%] sm:w-[60%]  mb-10 mt-6 m-auto "
                        >
                          <label
                            className="text-gray-900 text-sm"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setregisteremail(e.target.value);
                            }}
                            className="w-full md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            type="text"
                            required
                            max={20}
                          />
                          <label
                            className="text-gray-900 text-sm mt-4"
                            htmlFor="password"
                          >
                            Your password
                          </label>
                          <input
                            onChange={(e) => {
                              setregisterpassword(e.target.value);
                            }}
                            name="password"
                            id="password"
                            type="password"
                            className="w-full my-2 md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            required
                            max={20}
                          />
                          <input
                            className="px-8 mt-4 w-[70%] m-auto py-2 bg-gray-900 cursor-pointer hover:bg-black duration-100 rounded-full text-white"
                            type="submit"
                            value={successlogin ? "Successed" : "Continue"}
                          />
                          {messageerr && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Invalid mail or password
                              </h2>
                            </div>
                          )}
                          {messageerr1 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Email already in use
                              </h2>
                            </div>
                          )}
                          {messageerr2 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">Weak Password</h2>
                            </div>
                          )}
                        </form>

                        <div
                          onClick={() => setsign(0)}
                          className="font-poppins items-center  mb-16 text-sm flex justify-center"
                        >
                          <BsChevronLeft className="text-blue-600 h-4 w-4" />
                          <span className="text-blue-600 cursor-pointer  ml-2">
                            {" "}
                            All sign up options
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        } else if (sign === 3) {
          return (
            <div className="text-center ">
              <div
                onClick={() => {
                  setsignup(false);
                  setsign(0);
                }}
                className={`${
                  signup
                    ? "fixed inset-0 bg-gray-100  backdrop-blur-md duration-500  bg-opacity-60 ease-in-out transition-all  overflow-y-hidden flex justify-center items-center "
                    : "fixed inset-0 backdrop-blur-0 pointer-events-none duration-500  bg-opacity-0  ease-in-out transition-all overflow-y-hidden   "
                }`}
              />
              <div
                className={`${
                  signup
                    ? "scale-100 z-[100] md:z-10  ease-in-out duration-500 min-h-full md:min-h-[600px] w-full md:w-auto md:h-auto md:m-auto   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                    : "scale-0  ease-in-out duration-500 h-[600px] w-[500px]   rounded-lg fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-white shadow-xl"
                }`}
              >
                {signup && (
                  <div className="w-full md:px-[20rem] py-[10rem]">
                    <div
                      className="p-4 cursor-pointer absolute z-50 top-0 pt-10 pr-10 right-0"
                      onClick={() => setsignup(false)}
                    >
                      <VscClose className="h-8 w-8 text-gray-400 hover:text-gray-700 duration-100 text-2xl cursor-pointer" />
                    </div>
                    <div className="px-10 mt-6   md:-translate-0 absolute w-full m-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                      <div className="">
                        <div className="capitalize flex flex-col  font-poppins text-2xl  space-y-2 justify-center py-10">
                          <h1>Sign in with email</h1>
                          <h2 className="capitalize px-12 font-poppins text-sm  ">
                            Enter the email address & password associated with
                            your account, and we’ll send you right to home page.
                          </h2>
                        </div>
                        <form
                          onSubmit={login}
                          className="flex flex-col w-[90%] sm:w-[60%]  mb-10 mt-2 m-auto "
                        >
                          <label
                            className="text-gray-900 text-sm"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            onChange={(e) => {
                              setloginemail(e.target.value);
                            }}
                            className="w-full md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            type="text"
                            required
                            max={20}
                          />
                          <label
                            className="text-gray-900 text-sm mt-4"
                            htmlFor="password"
                          >
                            Your password
                          </label>
                          <input
                            onChange={(e) => {
                              setloginpassword(e.target.value);
                            }}
                            name="password"
                            id="password"
                            type="password"
                            className="w-full my-2 md:w-[80%] m-auto text-center focus:none outline-none border-b-[0.2px] py-[4px] border-gray-900/50 hover:border-gray-700 duration-100 focus:border-black"
                            required
                            max={20}
                          />
                          <input
                            className="px-8 mt-8 w-[70%] m-auto py-2 bg-gray-900 cursor-pointer hover:bg-black duration-100 rounded-full text-white"
                            type="submit"
                            value="Continue"
                          />
                          {messageerr && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Invalid mail or password
                              </h2>
                            </div>
                          )}
                          {messageerr1 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">
                                Email already in use
                              </h2>
                            </div>
                          )}
                          {messageerr2 && (
                            <div className="mt-4 flex justify-start space-x-[8px] items-center">
                              <BiErrorAlt className="text-red-500 h-6" />
                              <h2 className="text-red-500">Weak Password</h2>
                            </div>
                          )}
                        </form>

                        <div
                          onClick={() => setsign(0)}
                          className="font-poppins items-center  mb-16 text-sm flex justify-center"
                        >
                          <BsChevronLeft className="text-blue-600 h-4 w-4" />
                          <span className="text-blue-600 cursor-pointer  ml-2">
                            {" "}
                            All sign up options
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default SignUp;
