import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchBar.css"; // Optional: For custom styling

export default function SearchBar() {
  const [tripType, setTripType] = useState("oneWay");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      tripType,
      from,
      to,
      departureDate: departureDate?.toLocaleDateString(),
      ...(tripType === "return" && { returnDate: returnDate?.toLocaleDateString() }),
    };

    setResults(data);
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSubmit}>
        {/* Trip Type */}
        <label>
          <input
            type="radio"
            name="tripType"
            value="oneWay"
            checked={tripType === "oneWay"}
            onChange={() => setTripType("oneWay")}
          />
          One way
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="return"
            checked={tripType === "return"}
            onChange={() => setTripType("return")}
          />
          Return trip
        </label>

        {/* Locations */}
        <input
          type="text"
          placeholder="From:"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="To:"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          required
        />

        {/* Departure Date */}
        <DatePicker
          selected={departureDate}
          onChange={(date) => setDepartureDate(date)}
          placeholderText="Departure date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          required
        />

        {/* Return Date (if applicable) */}
        {tripType === "return" && (
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            placeholderText="Return date"
            dateFormat="yyyy-MM-dd"
            minDate={departureDate || new Date()}
            required
          />
        )}

        <button type="submit">Search</button>
      </form>

      {/* Search Results */}
      {results && (
        <div style={{ marginTop: "20px" }}>
          <h3>Search Summary:</h3>
          <p><strong>From:</strong> {results.from}</p>
          <p><strong>To:</strong> {results.to}</p>
          <p><strong>Departure:</strong> {results.departureDate}</p>
          {tripType === "return" && (
            <p><strong>Return:</strong> {results.returnDate}</p>
          )}
          <p>🔍 Searching available trips...</p>
        </div>
      )}
    </div>
  );
}