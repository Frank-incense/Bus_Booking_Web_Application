import React, { useState, useEffect } from 'react';
import './BookingDetailsModal.css';
import { countries } from 'countries-list';

const nationality = []
console.log(countries)
for (let country in countries){
  nationality.push(countries[country].name)
}
console.log(nationality)
const BookingDetailsModal = ({ onSave, onClose, initialData }) => {
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBooking = {
      ...formData,
      status: 'Booked'
      // bookDate: formData.bookDate || new Date().toLocaleString(),
    };

    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedBooking)
    })
    .then(r=>r.json())
    .then(data=>{
        onSave(data);
        onClose();
    })
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal-container">
        <button className="booking-modal-close" onClick={onClose}>×</button>
        <h3 className="booking-modal-title">{initialData ? 'Edit Booking' : 'Add Booking'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input name="secondName" placeholder="Second Name" value={formData.secondName} onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <input name="identification" placeholder="ID or Passport No" value={formData.identification} onChange={handleChange} required />
          
          <select
            name='nationality'
            className="form-select"
            value={formData.nationality}
            onChange={handleChange}
            required
          >
            <option value="">Select nationality</option>
            {nationality.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
      
          {/* <input name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required /> */}
          <input name="tripId" placeholder="Trip ID" value={formData.tripId} onChange={handleChange} required />
          <input name="seatNumber" placeholder="Seat Number" value={formData.seatNumber} onChange={handleChange} required />
          <button type="submit" className="btn-submit">{initialData ? 'Save Changes' : 'Add Booking'}</button>
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
