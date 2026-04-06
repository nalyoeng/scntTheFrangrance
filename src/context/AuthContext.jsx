import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserStorage } from '../pages/user';

// 1. Create the Context (The "Cloud")
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
    
    // We sum up 'quantity_requested'. 
    // We use || 1 as a fallback just in case an item was added without a qty.
    const total = cart.reduce((sum, item) => {
      return sum + (item.quantity_requested || 1);
    }, 0);
    
    setCartCount(total);
  };

  // 2. Check localStorage when the app first starts
 useEffect(() => {
  // 1. Check if users are already in storage
  const localUsers = localStorage.getItem('users');
  const localAdmins = localStorage.getItem('admins');

  // 2. If storage is empty, "Seed" it with your JSON data
  if (!localUsers) {
    localStorage.setItem('users', JSON.stringify(UserStorage.users));
  }
  if (!localAdmins) {
    localStorage.setItem('admins', JSON.stringify(UserStorage.adminUsers));
  }

  // 3. Continue with your normal loading logic...
  const savedUser = localStorage.getItem('current_user');
  if (savedUser) setUser(JSON.parse(savedUser));
  
  refreshCartCount();
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
    <AuthContext.Provider value={{ user, login, logout, loading, cartCount, refreshCartCount }}>
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