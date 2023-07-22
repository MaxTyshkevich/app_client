import { useDispatch, useSelector } from 'react-redux';
import { useGetEmployeesQuery } from '../store/employeeApiSlice';
import { refreshToken } from '../store/AuthSlice';
import Employ from './Employ';

const ListEmployees = () => {
  const dispatch = useDispatch();
  const { data: employees } = useGetEmployeesQuery();

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
      <button onClick={() => console.log('send')}>send</button>
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
