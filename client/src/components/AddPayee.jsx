import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useFormik } from 'formik';

const AddPayee = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/categories').then(res => {
      console.log("data", res.data.categories)
      setCategories(res.data.categories)
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      categoryId: 1,
      name: '',
      accountNumber: '',
      url: '',
      isHidden: false,
    },
    onSubmit: values => {
      console.log(values)
      axios.post('http://localhost:8080/payees', 
      values, {
        headers: {'Content-Type': 'application/json'}
      })
    }
  });

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring-2 ring-indigo-600 lg:max-w-xl">
        <form className="mt-6" onSubmit={formik.handleSubmit}>
          <div className="mb-2">
            <label
              htmlFor="payee"
              className="text-xl font-bold text-gray-800"
            >
              Category: 
            </label>
            <select name="categoryId" id="categoryId" onChange={formik.handleChange}
              value={formik.values.value}>
                {categories.map((category) => {
                  return <option key={category.id} value={category.id}>{category.name}</option>
                })}


              {/* <option value="1">Utilities</option>
              <option value="2">Credit Card</option>
              <option value="3">Housing</option>
              <option value="4">Transportation</option>
              <option value="5">Insurance</option>
              <option value="6">Health care</option>
              <option value="7">Investments</option>
              <option value="8">Personal</option>
              <option value="9">Entertainment</option>
              <option value="10">Miscellaneous</option> */}
            </select>
          </div>
          <input
              id="name"
              name="name"
              type="text"
              placeholder='Payee Name'
              onChange={formik.handleChange}
              value={formik.values.name}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <input
              id="accountNumber"
              name="accountNumber"
              type="text" 
              placeholder='Account #'
              onChange={formik.handleChange}
              value={formik.values.accountNumber}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          <input
              id="url"
              name="url"
              type="text"
              placeholder='Link'
              onChange={formik.handleChange}
              value={formik.values.url}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          <div className="mt-6">
            <button 
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Add Payee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPayee
