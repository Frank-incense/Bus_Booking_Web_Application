import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/routes" className={({ isActive }) => isActive ? 'active' : ''}>
            Routes
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/buses" className={({ isActive }) => isActive ? 'active' : ''}>
            Buses
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/reports" className={({ isActive }) => isActive ? 'active' : ''}>
            Reports
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
