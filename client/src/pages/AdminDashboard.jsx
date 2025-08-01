import { useContext, useEffect, useState } from 'react';
import './AdminDashboard.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import UserDetailsModal from "../components/UserDetailsModal";
import { AuthContext } from '../context/AuthContext';
import BookingChart from '../components/BookingChart';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboard = () => {
  const {user} = useContext(AuthContext)
  const [selectedUser, setSelectedUser] = useState(null); 
  const [users, setUsers] = useState([])
  const [pending, setPending] = useState([])
  const [summary, setSummary] = useState({})
  
  useEffect(()=>{
    fetch('/api/drivers')
    .then(r=>r.json())
    .then(users=>setUsers(users))

    

    if (user?.role === 'Admin'){
      fetch('/api/summary')
    .then(r=>r.json())
    .then(data=>setSummary(data))
    }
    else{
      fetch(`/api/summary/${user.id}`)
    .then(r=>r.json())
    .then(data=>setSummary(data))
    }
  
    fetch('/api/pending?page=1&limit=4')
    .then(r=>r.json())
    .then(users=>setPending(users.data))

  },[])
  function handleApprove(user){
    
    fetch(`/api/approved/${user.id}`, {
      method: 'PATCH',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        is_approved: true,
        is_active: true
      })
    })
    .then(r=>r.json())
    .then(user=>{
      setPending(
      pending.filter(u=>u.id !== user.id)
    )
      setSelectedUser(null)
  })
  }
  

  return (
    <div className="admin-dashboard">
      <main className="main-content">

        <section className="stats-section">
          {user?.role === 'Admin' && (
            <>
              <div className="stat-card">
                <i className="fas fa-bus-alt"></i>
                <span>Total Drivers</span>
                <span>{summary.drivers}</span>
              </div>
              <div className="stat-card">
                <i className="fas fa-users"></i>
                <span>Total Users</span>
                <span>{summary.users}</span>
              </div>
              <div className="stat-card">
                <i className="fas fa-ticket-alt"></i>
                <span>Total Bookings</span>
                <span>{summary.bookings}</span>
              </div>
              <div className="stat-card">
                <i className="fas fa-map-marked-alt"></i>
                <span>Total Routes</span>
                <span>{summary.routes}</span>
              </div>
            </>
          )}

          {user?.role === 'Driver' && (
            <>
              <div className="stat-card">
                <i className="fas fa-road"></i>
                <span>Total Trips</span>
                <span>{summary.trips?.length}</span>
              </div>
              <div className="stat-card">
                <i className="fas fa-dollar-sign"></i>
                <span>Total Revenue</span>
                <span>
                  {summary.revenue}
                </span>
              </div>
              <div className="stat-card">
                <i className="fas fa-ticket-alt"></i>
                <span>Total Bookings</span>
                <span>{summary.bookings}</span>
              </div>
              <div className="stat-card">
                <i className="fas fa-map-marked-alt"></i>
                <span>Total Routes</span>
                <span>{summary.routes}</span>
              </div>
            </>
          )}
        </section>

      
        <section className="dashboard-body">
          {user?.role === 'Admin' && 
          <div className="pending">
            <h3>Pending Applications</h3>
            {pending.map((user, i) => (
              <div className="pending-item" key={i}>
                <div className="user-info">
                  <div className="avatar-icon">👥</div>
                  <div>
                    <div className="name">{user.name}</div>
                    <div className="role">{user.role}</div>
                  </div>
                </div>
               <button className="add-btn" onClick={() => setSelectedUser(user)}>
                  Add User
                </button>
              </div>
            ))}
          </div>
      }
          <div className="booking-chart">
            <BookingChart/>
          </div>
        </section>

        <section className="driver-table-section">
          {user.role === 'Admin' ? (
            <>
              <h3 className="driver-header">Driver Details</h3>
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
                      <td>
                        <div className="table-user"><span>👥</span> {user.name}</div>
                      </td>
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
            </>
          ) : (
            <>
              <h3 className="driver-header">My Trips</h3>
              <table>
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.trips?.map((trip, i) => (
                    <tr key={i}>
                      <td>{trip.id}</td>
                      <td>{trip.route.destination}</td>
                      <td>{trip.departure}</td>
                      <td>{trip.bus.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>

        {selectedUser && (
          <UserDetailsModal
            handleApprove={handleApprove}
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
