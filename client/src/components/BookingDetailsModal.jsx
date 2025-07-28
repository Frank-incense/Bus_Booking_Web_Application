import React, { useState } from 'react';
import './BookingDetailsModal.css';

const BookingDetailsModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    identification: '',
    nationality: '',
    tripId: '',
    seatNumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newBooking = {
      ...formData,
      status: 'Booked',
      bookDate: new Date().toLocaleString(), 
    };

    onSave(newBooking);
    onClose();
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-container">
        <button className="booking-modal-close" onClick={onClose}>×</button>
        <h3 className="booking-modal-title">Add Booking</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            name="secondName"
            placeholder="Second Name"
            value={formData.secondName}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            name="identification"
            placeholder="ID or Passport No"
            value={formData.identification}
            onChange={handleChange}
            required
          />
          <input
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
          <input
            name="tripId"
            placeholder="Trip ID"
            value={formData.tripId}
            onChange={handleChange}
            required
          />
          <input
            name="seatNumber"
            placeholder="Seat Number"
            value={formData.seatNumber}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn-submit">Add Booking</button>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
