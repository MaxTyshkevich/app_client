import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../store/authApiSlice';

const saveTrastLocalStorage = (value) => localStorage.setItem('trust', value);

const Login = () => {
  const [login, { isLoading, isError, error, reset }] = useLoginMutation();

  const refInput = useRef();
  const refMessage = useRef();
  const location = useLocation();
  const navigate = useNavigate();

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

    const result = await login(data);
    if (result.data) {
      saveTrastLocalStorage(trust);
      navigate(location?.state?.from || '/', { replace: true });
    }
  };

  useEffect(() => {
    if (!isLoading) {
      refInput.current.focus();
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      reset();
    }
  }, [userName, password, isError, reset]);

  return (
    <section>
      <p
        ref={refMessage}
        className={isError ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {isError && error}
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
