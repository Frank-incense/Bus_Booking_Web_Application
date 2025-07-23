// src/components/AdminLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css'; // optional
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
  <>
  <Navbar />
  <div className="admin-layout">
    <Sidebar />
    <main className="admin-content">
      <Outlet />
    </main>
  </div>
  </>
  );
};

export default AdminLayout;
