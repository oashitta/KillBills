import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import AddPayee from './AddPayee';

const EditBill = ({ billId, closeModal }) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [payees, setPayees] = useState([]);
  const [bill, setBill] = useState({});
  const [btnClicked, setBtnClicked] = useState("");
  const [isAddPayeeModalOpen, setIsAddPayeeModalOpen] = useState(false);

  const date = new Date();
  const today = date.toISOString()

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

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await axios.get(
          process.env.REACT_APP_API_SERVER_URL + "/bills/" + billId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const bill = response.data.bill;
        console.log("dueDate", bill.due_date);
        const dueDate = String(bill.due_date).split("").slice(0, 10).join("");
        const reminderDate = String(bill.reminder_date)
          .split("")
          .slice(0, 10)
          .join("");

          const paidDate = () => {
            if (!bill.paid_date) {
              return undefined;
            }
            return String(bill.paid_date).split("").slice(0, 10).join("");
          };
          const isPaid = () => {
            if (bill.paid_date) {
              return true;
            }
            return false;
          };

        formik.setValues({
          isPaid: isPaid(),
          payeeId: bill.payee_id,
          userId: user.sub,
          amount: bill.amount,
          dueDate,
          reminderDate,
          paidDate: paidDate(),
          note: bill.note,
        });
        setBill(response.data.bill);
      } catch (error) {
        console.log("Error editing bill:", error);
      }
    };

    fetchBill();
  }, [getAccessTokenSilently]);

  const formik = useFormik({
    initialValues: {
      isPaid: false,
      payeeId: 1,
      userId: user.sub,
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

        if (btnClicked === "edit") {
          const paidDate = () => {
            if (!values.paidDate && values.isPaid) {
              return String(today).split("").slice(0, 10).join("");
            }
            if (values.paidDate && values.isPaid) {
              return String(values.paidDate).split("").slice(0, 10).join("");
            }
            if (!values.paidDate && !values.isPaid) {
              return undefined;
            }
          };

          values.paidDate = paidDate();

          await axios.put(
            process.env.REACT_APP_API_SERVER_URL + "/bills/" + billId,
            values,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          toast.success("Bill updated successfully!");
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          await axios.delete(
            process.env.REACT_APP_API_SERVER_URL + "/bills/" + billId,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          toast.success("Bill deleted successfully!");
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        toast.error("Action failed. Please try again.");
      }
    },
  });

  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white dark:bg-gray-900 rounded-md lg:max-w-xl">
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="payeeId"
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
                value={formik.values.payeeId}
                className="flex-grow w-3/5 px-4 py-2 mr-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
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
              Note:
            </label>
            <textarea
              id="note"
              name="note"
              type="textarea"
              placeholder="Reminder Date"
              onChange={formik.handleChange}
              value={formik.values.note}
              className="block w-full px-4 py-2 mt-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <div className="flex">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  id="isPaid"
                  name="isPaid"
                  type="checkbox"
                  className="sr-only peer"
                  checked={formik.values.isPaid}
                  onClick={formik.handleChange}
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                <span className="ml-2 text-md font-medium text-gray-900">
                  Paid
                </span>
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              onClick={(e) => {
                setBtnClicked("edit");
              }}
              className="px-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Edit Bill
            </button>
            <button
              type="submit"
              onClick={(e) => {
                setBtnClicked("delete");
              }}
              className="ml-6 px-6 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-indigo-600"
            >
              Delete Bill
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
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover={true}
        closeOnClick={true}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EditBill;
