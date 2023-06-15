import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLink } from "react-icons/fi";
import MUIDataTable from "mui-datatables";
import ChartBillsByPayee from "./ChartBillsByPayee";
import ChartBillsByCategory from "./ChartBillsByCategory";
import ChartBillsByMonth from "./ChartBillsByMonth";

const UpcomingBills = () => {
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
      const response = await fetch("http://localhost:8080/bills", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const filteredBills = data.bills
        .filter((bill) => new Date(bill.due_date) >= new Date())
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      setBills(filteredBills);
    } catch (error) {
      console.log("Error fetching bills:", error);
    }
  };

  const columns = [
    {
      name: "Payee",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {value}
            {tableMeta.rowData[0] && (
              <a
                href={tableMeta.rowData[1]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLink className="ml-2" />
              </a>
            )}
          </div>
        ),
      },
    },
    {
      name: "Amount",
      options: {
        customBodyRender: (value) => {
          // Format the amount here if needed
          return value;
        },
        customSort: (data, colIndex, order) => {
          return data.sort((a, b) => {
            const amountA = parseFloat(a.data[colIndex].replace(/[$,]/g, ""));
            const amountB = parseFloat(b.data[colIndex].replace(/[$,]/g, ""));
            return order === "asc" ? amountA - amountB : amountB - amountA;
          });
        },
      },
    },
    {
      name: "Due Date",
      options: {
        customBodyRender: (value) => {
          // Format the date here if needed
          return value;
        },
        customSort: (data, colIndex, order) => {
          return data.sort((a, b) => {
            const dateA = new Date(a.data[colIndex]);
            const dateB = new Date(b.data[colIndex]);
            return order === "asc" ? dateA - dateB : dateB - dateA;
          });
        },
      },
    },
  ];

  const data = bills.map((bill) => [
    bill.payee_name,
    bill.amount,
    new Date(bill.due_date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    bill.payee_link,
  ]);
  console.log("data", data)

  const options = {
    selectableRows: "none",
  };

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div>
            <div className="flex mx-auto">
              <ChartBillsByPayee />
              <ChartBillsByCategory />
              <ChartBillsByMonth />
            </div>

            <h2 className="font-bold text-xl text-slate-900 my-5">
              Upcoming Bills
            </h2>

            <div className="mt-4">
              <MUIDataTable columns={columns} data={data} options={options} />
            </div>
          </div>
        </div>
      ) : (
        <p className="flex justify-center font-bold text-xl text-slate-900 my-5">
          Please log in to view upcoming bills.
        </p>
      )}
    </>
  );
};

export default UpcomingBills;