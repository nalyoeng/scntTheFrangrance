import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context (The "Cloud")
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Check localStorage when the app first starts
  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
    setLoading(false);
  }, []);

  // 3. Function to log in
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
  };

  // 4. Function to log out
  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {/* We don't render the app until we've finished checking localStorage */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 5. Create a custom hook to use this context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};