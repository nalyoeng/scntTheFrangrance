import React, { useState } from 'react'
import AdminHeader from '../components/AdminHeader';
import Login from '../components/Login';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const hasCurrentAdmin = localStorage.getItem("currentAdmin");
    const [isLoggedIn, setisLoggedIn] = useState(!hasCurrentAdmin);

  return (
    <div>
        <AdminHeader/>
        {isLoggedIn ? <Login/> : <Outlet/>}
    </div>
  )
}

export default AdminLayout