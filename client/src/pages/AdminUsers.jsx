import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const users = [
  {
    username: 'alice_smith',
    role: 'Admin',
    permissions: 'Full Access',
  },
  {
    username: 'robert_miller',
    role: 'Manager',
    permissions: 'Route Management',
  },
  {
    username: 'chris_taylor',
    role: 'Support',
    permissions: 'Booking Management',
  },
  {
    username: 'sophia_brown',
    role: 'Analyst',
    permissions: 'Reporting',
  },
  {
    username: 'daniel_white',
    role: 'Operator',
    permissions: 'Route Operations',
  },
];

const AdminUsers = () => {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Users</h2>
        <button className="btn btn-light">Add User</button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-4 d-flex gap-2">
        <button className="btn btn-outline-secondary btn-sm">Role</button>
        <button className="btn btn-outline-secondary btn-sm">Permissions</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.username}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.permissions}</td>
                <td>
                  <a href="#" className="text-decoration-none text-primary fw-medium">
                    Edit
                  </a>{' '}
                  |{' '}
                  <a href="#" className="text-decoration-none text-danger fw-medium">
                    Deactivate
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
