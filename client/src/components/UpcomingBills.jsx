import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
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
      const response = await fetch(
        process.env.REACT_APP_API_SERVER_URL + "/bills",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      const filteredBills = data.bills.sort(
        (a, b) => new Date(a.due_date) - new Date(b.due_date)
      );
      setBills(filteredBills);
    } catch (error) {
      console.log("Error fetching bills:", error);
    }
  };

  const data = bills.map((bill) => ({
    id: bill.id,
    name: bill.payee_name,
    amount: bill.amount,
    date: bill.due_date,
    link: bill.payee_link,
  }));

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name", //access nested data with dot notation
      header: "Payee",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            paddingLeft: "1.1rem",
            fontSize: "1.0rem",
            gap: "1rem",
          }}
        >
          <span>{renderedCellValue}</span>
          <a href={row.original.link}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mt-0.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </a>
        </Box>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          className="flex justify-start pl-4"
          sx={{
            fontSize: "1.0rem",
            gap: "1rem",
            textAlign: "right",
            paddingRight: "2.5rem",
          }}
        >
          <span>${renderedCellValue.toFixed(2)}</span>
        </Box>
      ),
    },
    {
      accessorKey: "date", //normal accessorKey
      header: "Due Date",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          className="flex justify-start pl-4"
          sx={{
            fontSize: "1.0rem",
            gap: "1rem",
            textAlign: "right",
            paddingRight: "2rem",
          }}
        >
          <span>
            {new Date(renderedCellValue).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </span>
        </Box>
      ),
    },
  ];

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <>
          <div className="mx-auto flex max-w-7xl items-center justify-between p-6 pb-0">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                  <a
                    href="/"
                    className="inline-flex p-4 text-indigo-600 border-b-2 border-indigo-600 active group font-bold"
                    aria-current="page"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Unpaid
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="/payment-history"
                    className="inline-flex p-4 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 group"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      strokeWidth="1"
                      stroke="currentColor"
                      className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    History
                  </a>
                </li>
                <li>
                  <a
                    href="/insights"
                    className="inline-flex p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 group"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                    </svg>
                    Insights
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-6 py-0">
            <div>
              <div className="mt-0">
                <MaterialReactTable
                  columns={columns}
                  data={data}
                  initialState={{ columnVisibility: { id: false } }}
                  muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                      window.open(`/edit-bill/${row.original.id}`, "_self");
                    },
                    sx: {
                      cursor: "pointer",
                    },
                  })}
                  muiTableHeadCellProps={{
                    sx: {
                      color: "blue",
                      fontSize: "1.0rem",
                      paddingLeft: "2rem",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="flex justify-center font-bold text-xl text-slate-900 my-5">
          Please log in.
        </p>
      )}
    </>
  );
};

export default UpcomingBills;
