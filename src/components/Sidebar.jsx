@@ .. @@
 import React from 'react';
 import { NavLink } from 'react-router-dom';
 import './Sidebar.css'; 

 const Sidebar = () => {
   return (
     <aside className="sidebar">
+      <div className="sidebar-header">
+        <NavLink to="/" className="sidebar-logo">
+          <img src="/logo.png" alt="JourneyHub Logo" />
+          <span className="sidebar-logo-text">JourneyHub</span>
+        </NavLink>
+      </div>
+      
+      <nav className="sidebar-nav">
       <ul>
         <li>
           <NavLink to="/admin" end className={({ isActive }) => isActive ? 'active' : ''}>
+            <div className="nav-icon dashboard"></div>
+            <span className="nav-text">Dashboard</span>
-            Dashboard
           </NavLink>
         </li>
         <li>
           <NavLink to="/admin/bookings" className={({ isActive }) => isActive ? 'active' : ''}>
+            <div className="nav-icon bookings"></div>
+            <span className="nav-text">Bookings</span>
-            Bookings
           </NavLink>
         </li>
         <li>
           <NavLink to="/admin/routes" className={({ isActive }) => isActive ? 'active' : ''}>
+            <div className="nav-icon routes"></div>
+            <span className="nav-text">Routes</span>
-            Routes
           </NavLink>
         </li>
         <li>
           <NavLink to="/admin/buses" className={({ isActive }) => isActive ? 'active' : ''}>
+            <div className="nav-icon buses"></div>
+            <span className="nav-text">Buses</span>
-            Buses
           </NavLink>
         </li>
         <li>
           <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>
+            <div className="nav-icon users"></div>
+            <span className="nav-text">Users</span>
-            Users
           </NavLink>
         </li>
         <li>
           <NavLink to="/admin/reports" className={({ isActive }) => isActive ? 'active' : ''}>
+            <div className="nav-icon reports"></div>
+            <span className="nav-text">Reports</span>
-            Reports
           </NavLink>
         </li>
       </ul>
+      </nav>
     </aside>
   );
 };

 export default Sidebar;