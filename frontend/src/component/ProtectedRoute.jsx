import React from 'react';
import { useContext } from 'react';
import UserContext from './UserContext'; // Correct import for UserContext

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <p>Loading...</p>;

  if (!user || !user.isAdmin) {
    return <p>Access Denied. Admins only.</p>;
  }

  return children;
};

export default ProtectedRoute;