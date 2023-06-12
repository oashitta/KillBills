import { React } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLink } from "react-icons/fi";

const Upcoming_bills = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div className="mx-auto flex flex-col max-w-7xl items-center justify-between p-6 lg:px-8">
          <h2 className="font-bold text-xl text-slate-900 my-5">
            Upcoming Bills
          </h2>

          {/* for the table, we want the new rows to be auto generated once the user adds a new bill. it should also be auto populated from the bills in the db. */}
          <table className="table-fixed w-full border-solid border-2">
            <thead className="border-solid border-2">
              <tr className="text-left px-2">
                <th className="border px-4 py-2">Payee</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Due Date</th>
              </tr>
            </thead>
            <tbody className="border-solid border-2 ">
              <tr className="border-solid border-2 px-2">
                <td className="border px-4 py-2 flex">
                  Virgin Mobile
                  <a href="">
                    <FiLink className="ml-2" />
                  </a>
                </td>
                <td className="border px-4 py-2">$50.99</td>
                <td className="border px-4 py-2">2023-07-01</td>
              </tr>
              <tr className="border-solid border-2 ">
                <td className="border px-4 py-2 flex">
                  Wyse Electricity
                  {/* This link should go to the payees's website. */}
                  <a href="">
                    <FiLink className="ml-2" />
                  </a>
                </td>
                <td className="border px-4 py-2">$124.69</td>
                <td className="border px-4 py-2">2023-06-28</td>
              </tr>
              <tr className="border-solid border-2 ">
                <td className="border px-4 py-2 flex">
                  TD Insurance
                  <a href="">
                    <FiLink className="ml-2" />
                  </a>
                </td>
                <td className="border px-4 py-2">$90.59</td>
                <td className="border px-4 py-2">2023-06-22</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Upcoming_bills;
