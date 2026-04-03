import React, { useState } from 'react';
// import { useAuth } from './AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // 1. Here you would call your backend API (fetch/axios)
//     // 2. Mocking a successful response:
//     const mockUser = { name: formData.name, email: formData.email, token: 'abc-123' };
    
//     login(mockUser);
//     alert("Welcome to SCNT. - The Fragrance!");
//   };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>
        <input 
          type="text" 
          placeholder="Full Name" 
          className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full rounded border p-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button className="w-full rounded bg-black py-3 font-semibold text-white transition hover:bg-gray-800">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp