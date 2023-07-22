import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRoles = [] }) => {
  const { roles } = useSelector((state) => state.auth);
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
