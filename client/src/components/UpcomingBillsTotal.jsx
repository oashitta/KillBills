import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UpcomingBillsTotal = (totalDue, setTotalDue) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          });
          const response = await fetch(
            process.env.REACT_APP_API_SERVER_URL + "/bills/unpaid/total",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
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
          <p>{totalAmount}</p>
        ) : (
          <p>$0</p>
        )
      ) : (
        <p>Please log in to view</p>
      )}
    </div>
  );
};

export default UpcomingBillsTotal;
