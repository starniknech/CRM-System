import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RequireAuthProps {
  children: React.ReactElement;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation();

  const loggedIn = window.localStorage.getItem('isLoggedIn');


  if (!loggedIn) {
    return <Navigate to={'/login'} state={{ from: location }} />
  }

  return children;

}
export default RequireAuth;