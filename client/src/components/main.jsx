import { useAuth0 } from "@auth0/auth0-react";

import React from "react";
import { Outlet } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import DashboardActions from "./DashboardActions";

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
        <h2 className="flex justify-center font-bold text-xl text-slate-900 my-5">
          Please login to view your dashboard.
        </h2>
      )}
    </>
  );
};

export default Main;
