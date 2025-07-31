// src/components/AdminLayout.jsx
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import './AdminLayout.css'; 
import Navbar from './Navbar';
4
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
