import { useAuth0 } from "@auth0/auth0-react";
import { React, useState } from "react";

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    logout({ returnTo: window.location.origin });
  };

  return (
    isAuthenticated && (
      <button onClick={handleLogout} disabled={isLoading}>
        Log Out
      </button>
    )
  );
};

export default LogoutButton;
