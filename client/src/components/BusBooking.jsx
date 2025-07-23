import React, { useState } from 'react';
import './BusBooking.css';

const seatRows = 10;
const seatColumns = 4;
const pricePerSeat = 1750;

const initialBookedSeats = new Set(['1B', '2B', '3B']); // Example booked seats

const BusBooking = ({ operator = 'Easy Coach', departure = '07:00 Nairobi', arrival = '04:00 Kisumu', onClose }) => {
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);

  const toggleSeat = (seat) => {
    if (bookedSeats.has(seat)) return;
    const newSelectedSeats = new Set(selectedSeats);
    if (newSelectedSeats.has(seat)) {
      newSelectedSeats.delete(seat);
    } else {
      newSelectedSeats.add(seat);
    }
    setSelectedSeats(newSelectedSeats);
  };

  const totalFare = selectedSeats.size * pricePerSeat;

  const handleBookSeats = () => {
    if (selectedSeats.size === 0) return;
    alert('Seats booked successfully!');
    const newBookedSeats = new Set(bookedSeats);
    selectedSeats.forEach(seat => newBookedSeats.add(seat));
    setBookedSeats(newBookedSeats);
    setSelectedSeats(new Set());
  };

  const renderSeat = (row, col) => {
    const seatLabel = `${row}${String.fromCharCode(65 + col)}`;
    const isBooked = bookedSeats.has(seatLabel);
    const isSelected = selectedSeats.has(seatLabel);

    let seatClass = 'seat empty-seat';
    if (isBooked) seatClass = 'seat booked-seat';
    if (isSelected) seatClass = 'seat selected-seat';

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
    const rows = [];
    for (let row = 1; row <= seatRows; row++) {
      const seats = [];
      for (let col = 0; col < seatColumns; col++) {
        seats.push(renderSeat(row, col));
      }
      rows.push(
        <div key={row} className="seat-row">
          {seats}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="bus-booking-modal">
      <div className="bus-booking-header">
        <h3>Bus Booking Details</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="bus-booking-operator-time">
        <strong>{operator}</strong>
        <span>{departure}</span>
        <span>{arrival}</span>
      </div>
      <div className="bus-booking-content">
        <div className="seats-selection">
          <div className="legend">
            <div><div className="seat empty-seat"></div> Empty seat</div>
            <div><div className="seat booked-seat"></div> Booked seat</div>
            <div><div className="seat selected-seat"></div> Selected seat</div>
          </div>
          <div className="seats-grid">{renderSeatsGrid()}</div>
        </div>
        <div className="booking-details">
          <h4>Booking Details</h4>
          <p>Selected seats: {selectedSeats.size}</p>
          <p>Price per seat: {pricePerSeat}</p>
          <p>Total Fare: {totalFare}</p>
          <button className="book-seats-button" disabled={selectedSeats.size === 0} onClick={handleBookSeats}>
            Book seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
