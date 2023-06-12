import { React } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
import { Auth0Provider } from "@auth0/auth0-react";
import TopNavigationBar from "./components/TopNavigationBar";
import Profile from "./components/Profile";
import "./App.css";
import AddBill from './components/AddBill';
import AddPayee from './components/AddPayee';

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "http://localhost:3000",
      }}
    >
      <TopNavigationBar />
      <Profile />
      <AddBill />
      <AddPayee />
    </Auth0Provider>
  );
}

export default App;
