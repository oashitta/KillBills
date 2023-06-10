import axios from 'axios';
import './App.css';
import AddBill from './components/AddBill';

import { useState, useEffect } from 'react';
import AddUser from './components/AddUser';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/users').then(res => {
      console.log(res.data)
      setUsers(res.data)
    })
  }, [])

  return (
    <div className="App">
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
      <AddUser />
    </div>
  );
}

export default App;
