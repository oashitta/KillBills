import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const EditPayee = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [payee, setPayee] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

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
              "Content-Type": "application/json",
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

  useEffect(() => {
    const fetchPayee = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        const response = await axios.get(
          process.env.REACT_APP_API_SERVER_URL + "/payees/5",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const payee = response.data.payee;
        console.log(payee);

        formik.setValues({
          categoryId: 1,
          name: payee.name,
          accountNumber: payee.account_number,
          url: payee.url,
          isHidden: payee.is_hidden,
        });
        setPayee(response.data.payee);
      } catch (error) {
        console.log("Error fetching payee:", error);
      }
    };

    fetchPayee();
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
        await axios.put(
          process.env.REACT_APP_API_SERVER_URL + "/payees/5",
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        navigate("/edit-bill/5");
      } catch (error) {
        console.log("Error editing payee:", error);
      }
    },
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md border-solid border-2 border-violet-400 lg:max-w-xl">
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label htmlFor="payee" className="text-xl font-bold text-gray-800">
              Category:
            </label>
            <select
              name="categoryId"
              id="categoryId"
              onChange={formik.handleChange}
              value={formik.values.value}
            >
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Payee Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <input
            id="accountNumber"
            name="accountNumber"
            type="text"
            placeholder="Account #"
            onChange={formik.handleChange}
            value={formik.values.accountNumber}
            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <input
            id="url"
            name="url"
            type="text"
            placeholder="Link"
            onChange={formik.handleChange}
            value={formik.values.url}
            className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
          <div className="mt-4">
            <div className="flex">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  id="isHidden"
                  name="isHidden"
                  type="checkbox"
                  className="sr-only peer"
                  checked={formik.values.isHidden}
                  onClick={formik.handleChange}
                  readOnly
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                <span className="ml-2 text-lg font-medium text-gray-900">
                  Active
                </span>
              </label>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Edit Payee
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

export default EditPayee;
