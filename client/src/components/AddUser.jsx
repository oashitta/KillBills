import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik';

function AddUser() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: data => {
      console.log(data)
      axios.post('http://localhost:8080/users/new', 
      data, {
        headers: {'Content-Type': 'application/json'}
      })
      .then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      })
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.name}
      />

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor="lastName">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddUser
