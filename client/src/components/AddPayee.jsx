import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";

const AddPayee = ({ closePayeeModal }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await axios.get(
          process.env.REACT_APP_API_SERVER_URL + "/categories",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [getAccessTokenSilently]);

  const formik = useFormik({
    initialValues: {
      categoryId: 1,
      name: "",
      accountNumber: "",
      url: "",
      isHidden: false,
    },
    onSubmit: async (values) => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        await axios.post(
          process.env.REACT_APP_API_SERVER_URL + "/payees",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        toast.success("Payee added successfully!");
        closePayeeModal();
      } catch (error) {
        toast.error("Failed to add payee. Please try again.");
      }
    },
  });

  return (
    <div className="relative flex flex-col justify-center overflow-hidden">
      <div className="w-full p-6 m-auto bg-white dark:bg-gray-900 rounded-md lg:max-w-xl">
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="payee" className="text-md font-bold text-gray-800 dark:text-gray-200">
              Category:
            </label>
            <select
              name="categoryId"
              id="categoryId"
              required
              onChange={formik.handleChange}
              value={formik.values.value}
              className="flex-grow w-full px-4 py-2 mr-2 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <label htmlFor="name" className="text-md font-bold text-gray-800 dark:text-gray-200">
              Payee Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Payee Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="accountNumber"
              className="text-md font-bold text-gray-800 dark:text-gray-200"
            >
              Acount Number:
            </label>
            <input
              id="accountNumber"
              name="accountNumber"
              type="text"
              placeholder="Account #"
              onChange={formik.handleChange}
              value={formik.values.accountNumber}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <label
              htmlFor="accountNumber"
              className="text-md font-bold text-gray-800 dark:text-gray-200"
            >
              URL Link:
            </label>
            <input
              id="url"
              name="url"
              type="text"
              placeholder="https://"
              onChange={formik.handleChange}
              value={formik.values.url}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white dark:bg-gray-700 border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Payee
            </button>
          </div>
        </form>
      </div>
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

export default AddPayee;
