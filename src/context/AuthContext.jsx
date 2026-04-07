import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserStorage } from '../pages/user';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // sum up 'quantity_requested'. 
    // use || 1 as a fallback just in case an item was added without a qty.
    const total = cart.reduce((sum, item) => {
      return sum + (item.quantity_requested || 1);
    }, 0);
    
    setCartCount(total);
  };

  // Check localStorage when the app first starts
 useEffect(() => {
  // Check if users are already in storage
  const localUsers = localStorage.getItem('users');
  const localAdmins = localStorage.getItem('admins');

  // If storage is empty, "Seed" it with your JSON data
  if (!localUsers) {
    localStorage.setItem('users', JSON.stringify(UserStorage.users));
  }
  if (!localAdmins) {
    localStorage.setItem('admins', JSON.stringify(UserStorage.adminUsers));
  }

  const savedUser = localStorage.getItem('current_user');
  if (savedUser) setUser(JSON.parse(savedUser));
  
  refreshCartCount();
  setLoading(false);
}, []);

  // Function to log in
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
  };

  // Function to log out
  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, cartCount, refreshCartCount }}>
      {/* don't render the app until finished checking localStorage */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use this context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};