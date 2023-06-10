import { useAuth0 } from "@auth0/auth0-react";
import { React, useState } from "react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    loginWithRedirect();
  };

  return (
    !isAuthenticated && (
      <button onClick={handleLogin} disabled={isLoading}>
        Log In / Sign Up
      </button>
    )
  );
};

export default LoginButton;
