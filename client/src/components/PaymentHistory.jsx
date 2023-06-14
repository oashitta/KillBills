import { React, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const PaymentHistory = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBills();
    }
  }, [isAuthenticated]);

  const fetchBills = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      const response = await fetch("http://localhost:8080/bills/paid", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setBills(data.bills);
    } catch (error) {
      console.log("Error fetching bills:", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8">
          <h2 className="font-bold text-xl text-slate-900 my-5">
            Payment History
          </h2>

          <table className="table-fixed w-full border-solid border-2">
            <thead className="border-solid border-2">
              <tr className="text-left px-2">
                <th className="border px-4 py-2">Payee</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Paid Date</th>
              </tr>
            </thead>
            <tbody className="border-solid border-2 ">
              {bills.map((bill) => (
                <tr key={bill.id} className="border-solid border-2 px-2">
                  <td className="border px-4 py-2 flex">{bill.payee_name}</td>
                  <td className="border px-4 py-2">{bill.amount}</td>
                  <td className="border px-4 py-2">
                    {new Date(bill.paid_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="flex justify-center font-bold text-xl text-slate-900 my-5">
          Please log in to view payment history.
        </p>
      )}
    </>
  );
};

export default PaymentHistory;
