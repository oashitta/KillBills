import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import TopNavigationBar from "./components/TopNavigationBar";
import Profile from "./components/Profile";
import AddBill from "./components/AddBill";
import AddPayee from "./components/AddPayee";
import Dashboard_actions from "./components/Dashboard_actions";
import Upcoming_bills from "./components/Upcoming_bills";
import "./App.css";
import Main from "./components/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Upcoming_bills /> },
      { path: "/add-bill", element: <AddBill /> },
      {
        path: "/add-payee",
        element: <AddPayee />,
      },
    ],
  },
]);

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      {/* <TopNavigationBar /> */}
      <RouterProvider router={router} />
      {/* <Profile />
      <Dashboard_actions />
      <Upcoming_bills /> */}
      {/* <AddBill /> */}
      {/* <AddPayee /> */}
    </Auth0Provider>
  );
}

export default App;
