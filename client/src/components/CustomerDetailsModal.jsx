import React from 'react';
import './CustomerDetailsModal.css';

const CustomerDetailsModal = ({ customer, onClose }) => {
  console.log(customer)
  return (
    <div className="customer-modal-overlay">
      <div className="customer-modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4>Customer Details</h4>
        <div className="info-group">
          <strong>Name:</strong> {customer.customer.first_name} {customer.customer.second_name}
        </div>
        <div className="info-group"><strong>Email:</strong> {customer.customer.email}</div>
        <div className="info-group"><strong>Phone:</strong> {customer.customer.phone}</div>
        <div className="info-group"><strong>ID/Passport:</strong> {customer.customer.identification}</div>
        <div className="info-group"><strong>Nationality:</strong> {customer.customer.nationality}</div>
        <div className="info-group"><strong>Seat Number:</strong> {customer.seatc}</div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
