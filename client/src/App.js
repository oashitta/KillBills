import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import TopNavigationBar from "./components/TopNavigationBar";
import Profile from "./components/Profile";
import AddBill from "./components/AddBill";
import AddPayee from "./components/AddPayee";
import Dashboard_actions from "./components/Dashboard_actions";
import Upcoming_bills from "./components/Upcoming_bills";
import ChartBillsByPayee from "./components/ChartBillsByPayee"
import ChartBillsByCategory from "./components/ChartBillsByCategory"
import ChartBillsByMonth from "./components/ChartBillsByMonth"
import "./App.css";

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
      <TopNavigationBar />
      {/* <Profile /> */}
      <Dashboard_actions />
      <Upcoming_bills />
      {/* <AddBill />
      <AddPayee /> */}
      <ChartBillsByPayee />
      <ChartBillsByCategory />
      <ChartBillsByMonth />
      </Auth0Provider>
  );
}

export default App;
