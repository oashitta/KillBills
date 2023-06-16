import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MUIDataTable from "mui-datatables";

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
      const response = await fetch(
        process.env.REACT_APP_API_SERVER_URL + "/paid",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setBills(data.bills);
    } catch (error) {
      console.log("Error fetching bills:", error);
    }
  };

  const columns = ["Payee", "Amount", "Paid Date"];
  const data = bills.map((bill) => [
    bill.payee_name,
    bill.amount,
    new Date(bill.paid_date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  ]);

  const options = {
    selectableRows: "none",
  };

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h2 className="font-bold text-xl text-slate-900 mb-5">
            Payment History
          </h2>
          <MUIDataTable columns={columns} data={data} options={options} />
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
