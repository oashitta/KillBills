import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import TopNavigationBar from "./components/TopNavigationBar";
import Profile from "./components/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      <TopNavigationBar />
      {/* <App /> */}
      <Profile />
    </Auth0Provider>
  </React.StrictMode>
);
