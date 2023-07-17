import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { refreshToken } from '../store/AuthSlice';

const getTrastLocalStorage = () => JSON.parse(localStorage.getItem('trust'));

const RefreshAuth = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [firstLoadingComplite, setFirstLoadingComplite] = useState(false);
  const dispatch = useDispatch();
  const persist = getTrastLocalStorage();
  useEffect(() => {
    let isMounted = true;

    const getRefresh = () =>
      dispatch(refreshToken()).finally(() => {
        isMounted && setFirstLoadingComplite(true);
      });

    !accessToken && persist ? getRefresh() : setFirstLoadingComplite(true);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : firstLoadingComplite ? (
        <Outlet />
      ) : (
        <p>loading</p>
      )}
    </>
  );
};

export default RefreshAuth;
