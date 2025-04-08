
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { JSX } from 'react';

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuthContext();

  return user ? children : <Navigate to="/login" replace />;
};
