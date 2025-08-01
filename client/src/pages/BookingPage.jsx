import React, { useEffect, useState } from 'react';
import { fetchBookings, updateBooking, deleteBooking } from '../api/bookings';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [seat, setSeat] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await fetchBookings();
      setBookings(data.data || []);
    } catch (error) {
      alert('Failed to load bookings');
    }
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setSeat(booking.seat);
    setStatus(booking.status);
  };

  const handleCancelEdit = () => {
    setEditingBooking(null);
    setSeat('');
    setStatus('');
  };

  const handleSaveEdit = async () => {
    try {
      await updateBooking(editingBooking.id, { seat, status });
      alert('Booking updated successfully');
      setEditingBooking(null);
      loadBookings();
    } catch (error) {
      alert('Failed to update booking');
    }
  };

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteBooking(bookingId);
      alert('Booking deleted successfully');
      loadBookings();
    } catch (error) {
      alert('Failed to delete booking');
    }
  };

  return (
    <div className="container py-4">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Seat</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.trip_id}</td>
                <td>{booking.seat}</td>
                <td>{booking.status}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditClick(booking)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(booking.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingBooking && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Booking</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCancelEdit}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Seat</label>
                  <input
                    type="number"
                    className="form-control"
                    value={seat}
                    onChange={(e) => setSeat(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Booked">Booked</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveEdit}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookingPage;