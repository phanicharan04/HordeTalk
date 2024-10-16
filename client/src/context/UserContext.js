import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Context = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState();
  const path = useLocation();

  const validate = async () => {
    try {
      const userURL = process.env.REACT_APP_backendUserURL;
      const token = localStorage.getItem("token");
    

      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const { data } = await axios.get(`${userURL}/viewprofile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setUser(data?.userProfile);
    } catch (error) {
      console.error('Error validating token or fetching profile:', error.message);
    }
  };

  useEffect(() => {
    validate();
  }, [path]);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export function useAuth() {
  return useContext(Context);
}

export default UserContext;
