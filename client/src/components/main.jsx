import { useAuth0 } from "@auth0/auth0-react";

import React from "react";
import { Outlet } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import DashboardActions from "./DashboardActions";
import LoginButton from "./Login";

const Main = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="flex justify-center">Loading ...</div>;
  }

  return (
    <>
      <TopNavigationBar />

      {isAuthenticated ? (
        <>
          <DashboardActions />
          <Outlet />
        </>
      ) : (
        // <h2 className="flex justify-center font-bold text-xl text-slate-900 my-5">
        //   Please login to view your dashboard.
        // </h2>
        <div class="h-screen flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600">
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
            </a>
          </div>
          <div className="w-full flex justify-center mx-auto">An image</div>
        </div>
      )}
    </>
  );
};

export default Main;
