import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const ChartBillsByCategory = () => {
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
            process.env.REACT_APP_API_SERVER_URL + "/bills/category",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const data = await response.json();
          const categories = data.categories.map((category) => category.name);
          const totalAmounts = data.categories.map((category) =>
            parseFloat(category.total_amount.replace(/[$,]/g, "")).toFixed(2)
          );

          setChartData({
            labels: categories,
            datasets: [
              {
                data: totalAmounts,
                fill: false,
                backgroundColor: [
                  "rgba(255, 255, 0, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(220, 20, 60, 0.6)",
                  "rgba(46, 139, 87, 0.6)",
                  "rgba(238, 130, 238, 0.6)",
                  "rgba(30, 144, 255, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(255, 0, 0, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(0, 255, 0, 0.6)",
                  "rgba(0, 0, 255, 0.6)",
                  "rgba(255, 0, 255, 0.6)",
                  "rgba(0, 255, 255, 0.6)"
                ],
                borderWidth: 2,
              },
            ],
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "By Category",
                },
                legend: {
                  display: true,
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
            <Chart type="doughnut" data={chartData} options={chartData.options} />
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

export default ChartBillsByCategory;
