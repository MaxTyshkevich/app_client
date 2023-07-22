import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useRefreshMutation } from '../store/authApiSlice';

const getTrastLocalStorage = () => JSON.parse(localStorage.getItem('trust'));

const RefreshAuth = () => {
  const [refresh] = useRefreshMutation();
  const { accessToken } = useSelector((state) => state.auth);
  const [firstLoadingComplite, setFirstLoadingComplite] = useState(false);
  const persist = getTrastLocalStorage();

  useEffect(() => {
    let isMounted = true;

    const getRefresh = () =>
      refresh().finally(() => {
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
