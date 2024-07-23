import React from 'react';
import { useAppContext } from '../../context/AppContextProvider';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const { user } = useAppContext();
  return <>{user ? <Outlet /> : <Navigate to='/' />}</>;
};

export default ProtectedLayout;
