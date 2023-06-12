import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';

const AddBill = () => {
  const [payees, setPayees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/payees').then(res => {
      console.log("data", res.data)
      setPayees(res.data.payees)
    })
  }, [])

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
      axios.post('http://localhost:8080/bills', 
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
            <select name="names" id="names"> 
              {payees.map((payee) => {
                return <option key={payee.id} value={payee.name}>{payee.name}</option>
              })}
            </select>
          </div>
          <div className="mb-2 block text-xl font-semibold text-gray-800">
            amount
          </div>
          <div className='border-2'>
            due date<br />
            calendar
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