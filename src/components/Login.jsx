import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import './Login.css';
import { UserStorage } from '../pages/user'; 
import './Login.css'
import google from '../assets/google.png'
import fb from '../assets/fb.png'

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); 
  const { login } = useAuth();    

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "Sign Up") {
      // 1. PUBLIC REGISTRATION (Users only)
      const newUser = { id: Date.now(), name, email, pwd: password, role: 'user' };
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
      alert("User account created! Please Sign In.");
      setAction("Login"); 

    } else {
      // 2. LOGIN LOGIC (Check Admins first, then Users)
      
      // Get Admins from your JSON list (the one you mentioned)
      const adminList = JSON.parse(localStorage.getItem("admins")) || UserStorage.adminUsers;
      // Get Registered Users from LocalStorage
      const userList = JSON.parse(localStorage.getItem("users") || "[]");

      // Search for Admin match
      const adminFound = adminList.find(a => a.email === email && a.pwd === password);
      // Search for User match
      const userFound = userList.find(u => u.email === email && u.pwd === password);

      if (adminFound) {
        login({ ...adminFound, role: 'admin' }); // Tag as Admin
        alert("Welcome, Admin");
        navigate("/admin"); 
      } else if (userFound) {
        login({ ...userFound, role: 'user' }); // Tag as User
        alert("Welcome back to SCNT. Fragrance!");
        navigate("/"); // Send regular users to the home/shop page
      } else {
        alert("Invalid credentials. If you are a new customer, please Sign Up.");
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <form onSubmit={handleSubmit} className='inputs'>
        {action === "Login" ? null : (
          <div className='input'>
            <label>Username</label>
            <input 
              type="text" 
              placeholder='username' 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
        )}

        <div className='input'>
          <label>Email</label>
          <input 
            type="email" 
            placeholder='email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div className='input'>
          <label>Password</label>
          <input 
            type="password" 
            placeholder='password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {action === "Sign Up" ? "Create Account" : "Sign In"}
        </button>
      </form>

      <div className='submit-container'>
        <div 
          className={action === "Login" ? "submit gray" : "submit"} 
          onClick={() => { setAction("Sign Up"); setName(""); }}
        >
          Switch to Sign Up
        </div>
        <div 
          className={action === "Sign Up" ? "submit gray" : "submit"} 
          onClick={() => { setAction("Login"); setName(""); }}
        >
          Switch to Login
        </div>
        <div>
          <div>login with</div>
          <div>
            <img src={fb} alt="Facebook" />
            <img src={google} alt="Google" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;