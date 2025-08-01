import { useContext, useEffect, useState } from "react";
import "./AdminBookings.css";
import BookingDetailsModal from "../components/BookingDetailsModal";
import CustomerDetailsModal from "../components/CustomerDetailsModal";
import { AuthContext } from "../context/AuthContext";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const {user} = useContext(AuthContext)

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1); 

  const PER_PAGE = 10;

  const fetchBookings = async (pageNum) => {
    try {
      let url = `/api/bookings?page=${pageNum}&per_page=${PER_PAGE}`;

      
      if (user?.role === 'Driver') {
        url += `&driver_id=${user.id}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        
        setBookings(data.data);

        setPages(data.pages || 1);
        setPage(data.page || 1);
      }
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };


  useEffect(() => {
    fetchBookings(page);
  }, [page]);

  const handleSaveBooking = (booking) => {
    if (editingBooking) {
      const updatedList = bookings.map((b) =>
        b.bookDate === editingBooking.bookDate ? booking : b
      );
      setBookings(updatedList);
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

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowCustomerModal(true);
  };
  
  const handlePageChange = (direction) => {
    const newPage = direction === "prev" ? page - 1 : page + 1;
    if (newPage >= 1 && newPage <= pages) {
      setPage(newPage);
    }
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
            {bookings?.error?<p>Now users found</p>:bookings.map((b, index) => (
              <tr key={`booking-${index}`}>
                <td>{b.customer.first_name} {b.customer.second_name}</td>
                <td>{b.trip.bus.registration}</td>
                <td>{b.trip.departure || "N/A"}</td>
                <td>{b.trip.arrival || "N/A"}</td>
                <td className="text-primary">{b.status}</td>
                <td>{b.created_at}</td>
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

        {/* Pagination Controls */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={page <= 1}
          >
             Prev
          </button>
          <span>Page {page} of {pages}</span>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => handlePageChange("next")}
            disabled={page >= pages}
          >
            Next
          </button>
        </div>
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
