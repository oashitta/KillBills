import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AddPayee from './AddPayee';

const AddBill = ({ closeModal, showToast, showToastError }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [payees, setPayees] = useState([]);
  const [isAddPayeeModalOpen, setIsAddPayeeModalOpen] = useState(false);

  const navigate = useNavigate();

  const closePayeeModal = () => {
    setIsAddPayeeModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closePayeeModal();
    }
  };

  useEffect(() => {
    const fetchPayees = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await axios.get(
          process.env.REACT_APP_API_SERVER_URL + "/payees",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setPayees(response.data.payees);
      } catch (error) {
        console.log("Error fetching payees:", error);
      }
    };

    fetchPayees();
  }, [getAccessTokenSilently]);

  const formik = useFormik({
    initialValues: {
      userId: user.sub
    },
    onSubmit: async (values) => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        await axios.post(
          process.env.REACT_APP_API_SERVER_URL + "/bills",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        showToast("Bill added successfully!");
        closeModal();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        showToastError("Failed to add bill. Please try again.");
      }
    },
  });

  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white dark:bg-gray-900 rounded-md lg:max-w-xl">
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="payeeName"
              className="text-md font-bold text-gray-800 dark:text-gray-200"
            >
              Payee:
            </label>
            <div className="flex mb-2">
              <select
                name="payeeId"
                id="payeeId"
                required 
                onChange={formik.handleChange}
                value={formik.values.value}
                className="flex-grow w-3/5 px-4 py-2 mr-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                <option value="">Choose a payee</option>
                {payees
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((payee) => (
                    <option key={payee.id} value={payee.id}>
                      {payee.name}
                    </option>
                  ))}
              </select>
              <div className="flex-grow-0">
                <button
                  type="button"
                  onClick={() => setIsAddPayeeModalOpen(true)}
                  className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Add Payee
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="amount" className="text-md font-bold text-gray-800 dark:text-gray-200">
              Amount:
            </label>
            <input
              id="amount"
              name="amount"
              required 
              type="text"
              pattern="^(?:\$)?(?:\d{1,3}(?:,\d{3})*(?:\.\d+)?|\d+(?:\.\d+)?)$"
              data-type="currency"
              placeholder="$1,000.00"
              onChange={formik.handleChange}
              value={formik.values.amount}
              className="block w-full px-4 py-2 mt-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="dueDate"
              className="text-md font-bold text-gray-800 dark:text-gray-200"
            >
              Due Date:
            </label>
            <input
              id="dueDate"
              name="dueDate"
              required 
              type="date"
              placeholder="Due Date"
              onChange={formik.handleChange}
              value={formik.values.dueDate}
              className="block w-full px-4 py-2 mt-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="reminderDate"
              className="text-md font-bold text-gray-800 dark:text-gray-200"
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
              className="block w-full px-4 py-2 mt-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="paidDate"
              className="text-md font-bold text-gray-800 dark:text-gray-200"
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
              className="block w-full px-4 py-2 mt-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="note" className="text-md font-bold text-gray-800 dark:text-gray-200">
              Notes:
            </label>
            <textarea
              id="note"
              name="note"
              type="textarea"
              placeholder="Notes"
              onChange={formik.handleChange}
              value={formik.values.note}
              className="block w-full px-4 py-2 mt-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Bill
            </button>
          </div>
        </form>
      </div>
      {isAddPayeeModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-black" onClick={handleOverlayClick}>
          <div className="relative bg-white dark:bg-gray-900 w-5/6 max-w-md p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-full">
            <AddPayee closePayeeModal={closePayeeModal} />
            <button type="button" onClick={closePayeeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 dark:stroke-gray-200">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBill;