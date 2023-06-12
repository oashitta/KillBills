import { useAuth0 } from "@auth0/auth0-react";
import { React, useState } from "react";

const Dashboard_actions = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [bills, setBills] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [totalDue, setTotalDue] = useState(0);

  return (
    <>
      {isAuthenticated && (
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 border-solid border-2 border-violet-400">
          {/* on click of this button, the page should display the add bill component.*/}
          <div className="flex">
            <div className="p-3 bg-violet-500 font-bold text-white">
              <a href="">Add Bill +</a>
            </div>
            <div className="p-3 bg-violet-500 font-bold text-white mx-3">
              <a href="">Add Payee +</a>
            </div>
          </div>
          {/* on click of the payent history button, the page shld display the payment history components */}
          <div className="p-3 border-solid border-2 border-violet-400  bg-violet-500 font-bold text-white">
            <a href="">Payment History</a>
          </div>

          {/* this does nothing. just shows the total amount */}
          <div className="p-3 border-solid border-2 border-violet-400 font-bold">
            <p>Total Due: ${totalDue}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard_actions;
