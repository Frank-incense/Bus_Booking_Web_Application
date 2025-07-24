import React from 'react';
import './UserDetailsModal.css';

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>×</button>

        <h3 className="modal-title">User Details</h3>

        <div className="modal-top-section">
          <div className="modal-left">
            <img src={user.profilePic} alt="Profile" className="profile-image" />
          </div>
          <div className="modal-right">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        </div>

        <div className="license-section">
          <p><strong>License</strong></p>
          <img src={user.license} alt="License" className="license-image" />
        </div>

        <div className="modal-footer">
          <button className="modal-approve">Approve</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
