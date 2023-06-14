import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Profile from "./components/Profile";
import AddBill from "./components/AddBill";
import AddPayee from "./components/AddPayee";
import UpcomingBills from "./components/UpcomingBills";
import "./App.css";
import EditBill from "./components/EditBill";
import Main from "./components/main";
import PaymentHistory from "./components/PaymentHistory";

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
      { path: "/settings", element: <Profile /> },
      { path: "/edit-bill", element: <EditBill /> },
      { path: "/payment-history", element: <PaymentHistory /> },
      { path: "/upcoming-bills", element: <UpcomingBills /> },
      { path: "*", element: <h1>404 Page Not Found</h1> },
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