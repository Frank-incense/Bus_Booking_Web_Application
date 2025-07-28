import React from "react";

const TripCard = ({ trip }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{trip.operator}</h5>
        <p className="card-text">
          From: {trip.origin} → To: {trip.destination}
        </p>
        <p className="card-text">
          Departure: {trip.departureTime} | Date: {trip.date}
        </p>
        <p className="card-text">Price: KES {trip.price}</p>
        <a href={`/book/${trip.id}`} className="btn btn-primary">
          Book Now
        </a>
      </div>
    </div>
  );
};

export default TripCard;
 