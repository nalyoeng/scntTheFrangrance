import React, { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the Context (The "Cloud")
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const refreshCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(total);
  };

  // 2. Check localStorage when the app first starts
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('current_user');
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("AuthContext Error:", error);
    } finally {
      // This will now run even if the code above fails!
      refreshCartCount();
      setLoading(false); 
    }
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