import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import UpcomingBillsTotal from "./UpcomingBillsTotal";

const Dashboard = () => {
  const { user, getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const [totalPastDue, setTotalPastDue] = useState(null);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await fetch(
          process.env.REACT_APP_API_SERVER_URL + "/bills/overdue/total",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setTotalPastDue(data.total);
      } catch (error) {
        console.error("Error fetching total due:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isAuthenticated && (
        <>
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <div className="rounded-2xl shadow-lg bg-gray-50 border border-gray-100 p-8">
            <p className="mb-0 font-sans font-semibold leading-normal text-sm">Total Due</p>
            <h1 className="mb-0 font-bold text-2xl">
              <UpcomingBillsTotal />
            </h1>
          </div>
          {totalPastDue !== null && (
            <div className="rounded-2xl shadow-lg bg-gray-50 border border-gray-100 p-8">
              <p className="mb-0 font-sans font-semibold leading-normal text-sm text-red-500">
                Total Past Due
              </p>
              <h1 className="mb-0 font-bold text-2xl text-red-500">
                {totalPastDue}
              </h1>
            </div>
          )}
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-8">
                <p className="mt-6 flex items-baseline justify-center gap-x-2">
                  <span className="text-9xl font-bold tracking-tight text-indigo-600">{currentDay}</span>
                </p>
                <p className="text-base font-semibold text-indigo-600">{currentMonth}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <Link to="/add-bill">
            <button type="button" className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>Add Bill&nbsp;&nbsp;
            </button>
          </Link>
        </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
