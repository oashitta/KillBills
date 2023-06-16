import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLink } from "react-icons/fi";
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';
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
      const filteredBills = data.bills
        .filter((bill) => new Date(bill.due_date) >= new Date())
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
        setBills(filteredBills);
      } catch (error) {
        console.log("Error fetching bills:", error);
      }
    };
    

  const data = bills.map((bill) => 
    ({
      id: bill.id,
      name: bill.payee_name,
      amount: bill.amount,
      date: bill.due_date,
      link: bill.payee_link,
    })
  );

  const columns = [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Payee',
        
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              paddingLeft: '1.1rem',
              fontSize: '1.2rem',
              gap: '1rem',
            }}
          >
            <span>{renderedCellValue}</span>
            <a href={row.original.link}><FiLink className="ml-2" /></a>
          </Box>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              paddingLeft: '1.1rem',
              fontSize: '1.2rem',
              gap: '1rem',
            }}
          >
            <span>${renderedCellValue.toFixed(2)}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'date', //normal accessorKey
        header: 'Due Date',
        
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              paddingLeft: '1.1rem',
              fontSize: '1.2rem',
              gap: '1rem',
            }}
          >
            <span>{new Date(renderedCellValue).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </Box>
        ),
      },
    ]

  //  [
  //   {
  //     name: "Payee",
  //     options: {
  //       customBodyRender: (value, tableMeta, updateValue) => (
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           {value}
  //           {tableMeta.rowData[0] && (
  //             <a
  //               href={tableMeta.rowData[1]}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //             >
  //               <FiLink className="ml-2" />
  //             </a>
  //           )}
  //         </div>
  //       ),
  //     },
  //   },
  //   {
  //     name: "Amount",
  //     options: {
  //       customBodyRender: (value) => {
  //         // Format the amount here if needed
  //         return value;
  //       },
  //       customSort: (data, colIndex, order) => {
  //         return data.sort((a, b) => {
  //           const amountA = parseFloat(a.data[colIndex].replace(/[$,]/g, ""));
  //           const amountB = parseFloat(b.data[colIndex].replace(/[$,]/g, ""));
  //           return order === "asc" ? amountA - amountB : amountB - amountA;
  //         });
  //       },
  //     },
  //   },
  //   {
  //     name: "Due Date",
  //     options: {
  //       customBodyRender: (value) => {
  //         // Format the date here if needed
  //         return value;
  //       },
  //       customSort: (data, colIndex, order) => {
  //         return data.sort((a, b) => {
  //           const dateA = new Date(a.data[colIndex]);
  //           const dateB = new Date(b.data[colIndex]);
  //           return order === "asc" ? dateA - dateB : dateB - dateA;
  //         });
  //       },
  //     },
  //   },
  // ];

  // const options = {
  //   selectableRows: "none",
  // };

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div>
            <h2 className="font-bold text-xl text-slate-900 my-7 flex justify-center">
              Bills Snapshot
            </h2>
            <div className="flex mx-auto">
              <ChartBillsByPayee />
              <ChartBillsByCategory />
              <ChartBillsByMonth />
            </div>

            <h2 className="font-bold text-xl text-slate-900 my-7 flex justify-center">
              Upcoming Bills
            </h2>

            <div className="mt-4">
              
                <MaterialReactTable
                  columns={columns}
                  data={data}
                  enableColumnResizing
                  initialState={{ columnVisibility: { id: false } }}
                  muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {
                      window.open(
                        `/edit-bill/${row.original.id}`,
                        "_self"
                      )
                    },
                      sx: {
                      cursor: 'pointer',
                    },
                  })}
                  
                  muiTableHeadCellProps={{
                    sx: {
                      color: 'blue',
                      fontSize: '1.3rem',
                      paddingLeft: '2rem',
                    },
                  }}
                />
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