import { useState, useEffect } from 'react'
import axios from 'axios'
import { useFormik } from 'formik';

const EditBill = () => {
  const [payees, setPayees] = useState([]);
  const [bill, setBill] = useState({});

  

  useEffect(() => {
    axios.get('http://localhost:8080/payees').then(res => {
      console.log("data", res.data)
      setPayees(res.data.payees)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8080/bills/5')
    .then(res => {
      console.log("data", res.data)

      const bill = res.data.bill
      const dueDate = String(bill.due_date).split('').slice(0,10).join('')
      const reminderDate = String(bill.reminder_date).split('').slice(0,10).join('')
      const paidDate = String(bill.paid_date).split('').slice(0,10).join('')

      formik.setValues({
        payeeId: bill.payee_id,
        userId: 1,
        amount: bill.amount,
        dueDate,
        reminderDate,
        paidDate,
        note: bill.note})
      setBill(res.data.bill)
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      payeeId: 1,
      userId: 1,
      amount: '',
      dueDate: '',
      reminderDate: '',
      paidDate: '',
      note: '',
    },
    onSubmit: values => {
      console.log(values)
      axios.put('http://localhost:8080/bills/5', 
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
              htmlFor="payeeId"
              className="text-xl font-bold text-gray-800"
            >
              Payee: 
            </label>
            <select name="payeeId" id="payeeId" onChange={formik.handleChange} value={formik.values.payeeId}> 
              {payees.map((payee) => {
                return <option key={payee.id} value={payee.id}>{payee.name}</option>
              })}
            </select>
          </div>
          <div mt-2>
            <label
                htmlFor="amount"
                className="text-xl font-bold text-gray-800"
              >
                Amount: 
              </label>
            <input
              id="amount"
              name="amount"
              type="text"
              pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
              data-type="currency"
              onChange={formik.handleChange}
              value={formik.values.amount}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className='mt-2'>
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
              placeholder='Due Date'
              onChange={formik.handleChange}
              value={formik.values.dueDate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className='mt-2'>
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
              placeholder='Reminder Date'
              onChange={formik.handleChange}
              value={formik.values.reminderDate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className='mt-2'>
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
              placeholder='Paid Date'
              onChange={formik.handleChange}
              value={formik.values.paidDate}
              className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className='mt-2'>
            <label
              htmlFor="note"
              className="text-xl font-bold text-gray-800"
            >
              Note: 
            </label>
            <textarea
              id="note"
              name="note"
              type="textarea" 
              placeholder='Reminder Date'
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
              Edit Bill
            </button>
            <button 
              type="submit"
              className="w-full mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Delete Bill
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditBill