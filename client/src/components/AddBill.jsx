import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik';

const AddBill = () => {
  const formik = useFormik({
    initialValues: {
      amount: 0,
      due_date: '',
      reminder_date: '',
      paid_date: '',
      note: '',
    },
    onSubmit: values => {
      console.log(values)
      axios.post('http://localhost:8080/users/new', 
      values, {
        headers: {'Content-Type': 'application/json'}
      })
    }
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
          <div className="text-xl font-bold text-gray-800">
            <span>+ add payees</span>
            <span>- delete payees</span>
          </div>
          <form className="mt-6" onSubmit={formik.handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="payee"
                className="text-xl font-bold text-gray-800"
              >
                Payee: 
              </label>
              <select name="dog-names" id="dog-names"> 
                <option value="rigatoni">Rigatoni</option> 
                <option value="dave">Dave</option> 
                <option value="pumpernickel">Pumpernickel</option> 
                <option value="reeses">Reeses</option> 
              </select>
            </div>
            <div className="mb-2 block text-xl font-semibold text-gray-800">
              amount
            </div>
            <div className='border-2'>
              due date<br />
              calendar
            {/* <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            /> */}
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
  )
}

export default AddBill