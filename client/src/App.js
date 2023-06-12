import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import TopNavigationBar from "./components/TopNavigationBar";
import Profile from "./components/Profile";
import UpcomingBillsTotal from "./components/UpcomingBillsTotal";
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
      <div>
        <TopNavigationBar />
        <Profile />
      </div>
      <UpcomingBillsTotal />
    </Auth0Provider>
  );
}

export default App;
