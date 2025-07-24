@@ .. @@
 import React, { useState } from 'react';
 import './AdminDashboard.css';
-import Navbar from "../components/Navbar";
-import Sidebar from "../components/Sidebar";
 import { Bar } from 'react-chartjs-2';
 import {
   Chart as ChartJS,
   BarElement,
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
 } from 'chart.js';

 ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

 const AdminDashboard = () => {
   const [selectedMonth, setSelectedMonth] = useState(null);

   const bookingData = {
     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
     datasets: [
       {
         label: 'Bookings',
         data: [8, 15, 25, 35, 30, 25, 30, 22],
-        backgroundColor: '#b0c4f2',
-        borderRadius: 0,
-        barThickness: 20,
+        backgroundColor: 'rgba(102, 126, 234, 0.8)',
+        borderRadius: 8,
+        barThickness: 24,
+        borderColor: 'rgba(102, 126, 234, 1)',
+        borderWidth: 1,
       },
     ],
   };

   const chartOptions = {
     onClick: (_, elements) => {
       if (elements.length > 0) {
         const index = elements[0].index;
         setSelectedMonth(bookingData.labels[index]);
       }
     },
-    plugins: { legend: { display: false } },
-    layout: { padding: 10 },
+    responsive: true,
+    maintainAspectRatio: false,
+    plugins: { 
+      legend: { display: false },
+      tooltip: {
+        backgroundColor: 'rgba(0, 0, 0, 0.8)',
+        titleColor: 'white',
+        bodyColor: 'white',
+        borderColor: 'rgba(102, 126, 234, 1)',
+        borderWidth: 1,
+      }
+    },
+    layout: { padding: 16 },
     scales: {
       x: {
-        grid: { display: false, drawBorder: false },
-        ticks: { color: '#555', font: { size: 11 } },
+        grid: { display: false },
+        ticks: { 
+          color: '#64748b', 
+          font: { size: 12, weight: '500' } 
+        },
       },
       y: {
         beginAtZero: true,
-        grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
-        ticks: { stepSize: 5, color: '#555', font: { size: 11 } },
+        grid: { 
+          color: 'rgba(0,0,0,0.05)', 
+          drawBorder: false 
+        },
+        ticks: { 
+          stepSize: 5, 
+          color: '#64748b', 
+          font: { size: 12, weight: '500' } 
+        },
       },
     },
   };

-  const dummyUser = {
-    name: 'Frankincense Okwemba',
-    role: 'Driver',
-    email: 'frankincense.okwemba@example.com',
-    phone: '+254712345678',
+  const pendingUsers = [
+    {
+      id: 1,
+      name: 'Frankincense Okwemba',
+      role: 'Driver',
+      email: 'frankincense.okwemba@example.com',
+      phone: '+254712345678',
+    },
+    {
+      id: 2,
+      name: 'Margaret Wanjiku',
+      role: 'Driver',
+      email: 'margaret.wanjiku@example.com',
+      phone: '+254723456789',
+    },
+    {
+      id: 3,
+      name: 'Ibrahim Abdullahi',
+      role: 'Driver',
+      email: 'ibrahim.abdullahi@example.com',
+      phone: '+254734567890',
+    },
+  ];
+
+  const drivers = [
+    {
+      id: 1,
+      name: 'Frankincense Okwemba',
+      role: 'Driver',
+      email: 'frankincense.okwemba@example.com',
+      phone: '+254712345678',
+    },
+    {
+      id: 2,
+      name: 'Jeff Wafula',
+      role: 'Driver',
+      email: 'jeff.wafula@example.com',
+      phone: '+254798765432',
+    },
+    {
+      id: 3,
+      name: 'Alex Dunstan',
+      role: 'Driver',
+      email: 'alex.dunstan@example.com',
+      phone: '+254787654321',
+    },
   ];

-  const users = [dummyUser, dummyUser, dummyUser];
+  const stats = [
+    { title: 'Total Drivers', value: '24', icon: '🚌' },
+    { title: 'Total Users', value: '1,247', icon: '👥' },
+    { title: 'Total Bookings', value: '3,891', icon: '🎫' },
+    { title: 'Total Routes', value: '18', icon: '🗺️' },
+  ];

   return (
     <div className="admin-dashboard">
-      <main className="main-content">
+      <div className="dashboard-header">
+        <h1>Dashboard Overview</h1>
+        <p className="dashboard-subtitle">Welcome back! Here's what's happening with your bus booking platform.</p>
+      </div>

-        <section className="stats-section">
-          <div className="stat-card">
-            <i className="fas fa-bus-alt"></i>
-            <span>Total Drivers</span>
-          </div>
-          <div className="stat-card">
-            <i className="fas fa-users"></i>
-            <span>Total Users</span>
-          </div>
-          <div className="stat-card">
-            <i className="fas fa-ticket-alt"></i>
-            <span>Total Bookings</span>
-          </div>
-          <div className="stat-card">
-            <i className="fas fa-map-marked-alt"></i>
-            <span>Total Routes</span>
-          </div>
-        </section>
+      <section className="stats-section">
+        {stats.map((stat, index) => (
+          <div key={index} className="stat-card">
+            <div className="stat-icon">{stat.icon}</div>
+            <div className="stat-content">
+              <h3>{stat.value}</h3>
+              <p>{stat.title}</p>
+            </div>
+          </div>
+        ))}
+      </section>

-        <section className="dashboard-body">
-          <div className="pending">
+      <section className="dashboard-body">
+        <div className="pending-section">
             <h3>Pending Applications</h3>
-            {users.map((user, i) => (
+            {pendingUsers.map((user) => (
-              <div className="pending-item" key={i}>
+              <div className="pending-item" key={user.id}>
                 <div className="user-info">
-                  <div className="avatar-icon">👥</div>
-                  <div>
-                    <div className="name">{user.name}</div>
-                    <div className="role">{user.role}</div>
+                  <div className="avatar-icon">
+                    {user.name.split(' ').map(n => n[0]).join('')}
+                  </div>
+                  <div className="user-details">
+                    <h4>{user.name}</h4>
+                    <div className="role">{user.role}</div>
                   </div>
                 </div>
                 <button className="add-btn">Add User</button>
               </div>
             ))}
           </div>

           <div className="booking-chart">
             <h3>Booking Statistics {selectedMonth && `(Selected: ${selectedMonth})`}</h3>
-            <Bar data={bookingData} options={chartOptions} />
+            <div className="chart-container">
+              <Bar data={bookingData} options={chartOptions} />
+            </div>
           </div>
-        </section>
+      </section>

-        <section className="driver-table-section">
+      <section className="driver-table-section">
           <h3 className="driver-header">Driver details</h3>
+          <div className="table-container">
           <table>
             <thead>
               <tr>
                 <th>User</th>
                 <th>Role</th>
                 <th>Email</th>
                 <th>Phone</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
-              {users.map((user, i) => (
-                <tr key={i}>
-                  <td><div className="table-user"><span>👥</span> {user.name}</div></td>
-                  <td><b>{user.role}</b></td>
+              {drivers.map((user) => (
+                <tr key={user.id}>
+                  <td>
+                    <div className="table-user">
+                      <div className="table-avatar">
+                        {user.name.split(' ').map(n => n[0]).join('')}
+                      </div>
+                      <span className="table-user-name">{user.name}</span>
+                    </div>
+                  </td>
+                  <td><span className="role-badge">{user.role}</span></td>
                   <td>{user.email}</td>
                   <td>{user.phone}</td>
                   <td>
-                    <span className="edit">Edit</span> | <span className="deactivate">Deactivate</span>
+                    <div className="action-buttons">
+                      <span className="edit">Edit</span>
+                      <span className="deactivate">Deactivate</span>
+                    </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
-        </section>
-      </main>
+          </div>
+      </section>
     </div>
   );
 };

 export default AdminDashboard;