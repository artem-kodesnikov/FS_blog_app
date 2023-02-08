import React, { ReactElement } from 'react';
import { Navigate } from 'react-router';

interface Props {
  redirectPath?: string
  children: ReactElement
}

export const LoggedInRoute: React.FC<Props> = ({
  redirectPath = '/',
  children
}) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};