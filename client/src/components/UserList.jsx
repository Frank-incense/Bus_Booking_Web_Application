import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then(res => {
      setUsers(res.data);
    });
  }, []);

  const deactivateUser = (id) => {
    axios.patch(`/api/users/${id}/deactivate`).then(() => {
      setUsers(prev =>
        prev.map(user => user.id === id ? { ...user, active: false } : user)
      );
    });
  };

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => user.active && (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.permissions}</td>
              <td>
                <button onClick={() => {/* Edit logic here */}}>Edit</button>
                <button onClick={() => deactivateUser(user.id)}>Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;