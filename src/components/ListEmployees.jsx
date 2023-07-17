import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployee } from '../store/EmployeeSlice';
import { refreshToken } from '../store/AuthSlice';
import Employ from './Employ';

const ListEmployees = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector((state) => state.employee);

  useEffect(() => {
    const promise = dispatch(fetchEmployee());
    return () => {
      promise.abort();
    };
  }, []);

  return (
    <section>
      <h3>List Users:</h3>

      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `10px`,
        }}
      >
        {!!employees?.length &&
          employees.map((employee) => (
            <Employ employee={employee} key={employee._id} />
          ))}
      </ul>
      <button onClick={() => dispatch(refreshToken())}>send</button>
    </section>
  );
};

const privateRole = (Component) => {
  return (props) => {
    const { roles } = useSelector((state) => state.auth);

    return <Component {...props} roles={roles} />;
  };
};

export default privateRole(ListEmployees);
