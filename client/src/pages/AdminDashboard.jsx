import React, { useState } from 'react';
import './AdminDashboard.css';
import Navbar from "../components/Navbar";
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
        backgroundColor: '#b0c4f2',
        borderRadius: 0,
        barThickness: 20,
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
    plugins: { legend: { display: false } },
    layout: { padding: 10 },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#555', font: { size: 11 } },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
        ticks: { stepSize: 5, color: '#555', font: { size: 11 } },
      },
    },
  };

  const dummyUser = {
    name: 'Frankincense Okwemba',
    role: 'Driver',
    email: 'frankincense.okwemba@example.com',
    phone: '+254712345678',
  };

  const users = [dummyUser, dummyUser, dummyUser];

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <img src="/logo.png" alt="Logo" className="sidebar-logo" />
        <ul>
          <li className="active"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></li>
          <li><i className="fas fa-ticket-alt"></i><span>Bookings</span></li>
          <li><i className="fas fa-map-marked-alt"></i><span>Routes</span></li>
          <li><i className="fas fa-bus-alt"></i><span>Buses</span></li>
          <li><i className="fas fa-users"></i><span>Users</span></li>
          <li><i className="fas fa-file-alt"></i><span>Reports</span></li>
        </ul>
      </aside>

      <main className="main-content">
        <header className="top-nav">
          <nav>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Services ▾</li>
            </ul>
          </nav>
          <div className="avatar">👩🏽</div>
        </header>

        <section className="stats-section">
          <div className="stat-card">
            <i className="fas fa-bus-alt"></i>
            <span>Total Drivers</span>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <span>Total Users</span>
          </div>
          <div className="stat-card">
            <i className="fas fa-ticket-alt"></i>
            <span>Total Bookings</span>
          </div>
          <div className="stat-card">
            <i className="fas fa-map-marked-alt"></i>
            <span>Total Routes</span>
          </div>
        </section>

        <section className="dashboard-body">
          <div className="pending">
            <h3>Pending Applications</h3>
            {users.map((user, i) => (
              <div className="pending-item" key={i}>
                <div className="user-info">
                  <div className="avatar-icon">👥</div>
                  <div>
                    <div className="name">{user.name}</div>
                    <div className="role">{user.role}</div>
                  </div>
                </div>
                <button className="add-btn">Add User</button>
              </div>
            ))}
          </div>

          <div className="booking-chart">
            <h3>Booking Statistics {selectedMonth && `(Selected: ${selectedMonth})`}</h3>
            <Bar data={bookingData} options={chartOptions} />
          </div>
        </section>

        <section className="driver-table-section">
          <h3 className="driver-header">Driver details</h3>
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
              {users.map((user, i) => (
                <tr key={i}>
                  <td><div className="table-user"><span>👥</span> {user.name}</div></td>
                  <td><b>{user.role}</b></td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span className="edit">Edit</span> | <span className="deactivate">Deactivate</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
