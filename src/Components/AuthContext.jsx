import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Retrieve data from local storage on component mount
      const storedData = localStorage.getItem('storedData');
      console.log(JSON.parse(storedData))
      if (storedData) {
        setUser(JSON.parse(storedData));
      }
    }, []);
  
    const login = (userData) => {
      // Implement your login logic here, e.g., call an API to authenticate the user.
      // If authentication is successful, set the user data.
      setUser(userData);
      localStorage.setItem('storedData', JSON.stringify(userData));
    };
  
    const logout = () => {
      // Implement your logout logic here, e.g., clear user data.
      console.log("logout clicked")
      localStorage.clear();
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }

export function useAuth() {
    return useContext(AuthContext);
}