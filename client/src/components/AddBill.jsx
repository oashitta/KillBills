import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AddBill = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [payees, setPayees] = useState([]);

  useEffect(() => {
    const fetchPayees = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await axios.get("http://localhost:8080/payees", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPayees(response.data.payees);
      } catch (error) {
        console.log("Error fetching payees:", error);
      }
    };

    fetchPayees();
  }, [getAccessTokenSilently]);

  const formik = useFormik({
    initialValues: {
      payeeId: 1,
      userId: 1,
      amount: "",
      dueDate: "",
      reminderDate: "",
      paidDate: "",
      note: "",
    },
    onSubmit: async (values) => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await axios.post(
          "http://localhost:8080/bills",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } catch (error) {
        console.log("Error adding bill:", error);
      }
    },
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md border-solid border-2 border-violet-400 lg:max-w-xl">
        <div className="text-xl font-bold text-gray-800">
          <span>add payee + </span>
          <span className="mx-3"> delete payee -</span>
        </div>
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="payeeName"
              className="text-xl font-bold text-gray-800"
            >
              Payee:
            </label>
            <select
              name="payeeId"
              id="payeeId"
              onChange={formik.handleChange}
              value={formik.values.value}
            >
              {payees.map((payee) => {
                return (
                  <option key={payee.id} value={payee.id}>
                    {payee.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div mt-2>
            <label htmlFor="amount" className="text-xl font-bold text-gray-800">
              Amount:
            </label>
            <input
              id="amount"
              name="amount"
              type="text"
              pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
              data-type="currency"
              placeholder="$1,000,000.00"
              onChange={formik.handleChange}
              value={formik.values.amount}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="dueDate"
              className="text-xl font-bold text-gray-800"
            >
              Due Date:
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              placeholder="Due Date"
              onChange={formik.handleChange}
              value={formik.values.dueDate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="reminderDate"
              className="text-xl font-bold text-gray-800"
            >
              Reminder Date:
            </label>
            <input
              id="reminderDate"
              name="reminderDate"
              type="date"
              placeholder="Reminder Date"
              onChange={formik.handleChange}
              value={formik.values.reminderDate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="paidDate"
              className="text-xl font-bold text-gray-800"
            >
              Paid Date:
            </label>
            <input
              id="paidDate"
              name="paidDate"
              type="date"
              placeholder="Paid Date"
              onChange={formik.handleChange}
              value={formik.values.paidDate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="note" className="text-xl font-bold text-gray-800">
              Notes:
            </label>
            <textarea
              id="note"
              name="note"
              type="textarea"
              placeholder="Notes"
              onChange={formik.handleChange}
              value={formik.values.note}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBill;
