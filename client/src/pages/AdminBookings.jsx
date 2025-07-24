import React from 'react';
import './AdminBookings.css'; // Custom styles

const AdminBookings = () => {
  return (
    <div className="container mt-5 admin-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Bookings</h2>
        <button className="btn btn-outline-secondary">Add Booking</button>
      </div>

      <div className="search-bar mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search Bookings"
        />
      </div>

      <div className="d-flex gap-2 flex-wrap mb-4">
        <button className="btn btn-light border">Route ▼</button>
        <button className="btn btn-light border">Time ▼</button>
        <button className="btn btn-light border">Customer ▼</button>
        <button className="btn btn-light border">Bus ▼</button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle table-bookings">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Bus</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
              <th>Book Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td>Frankincense Wesley</td>
                <td>1</td>
                <td>11/07/2025 19:00</td>
                <td>11/07/2025 19:00</td>
                <td className="text-primary">Booked</td>
                <td>11/07/2025 19:00</td>
                <td>
                  <a href="#" className="text-decoration-none">Edit</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBookings;
