import { useAuth0 } from "@auth0/auth0-react";

import React from "react";
import { Outlet } from "react-router-dom";
import TopNavigationBar from "./TopNavigationBar";
import Dashboard_actions from "./Dashboard_actions";
import Upcoming_bills from "./Upcoming_bills";

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
          <Dashboard_actions />
          <Outlet />
        </>
      ) : (
        <h2>Please login to view your dashboard.</h2>
      )}
    </>
  );
};

export default Main;
