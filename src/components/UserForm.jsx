import React, { useState } from 'react';
import { useAddEmployeeMutation } from '../store/employeeApiSlice';

const UserForm = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [addEmployee] = useAddEmployeeMutation();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (firstname && lastname) {
      addEmployee({ firstname, lastname });
    }
    setFirstname('');
    setLastname('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Employee</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <label htmlFor="firstname">firstname:</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="lastname">lastname:</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>
      <button disabled={!firstname || !lastname}>add</button>
    </form>
  );
};

export default UserForm;
