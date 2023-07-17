import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { refreshToken } from '../store/AuthSlice';

const RequireAuth = ({ allowedRoles = [] }) => {
  const { roles } = useSelector((state) => state.auth);
  /*   const [isAvailable, setIsAvailable] = useState(false); */
  const location = useLocation();

  let isAvailable = roles.find((role) => allowedRoles.includes(role));

  if (isAvailable) {
    return <Outlet />;
  }
  if (roles.length) {
    return <Navigate to="unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="login" state={{ from: location }} replace />;
};

export default RequireAuth;
