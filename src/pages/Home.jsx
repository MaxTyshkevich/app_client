import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/AuthSlice';
import ListEmployees from '../components/ListEmployees';

const Home = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/linkpage');
  };

  return (
    <section>
      <h1>Home </h1>
      <br />
      <h3>current profile: "{name?.toUpperCase()}"</h3>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={handleLogout}>Sign Out</button>
      </div>
      <ListEmployees />
    </section>
  );
};

export default Home;
