import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import EditBill from "./EditBill";

const PaymentHistory = ({darkMode}) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [bills, setBills] = useState([]);
  const [isEditBillModalOpen, setIsEditBillModalOpen] = useState(false);
  const [billId, setBillId] = useState(null);

  const [mode, setMode] = useState(localStorage.getItem('theme'));

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem('theme');
      setMode(updatedTheme);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const theme = createTheme({
    palette: {
      mode: mode
    },
  });

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
        process.env.REACT_APP_API_SERVER_URL + "/bills/paid",
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

  const data = bills.map((bill) => ({
    id: bill.id,
    name: bill.payee_name,
    amount: bill.amount,
    date: bill.paid_date,
    link: bill.payee_link,
    note: bill.note
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
          }}
        >
          <span>${renderedCellValue.toFixed(2)}</span>
        </Box>
      ),
    },
    {
      accessorKey: "date", //normal accessorKey
      header: "Paid Date",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          className="flex justify-start pl-4"
          sx={{
            fontSize: "1.0rem",
            gap: "1rem",
          }}
        >
          <span>
            {new Date(renderedCellValue).toLocaleDateString("en-US", {
              timeZone: "UTC",
              month: "long",
              day: "numeric",
            })}
          </span>
        </Box>
      ),
    },
  ];

  const openEditBillModal = (billId) => {
    setIsEditBillModalOpen(true);
    setBillId(billId);
  };

  const closeModal = () => {
    setIsEditBillModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <>
          <div className="mx-auto flex max-w-7xl items-center justify-between pb-0 mt-12">
            <div className="border-b border-gray-200 bg-white dark:bg-black rounded-t-sm pt-2 px-0 shadow-lg">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="mr-2">
                  <a
                    href="/"
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
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Unpaid
                  </a>
                </li>
                <li className="mr-2">
                  <a
                    href="/history"
                    className="inline-flex p-4 text-indigo-600 border-b-2 border-indigo-600 active group font-bold"
                    aria-current="page"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 24 24"
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
          <div className="mx-auto max-w-7xl px-0 py-0">
            <div>
              <div className="mt-0">
              <ThemeProvider theme={theme}>
                  <MaterialReactTable
                    columns={columns}
                    data={data}
                    initialState={{ columnVisibility: { id: false }, density: 'compact' }}
                    enableDensityToggle={false}
                    enableHiding={false}
                    renderDetailPanel={({ row }) => (
                      <Box
                        sx={{            
                          display: 'grid',
                          marginLeft: '18px',
                          gridTemplateColumns: '1fr 1fr',
                          width: '100%',
                        }}            
                      >
                        <p>{row.original.note}</p><br />
                        <p>Visit: <a href={row.original.link} className="underline">{row.original.link}</a></p>
                      </Box>           
                    )}
                    muiTableBodyRowProps={({ row }) => ({
                      onClick: () => {
                        openEditBillModal(row.original.id);
                      },
                      sx: {
                        cursor: "pointer",
                      },
                    })}
                    muiTableHeadCellProps={{
                      sx: {
                        fontSize: "1.0rem",
                        paddingLeft: "1.6rem",
                      },
                    }}
                  />
                </ThemeProvider>
              </div>
            </div>
          </div>
          {isEditBillModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black" onClick={handleOverlayClick}>
              <div className="relative bg-white dark:bg-gray-900 w-5/6 max-w-md p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-full">
                <EditBill billId={billId} closeModal={closeModal} />
                <button type="button" onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            )}
        </>
      ) : (
        <p className="flex justify-center font-bold text-xl text-slate-900 my-5">
          Please log in.
        </p>
      )}
    </>
  );
};

export default PaymentHistory;
