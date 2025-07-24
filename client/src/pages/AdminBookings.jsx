import React from 'react';
import './AdminBookings.css';

const AdminBookings = () => {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Bookings</h2>
        <button className="btn btn-light">Add Booking</button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search bookings"
        />
      </div>

      <div className="mb-4 d-flex gap-2">

        <button className="btn btn-outline-secondary btn-sm">Date</button>
        <button className="btn btn-outline-secondary btn-sm">Customer</button>
        <button className="btn btn-outline-secondary btn-sm">Bus</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Bus</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Status</th>
              <th>Book Date</th>
              <th>Actions</th>
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
                  <a href="#" className="text-decoration-none text-primary fw-medium">
                    Edit
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

export default AdminBookings;
