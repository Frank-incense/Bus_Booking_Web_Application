import React, { useState } from "react";
import "./BusBooking.css";
import { useNavigate } from "react-router-dom";

const seatRows = 12;
const seatColumns = 4;
const pricePerSeat = 1750;


; // example booked seats

const BusBooking = ({
  tripId,
  operator = "",
  departure = "07:00 Nairobi",
  arrival = "04:00 Kisumu",
  onClose,
  bookings
}) => {
  const navigate = useNavigate()
  const initialBookedSeats = new Set(bookings)
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
  const seats = []
  const handleBookSeats = () => {
    if (selectedSeats.size === 0) return;
    alert("Seats booked successfully!");
    navigate("/book", {
      state: {
        tripId: tripId,
        selectedSeats: seats
      }
    });

    const newBookedSeats = new Set(bookedSeats);
    selectedSeats.forEach((seat) => newBookedSeats.add(seat));
    setBookedSeats(newBookedSeats);
    setSelectedSeats(new Set());
  };

  const toggleSeat = (seatNumber) => {
    if (bookedSeats.has(seatNumber)) return;

    const newSelectedSeats = new Set(selectedSeats);
    if (newSelectedSeats.has(seatNumber)) {
      newSelectedSeats.delete(seatNumber);
    } else {
      newSelectedSeats.add(seatNumber);
    }
    setSelectedSeats(newSelectedSeats);
  };

  const totalFare = selectedSeats.size * pricePerSeat;

  

  const renderSeat = (seatNumber) => {
    const isBooked = bookedSeats.has(seatNumber);
    const isSelected = selectedSeats.has(seatNumber);

    let seatClass = "seat empty-seat";
    if (isBooked) {
      seatClass = "seat booked-seat";
    } else if (isSelected) {
      seatClass = "seat selected-seat";
      seats.push(seatNumber)
    }

    return (
      <div
        key={seatNumber}
        className={seatClass}
        onClick={() => toggleSeat(seatNumber)}
        title={`Seat ${seatNumber}`}
      >
        {seatNumber}
      </div>
    );
  };

  const renderSeatsGrid = () => {
    const rows = [];
    let seatNumber = 1;

    for (let row = 0; row < seatRows; row++) {
      const seatsLeft = [];
      const seatsRight = [];

      for (let col = 0; col < seatColumns; col++) {
        const seat = renderSeat(seatNumber);
        if (col < 2) {
          seatsLeft.push(seat);
        } else {
          seatsRight.push(seat);
        }
        seatNumber++;
      }

      rows.push(
        <div
          key={row}
          className="seat-row"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="seat-group-left" style={{ display: "flex" }}>
            {seatsLeft}
          </div>
          <div className="seat-group-right" style={{ display: "flex" }}>
            {seatsRight}
          </div>
        </div>
      );
    }

    return rows;
  };

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
          <button
            className="book-seats-button"
            disabled={selectedSeats.size === 0}
            onClick={handleBookSeats}
          >
            Book seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusBooking;
