import heroImage from "../heroImage.jpg";
import { useAuth0 } from "@auth0/auth0-react";

import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Dashboard from "./Dashboard";

const Main = () => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div role="status" className="mt-2">
          <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      {isAuthenticated ? (
        <>
          <Dashboard />
          <Outlet />
        </>
      ) : (
        <div className="h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
          <div className="flex flex-col w-full justify-center mx-auto text-center">
            <h1 className="font-extrabold text-5xl text-white mb-2 p-2">
              Hate Paying Late Fees??!
            </h1>
            <h3 className="font-semibold text-2xl text-white mb-5 p2">
              Then signup to set up your bill reminders.
            </h3>
            <a href="">
              {/* <button className="rounded-md bg-violet-600 text-white hover:bg-violet-700 py-4 px-7">
                Sign Up!
              </button> */}
              <button className="rounded-md text-white font-semibold mx-2 py-4 px-7 bg-gradient-to-r from-pink-500 to-indigo-700 hover:from-pink-500 hover:to-yellow-500">
                Sign Up!
              </button>
            </a>&nbsp;
            <a href="">
              <button onClick={() => loginWithRedirect()} className="rounded-md text-white font-semibold mx-2 py-4 px-7 bg-gradient-to-r from-pink-500 to-indigo-700 hover:from-pink-500 hover:to-yellow-500">
                Sign In
              </button>
            </a>
          </div>
          <div className="w-full flex justify-center self-center mx-auto">
            <img src={heroImage} alt="hero-image" className="text-white" />
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
