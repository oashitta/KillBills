import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

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

  // const columns = ["Payee", "Amount", "Paid Date"];

  const data = bills.map((bill) => 
    ({
      id: bill.id,
      name: bill.payee_name,
      amount: bill.amount,
      date: bill.due_date
    })
  );

  const columns = [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 150,
      },
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Payee',
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              gap: '1rem',
            }}
          >
            <span>{renderedCellValue}</span>
          </Box>
        ),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
        size: 200,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              gap: '1rem',
            }}
          >
            <span>{new Date(renderedCellValue).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          </Box>
        ),
      },
    ]

  // const options = {
  //   selectableRows: "none",
  // };

  return (
    <>
      {isLoading ? (
        <p className="flex justify-center">Loading...</p>
      ) : isAuthenticated ? (
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h2 className="font-bold text-xl text-slate-900 mb-5">
            Payment History
          </h2>
          <MaterialReactTable
                  columns={columns}
                  data={data}
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
                    sx: (theme) => ({
                      color: 'blue',
                      fontSize: '1.3rem',
                      width: 'auto',
                      paddingLeft: '10rem',
                    }),
                  }}
                />
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
