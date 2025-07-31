import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { countries } from "countries-list";

const nationality = []

for (let country in countries){
  nationality.push(countries[country].name)
}
function UserBookingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Expected to come from previous step
  const { tripId, selectedSeats } = location.state || {};
  const [passengerData, setPassengerData] = useState(
    selectedSeats.map(() => ({
        firstName: "",
        secondName: "",
        email: "",
        phone: "",
        identification: "",
        nationality: ""
    }))
    );

    const handlePassengerChange = (index, e) => {
        const updated = [...passengerData];
        updated[index][e.target.name] = e.target.value;
        setPassengerData(updated);
    };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
        const requests = passengerData.map((passenger, i) =>
        axios.post("/api/bookings", {
            ...passenger,
            seat: selectedSeats[i],
            trip_id: tripId,
        })
        );
        await Promise.all(requests);
        alert("Booking successful!");
        navigate("/");
    } catch (err) {
        console.error(err);
        alert("Booking failed.");
    }
    };


  return (
    <div className="container mt-4">
      <h3>Complete Your Booking</h3>
      <p>Trip ID: {tripId}</p>
      <p>Selected Seats: {selectedSeats.join(", ")}</p>

      <form onSubmit={handleBooking}>
  {passengerData.map((passenger, idx) => (
    <div key={idx} className="border rounded p-3 mb-4">
      <h5>Passenger {idx + 1} - Seat {selectedSeats[idx]}</h5>

      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          className="form-control"
          value={passenger.firstName}
          onChange={(e) => handlePassengerChange(idx, e)}
          required
        />
      </div>

      <div className="form-group">
        <label>Second Name</label>
        <input
          type="text"
          name="secondName"
          className="form-control"
          value={passenger.secondName}
          onChange={(e) => handlePassengerChange(idx, e)}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={passenger.email}
          onChange={(e) => handlePassengerChange(idx, e)}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          className="form-control"
          value={passenger.phone}
          onChange={(e) => handlePassengerChange(idx, e)}
          required
        />
      </div>

      <div className="form-group">
        <label>Identification</label>
        <input
          type="text"
          name="identification"
          className="form-control"
          value={passenger.identification}
          onChange={(e) => handlePassengerChange(idx, e)}
          required
        />
      </div>

      <div className="form-group">
        <label>Nationality</label>
        <select
          name="nationality"
          className="form-control"
          value={passenger.nationality}
          onChange={(e) => handlePassengerChange(idx, e)}
          required
        >
          <option value="">Select your country</option>
          {nationality.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </div>
    </div>
  ))}

  <button type="submit" className="btn btn-primary">Confirm Booking</button>
</form>

    </div>
  );
}

export default UserBookingPage;
