import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListEmployees from '../components/ListEmployees';
import { useLogoutMutation } from '../store/authApiSlice';

const Home = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const { name } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await logout();
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
