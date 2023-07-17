import React, { useState } from 'react';
import { dellEmployee, updateEmployee } from '../store/EmployeeSlice';
import { useDispatch } from 'react-redux';

const Employ = ({ employee }) => {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState(employee.firstname);
  const [lastname, setLastname] = useState(employee.lastname);
  const [update, setUpdate] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (update) {
      const form = e.target.form;
      const formData = new FormData(form);
      formData.append('id', employee._id);
      await dispatch(updateEmployee({ formData }));
    }

    setUpdate(!update);
  };

  return (
    <li
      key={employee._id}
      style={{
        listStyle: 'none',
      }}
    >
      <form
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: `10px 15px`,
          border: `2px solid black`,
          borderRadius: 15,
          background: '#d6d6d6',
          color: 'black',
        }}
      >
        <img src={employee?.image || ''} style={{ maxWidth: '100px' }} />
        <button
          onClick={handleUpdate}
          style={{
            margin: 0,
          }}
        >
          {update ? 'update' : 'edit'}
        </button>
        {update ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
              name={`firstname`}
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              name={`lastname`}
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input type="file" name="file" />
          </div>
        ) : (
          <span>
            {employee.firstname} {employee.lastname}
          </span>
        )}

        <button
          onClick={() => dispatch(dellEmployee(employee._id))}
          style={{
            margin: 0,
          }}
        >
          del
        </button>
      </form>
    </li>
  );
};

export default Employ;
