import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import AddBill from "./components/AddBill";
import AddPayee from "./components/AddPayee";
import EditPayee from "./components/EditPayee";
import UpcomingBills from "./components/UpcomingBills";
import "./App.css";
import EditBill from "./components/EditBill";
import Main from "./components/Main";
import PaymentHistory from "./components/PaymentHistory";
import Insights from "./components/Insights";
import Switcher from './components/Switcher';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <UpcomingBills /> },
      { path: "/add-bill", element: <AddBill /> },
      {
        path: "/add-payee",
        element: <AddPayee />,
      },
      {
        path: "/edit-payee",
        element: <EditPayee />,
      },
      { path: "/settings", element: <Profile /> },
      { path: "/edit-bill/:id", element: <EditBill /> },
      { path: "/history", element: <PaymentHistory /> },
      { path: "/insights", element: <Insights /> },
      {
        path: "*",
        element: (
          <div className="flex justify-center items-center flex-col h-screen">
            <h1 className=" font-bold my-3 text-5xl">404 Page Not Found</h1>
            <img
              src="https://media4.giphy.com/media/0IGsC1JY4k0LzdDJfb/giphy.gif?cid=ecf05e47w4zt469jaav6n8t7hixpeypszfkcwqnd17mg5ra1&ep=v1_gifs_related&rid=giphy.gif&ct=g"
              alt="404-gif"
              className="w-1/5"
            />
          </div>
        ),
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
      <RouterProvider router={router} />
    </Auth0Provider>
  );
}

export default App;
