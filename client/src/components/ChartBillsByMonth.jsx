import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const ChartBillsByMonth = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE
          });
          const response = await fetch("http://localhost:8080/bills/month", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          const months = data.months.map(month => month.month_year);
          const totalAmounts = data.months.map(month => parseFloat(month.total_amount.replace(/[$,]/g, "")).toFixed(2));
          
          setChartData({
            labels: months,
            datasets: [
              {
                label: "Total Amount",
                data: totalAmounts,
                fill: false,
                backgroundColor: [
                  "rgba(255,99,132,0.6)",
                  "rgba(54,162,235,0.6)",
                  "rgba(255,206,86,0.6)",
                  "rgba(75,192,192,0.6)",
                  "rgba(175,192,192,0.6)",
                  "rgba(235,192,192,0.6)",
                  "rgba(240,181,210,0.6)",
                  "rgba(199,203,226,0.6)",
                  "rgba(255,230,153,0.6)",
                  "rgba(203,226,199,0.6)",
                  "rgba(153,255,230,0.6)",
                  "rgba(226,199,203,0.6)",
                ],       
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 1,
              },
            ],
            options: {
              plugins: {
                colors: {
                  enabled: false
                }
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        chartData ? (
          <Chart type='pie' data={chartData} />
        ) : (
          <p>No data available</p>
        )
      ) : (
        <p>Please log in to view</p>
      )}
    </div>
  );
};

export default ChartBillsByMonth;