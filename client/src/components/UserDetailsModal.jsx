import React from 'react';
import './UserDetailsModal.css';

const UserDetailsModal = ({ handleApprove, user, onClose }) => {
  if (!user) return null;
  

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>×</button>

        <h3 className="modal-title">User Details</h3>

        <div className="modal-top-section">
          <div className="modal-left">
            <img src={user.image_url} alt="Profile" className="profile-image" />
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
          {user.license ? 
          <iframe
            src={`https://docs.google.com/gview?url=${encodeURIComponent(user.license)}&embedded=true`}
            width="100%"
            height="400px"
            title="License Preview"
          />

        :null}
        </div>

        <div className="modal-footer">
          <button className="modal-approve" onClick={() => handleApprove(user)}>Approve</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
