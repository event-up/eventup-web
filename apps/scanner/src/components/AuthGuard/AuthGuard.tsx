import React from 'react';
import { redirect } from 'react-router-dom';

interface AuthGuardProps {
  component: React.ComponentType;
  isAuthenticated: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  component: Component,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    redirect('/login');
  }

  return <Component />;
};
