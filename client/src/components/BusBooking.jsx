import React, { useState } from "react";
import "./BusBooking.css";

const seatRows = 10;
const seatColumns = 4;

const BusBooking = ({
  operator = "Easy Coach",
  departure = "07:00 Nairobi",
  arrival = "04:00 Kisumu",
  pricePerSeat = 1750,
  initialBooked = ["1B", "2B", "3B"],
  onClose,
  onBook = () => {},
}) => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [bookedSeats, setBookedSeats] = useState(new Set(initialBooked));

  const getSeatLabel = (row, col) => `${row}${String.fromCharCode(65 + col)}`;

  const toggleSeat = (seatLabel) => {
    if (bookedSeats.has(seatLabel)) return;

    setSelectedSeats((prev) => {
      const newSet = new Set(prev);
      newSet.has(seatLabel) ? newSet.delete(seatLabel) : newSet.add(seatLabel);
      return newSet;
    });
  };

  const handleBookSeats = () => {
    if (selectedSeats.size === 0) return;

    const newBookedSeats = new Set(bookedSeats);
    selectedSeats.forEach((seat) => newBookedSeats.add(seat));

    setBookedSeats(newBookedSeats);
    setSelectedSeats(new Set());
    alert("Seats booked successfully!");
    onBook(Array.from(selectedSeats)); // optional callback
  };

  const renderSeat = (row, col) => {
    const seatLabel = getSeatLabel(row, col);
    const isBooked = bookedSeats.has(seatLabel);
    const isSelected = selectedSeats.has(seatLabel);

    let seatClass = "seat";
    seatClass += isBooked
      ? " booked-seat"
      : isSelected
      ? " selected-seat"
      : " empty-seat";

    return (
      <div
        key={seatLabel}
        className={seatClass}
        onClick={() => toggleSeat(seatLabel)}
        title={seatLabel}
      >
        {seatLabel}
      </div>
    );
  };

  const renderSeatsGrid = () => {
    return Array.from({ length: seatRows }, (_, rowIdx) => (
      <div key={`row-${rowIdx}`} className="seat-row">
        {Array.from({ length: seatColumns }, (_, colIdx) =>
          renderSeat(rowIdx + 1, colIdx)
        )}
      </div>
    ));
  };

  const totalFare = selectedSeats.size * pricePerSeat;

  return (
    <div className="bus-booking-modal">
      <div className="bus-booking-header">
        <h3>Bus Booking Details</h3>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="bus-booking-operator-time">
        <strong>{operator}</strong>
        <span>
          {departure} → {arrival}
        </span>
      </div>

      <div className="bus-booking-content">
        <div className="seats-selection">
          <div className="legend">
            <div>
              <span className="seat empty-seat" /> Empty
            </div>
            <div>
              <span className="seat booked-seat" /> Booked
            </div>
            <div>
              <span className="seat selected-seat" /> Selected
            </div>
          </div>
          <div className="seats-grid">{renderSeatsGrid()}</div>
        </div>

        <div className="booking-details">
          <h4>Booking Details</h4>
          <p>
            <strong>Selected seats:</strong> {selectedSeats.size}
          </p>
          <p>
            <strong>Price per seat:</strong> Ksh {pricePerSeat}
          </p>
          <p>
            <strong>Total Fare:</strong> Ksh {totalFare}
          </p>
          <button
            className="book-seats-button"
            disabled={selectedSeats.size === 0}
            onClick={handleBookSeats}
          >
            Book Seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
