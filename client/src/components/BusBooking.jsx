import React, { useState } from "react";
import "./BusBooking.css";

const seatRows = 10;
const seatColumns = 4;
const pricePerSeat = 1750;

const initialBookedSeats = new Set(["1B", "2B", "3B"]);
const BusBooking = ({
  operator = "Easy Coach",
  departure = "07:00 Nairobi",
  arrival = "04:00 Kisumu",
  onClose,
}) => {
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
    alert("Seats booked successfully!");
    const newBookedSeats = new Set(bookedSeats);
    selectedSeats.forEach((seat) => newBookedSeats.add(seat));
    setBookedSeats(newBookedSeats);
    setSelectedSeats(new Set());
  };

  const renderSeat = (row, col) => {
    let seatLabel = `${row}${String.fromCharCode(65 + col)}`;
    if (row === 1 && col === 2) {
      seatLabel = "DR";
    }
    const isBooked = bookedSeats.has(seatLabel);
    const isSelected = selectedSeats.has(seatLabel);

    let seatClass = "seat empty-seat";
    if (seatLabel === "DR") {
      seatClass = "seat driver-seat";
    } else if (isBooked) {
      seatClass = "seat booked-seat";
    } else if (isSelected) {
      seatClass = "seat selected-seat";
    }

    return (
      <div
        key={seatLabel}
        className={seatClass}
        onClick={() => {
          if (seatLabel === "DR") return;
          toggleSeat(seatLabel);
        }}
        title={seatLabel}
        style={seatLabel === "DR" ? { backgroundColor: "red", color: "white", fontWeight: "bold", cursor: "default" } : {}}
      >
        {seatLabel}
      </div>
    );
  };

  const renderSeatsGrid = () => {
    const rows = [];
    for (let row = 1; row <= seatRows; row++) {
      const seatsLeft = [];
      const seatsRight = [];
      seatsLeft.push(renderSeat(row, 0));
      seatsLeft.push(renderSeat(row, 1));
      if (row === 1) {
        seatsRight.push(renderSeat(row, 2));
      } else {
        seatsRight.push(renderSeat(row, 2));
        seatsRight.push(renderSeat(row, 3));
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
            <div>
              <div className="seat empty-seat"></div> Empty seat
            </div>
            <div>
              <div className="seat booked-seat"></div> Booked seat
            </div>
            <div>
              <div className="seat selected-seat"></div> Selected seat
            </div>
            <div>
              <div className="seat driver-seat" style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold', cursor: 'default', display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
                DR
              </div> Driver seat
            </div>
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
