import { useEffect, useState } from "react";
import "./AdminBookings.css";
import BookingDetailsModal from "../components/BookingDetailsModal";
import CustomerDetailsModal from "../components/CustomerDetailsModal";
import { updateBooking } from "../api/bookings";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSaveBooking = async (booking) => {
    if (editingBooking) {
      try {
        const updatedBooking = await updateBooking({ ...booking, id: editingBooking.id });
        const updatedList = bookings.map((b) =>
          b.id === updatedBooking.id ? { ...b, ...updatedBooking } : b
        );
        setBookings(updatedList);
      } catch (error) {
        console.error('Error updating booking:', error);
      }
    } else {
      setBookings([...bookings, booking]);
    }

    setIsModalOpen(false);
    setEditingBooking(null);
  };

  const handleAddClick = () => {
    setEditingBooking(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // TODO: Replace with your API endpoint
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        // setBookings(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAddBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Bookings</h2>
        <button className="btn btn-light" onClick={handleAddClick}>
          Add Booking
        </button>
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
                  <span className="btn btn-sm btn-outline-primary disabled">
                    Edit
                  </span>
                </td>
              </tr>
            ))}

            {bookings.map((b, index) => (
              <tr key={`dynamic-${index}`}>
                <td>
                  {b.firstName} {b.secondName}
                </td>
                <td>{b.tripId}</td>
                <td>{b.time || "N/A"}</td>
                <td>{b.time || "N/A"}</td>
                <td className="text-primary">{b.status}</td>
                <td>{b.bookDate}</td>
                <td className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleEditClick(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => handleViewCustomer(b)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <BookingDetailsModal
          onSave={handleSaveBooking}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBooking(null);
          }}
          initialData={editingBooking}
        />
      )}

      {showCustomerModal && selectedCustomer && (
        <CustomerDetailsModal
          customer={selectedCustomer}
          onClose={() => setShowCustomerModal(false)}
        />
      )}
    </div>
  );
};

export default AdminBookings;
