// src/components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

type PrivateRouteProps = {
  children: React.ReactNode;
  admin?: boolean;
};

export default function PrivateRoute({ children, admin }: PrivateRouteProps) {
  const token = api.getToken();
  const { user } = useAuth();

  if (!token || !user) {
    api.logout();
    return <Navigate to="/login" replace />;
  }

  if (admin && user?.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
