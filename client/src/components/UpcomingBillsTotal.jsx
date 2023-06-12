import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UpcomingBillsTotal = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE
          });
          const response = await fetch("http://localhost:8080/bills/due/total", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          setTotalAmount(data.total);
        } else {
          setTotalAmount(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching total amount:", error);
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        totalAmount !== null ? (
          <p>Total Due: {totalAmount}</p>
        ) : (
          <p>No upcoming bills found.</p>
        )
      ) : (
        <p>Please log in to view</p>
      )}
    </div>
  );
};

export default UpcomingBillsTotal;
