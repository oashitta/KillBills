import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from "./reportWebVitals";
import LoginButton from "./login";
import LogoutButton from "./logout";
import Profile from "./profile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-mip1d8xijfynygqs.us.auth0.com"
      clientId="C45BhwlV7kGCd3BVPchiUrJ1iPGPYeUb"
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      <App />
      <LoginButton />
      <LogoutButton />
      <Profile />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
