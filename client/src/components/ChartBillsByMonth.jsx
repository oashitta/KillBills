import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const ChartBillsByMonth = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const accessToken = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH0_AUDIENCE,
          });
          const response = await fetch(
            process.env.REACT_APP_API_SERVER_URL + "/bills/month",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();
          const months = data.months.map((month) => month.month_year);
          const totalAmounts = data.months.map((month) =>
            parseFloat(month.total_amount.replace(/[$,]/g, "")).toFixed(2)
          );

          setChartData({
            labels: months,
            datasets: [
              {
                data: totalAmounts,
                fill: false,
                backgroundColor: [
                  'rgba(220, 20, 60, 0.6)'
                  // "rgba(255, 99, 132, 0.6)",    // Red
                  // "rgba(54, 162, 235, 0.6)",    // Blue
                  // "rgba(255, 206, 86, 0.6)",     // Yellow
                  // "rgba(75, 192, 192, 0.6)",    // Turquoise
                  // "rgba(255, 159, 64, 0.6)",     // Orange
                  // "rgba(153, 102, 255, 0.6)",   // Purple
                  // "rgba(220, 20, 60, 0.6)",      // Crimson
                  // "rgba(46, 139, 87, 0.6)",     // Sea Green
                  // "rgba(238, 130, 238, 0.6)",   // Violet
                  // "rgba(30, 144, 255, 0.6)",    // Dodger Blue
                  // "rgba(255, 0, 0, 0.6)",         // Bright Red
                  // "rgba(0, 255, 0, 0.6)",         // Bright Green
                  // "rgba(0, 0, 255, 0.6)",         // Bright Blue
                  // "rgba(255, 255, 0, 0.6)",       // Yellow
                  // "rgba(255, 0, 255, 0.6)",       // Magenta
                  // "rgba(0, 255, 255, 0.6)"        // Cyan
                ],
                borderWidth: 2,
                borderColor: 'rgba(220, 20, 60, 0.6)',
                tension: 0.3
              },
            ],
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "By Month",
                },
                legend: {
                  display: false,
                  position: "right"
                },
              },
            },
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
    <div className="p-0">
      {isAuthenticated ? (
        chartData ? (
          <div className="rounded-lg shadow-lg border border-gray-100 dark:border-0 p-4">
            <Chart type="line" data={chartData} options={chartData.options} />
          </div>
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
