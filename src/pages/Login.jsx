import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchToken, clearErrorMessage } from '../store/AuthSlice';

const saveTrastLocalStorage = (value) => localStorage.setItem('trust', value);

const Login = () => {
  const { messageError, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const refInput = useRef();
  const refMessage = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  console.log('from Private route', location.state);

  /*  const [succes, setSucces] = useState(false); */

  const [userName, setUserName] = useState('maxmax');
  const [password, setPassword] = useState('!Qwerty123');
  const [trust, setTrust] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      user: userName,
      pwd: password,
    };

    setUserName('');
    setPassword('');

    await dispatch(fetchToken(data)).unwrap();
    saveTrastLocalStorage(trust);
    console.log('aaaaaa');
    navigate(location?.state?.from || '/', { replace: true });
  };

  useEffect(() => {
    if (!isLoading) {
      refInput.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(clearErrorMessage());
  }, [userName, password]);

  return (
    <section>
      <p
        ref={refMessage}
        className={messageError ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {messageError}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          autoComplete="off"
          ref={refInput}
          type="text"
          id="username"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
          required
        />
        <label htmlFor="password">Password: </label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button>Sign In</button>
        <div>
          <input
            type="checkbox"
            id="trast"
            onChange={() => setTrust(!trust)}
            checked={trust}
          />
          <label htmlFor="trast">Trast device</label>
        </div>

        <p>
          Need an Account? <br />
          <span className="line">
            <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
