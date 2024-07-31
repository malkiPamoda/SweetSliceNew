import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('x-auth-token');

        // If there's no token, you might want to handle it differently, e.g., redirect to login
        if (!token) {
          console.error('No token found');
          setIsLoading(false);
          return;
        }

        // Make the request with the token in the Authorization header
        const response = await axios.get('http://localhost:3000/api/users/me', {
          headers: {
            'x-auth-token': token
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

export default UserContext;