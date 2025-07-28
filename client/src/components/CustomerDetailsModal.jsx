import React from 'react';
import './CustomerDetailsModal.css';

const CustomerDetailsModal = ({ customer, onClose }) => {
  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4>Customer Details</h4>
        <div className="info-group">
          <strong>Name:</strong> {customer.firstName} {customer.secondName}
        </div>
        <div className="info-group"><strong>Email:</strong> {customer.email}</div>
        <div className="info-group"><strong>Phone:</strong> {customer.phone}</div>
        <div className="info-group"><strong>ID/Passport:</strong> {customer.identification}</div>
        <div className="info-group"><strong>Nationality:</strong> {customer.nationality}</div>
        <div className="info-group"><strong>Seat Number:</strong> {customer.seatNumber}</div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
