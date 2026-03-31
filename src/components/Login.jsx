import React, { useState } from 'react'
import './Login.css'

const Login = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div>
      <div className='header1'>
        <h1>SENT.</h1>
      </div>
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        {action === "Login" ? null : (
          <div className='input'>
            <label>username</label>
            <input type="text" placeholder='username' />
          </div>
        )}

        <div className='input'>
            <label>email</label>
          <input type="email" placeholder='email' />
        </div>

        <div className='input'>
            <label>password</label>
          <input type="password" placeholder='password' />
        </div>
      </div>

      {action === "Sign Up" ? null : (
        <div className='forgot-password'>
          forgot password <span>Click Here!</span>
        </div>
      )}

      <div className='submit-container'>
        <div 
          className={action === "Login" ? "submit gray" : "submit"} 
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>

        <div 
          className={action === "Sign Up" ? "submit gray" : "submit"} 
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login