import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Calendar from "./Calendar"
import AddBill from "./AddBill"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [totalPastDue, setTotalPastDue] = useState(null);
  const [totalDue, setTotalDue] = useState(null);
  const [countPastDue, setCountPastDue] = useState(null);
  const [nextDue, setNextDue] = useState(null);
  const [billsUnpaidDates, setBillsUnpaidDates] = useState(null);
  const [billsPaidDates, setBillsPaidDates] = useState(null);
  const [billsOverdueDates, setBillsOverdueDates] = useState(null);
  const [isAddBillModalOpen, setIsAddBillModalOpen] = useState(false);
  
  useEffect(() => {
    const fetchOverdueTotal = async () => {
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

    fetchOverdueTotal();
  }, []);

  useEffect(() => {
    const fetchUnpaidTotal = async () => {
      try {
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
        setTotalDue(data.total);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchUnpaidTotal();
  }, []);

  useEffect(() => {
    const fetchNextDays = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await fetch(
          process.env.REACT_APP_API_SERVER_URL + "/bills/next/days",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setNextDue(data.days);
      } catch (error) {
        console.error("Error fetching total amount:", error);
      }
    };

    fetchNextDays();
  }, []);

  useEffect(() => {
    const fetchOverdueCount = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await fetch(
          process.env.REACT_APP_API_SERVER_URL + "/bills/overdue/count",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setCountPastDue(data.count);
      } catch (error) {
        console.error("Error fetching total count:", error);
      }
    };

    fetchOverdueCount();
  }, []);

  useEffect(() => {
    const fetchBillsUnpaidDates = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await fetch(
          process.env.REACT_APP_API_SERVER_URL + "/bills/unpaid/dates",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setBillsUnpaidDates(data.billsUnpaidDates);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchBillsUnpaidDates();
  }, []);

  useEffect(() => {
    const fetchBillsPaidDates = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await fetch(
          process.env.REACT_APP_API_SERVER_URL + "/bills/paid/dates",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setBillsPaidDates(data.billsPaidDates);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchBillsPaidDates();
  }, []);

  useEffect(() => {
    const fetchBillsOverdueDates = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await fetch(
          process.env.REACT_APP_API_SERVER_URL + "/bills/overdue/dates",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setBillsOverdueDates(data.billsOverdueDates);
      } catch (error) {
        console.error("Error fetching dates:", error);
      }
    };

    fetchBillsOverdueDates();
  }, []);
  
  const showToast = (message) => {
    toast.success(message);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const showToastError = (message) => {
    toast.error(message);
  };

  const closeModal = () => {
    setIsAddBillModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="mx-auto flex flex-wrap max-w-7xl items-center justify-between p-6">
            <div className="w-2/5 lg:w-2/3">
              <div className="p-2">
                <p className="mb-0 font-sans font-semibold leading-normal text-sm">{totalDue !== 0 ? "Total Due" : "Congratulations! You have no bills due. Add a bill to get started."}</p>
                <h1 className="mb-0 font-bold text-2xl">
                  {totalDue !== 0 && <p>{totalDue}</p>}
                </h1>
                {nextDue >= 0 && (
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">Next bill due&nbsp;
                    {nextDue === 0
                      ? "today"
                      : nextDue === 1
                      ? "tomorrow"
                      : `in ${nextDue} days`
                    }
                  </span>
                )}
              </div>
              {totalPastDue !== 0 && (
                <div className="p-2">
                   <p className="mb-0 font-sans font-semibold leading-normal text-sm text-red-500">
                    Total Past Due
                  </p>
                  <h1 className="mb-0 font-bold text-2xl text-red-500">
                    {totalPastDue}
                  </h1>
                  <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{countPastDue} {countPastDue == 1 ? 'Bill' : 'Bills'} Overdue</span>
                </div>
              )}
            </div>
            <div className="w-3/5 lg:w-1/3">
              <Calendar billsUnpaidDates={billsUnpaidDates} billsPaidDates={billsPaidDates} billsOverdueDates={billsOverdueDates} />
            </div>
          </div>
          <div className="mx-auto flex max-w-7xl items-center justify-between p-6 py-0">
            <div>
              <button type="button" onClick={() => setIsAddBillModalOpen(true)} className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-2 text-lg font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>Add Bill&nbsp;&nbsp;
              </button>
            </div>
          </div>
          {isAddBillModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black" onClick={handleOverlayClick}>
              <div className="relative bg-white bg-white dark:bg-gray-900 w-5/6 max-w-md p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-full">
                <AddBill closeModal={closeModal} showToast={showToast} showToastError={showToastError} />
                <button type="button" onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            )}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            pauseOnHover={true}
            closeOnClick={true}
            hideProgressBar={false}
          />
        </>
      )}
    </>
  );
};

export default Dashboard;
