// import { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./SearchBar.css"; // Optional: For custom styling
// import { getCounties } from "kenya-locations";


// const counties = getCounties();

// export default function SearchBar() {
//   const [tripType, setTripType] = useState("oneWay");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [departureDate, setDepartureDate] = useState(null);
//   const [returnDate, setReturnDate] = useState(null);
//   const [results, setResults] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       tripType,
//       from,
//       to,
//       departureDate: departureDate?.toLocaleDateString(),
//       ...(tripType === "return" && { returnDate: returnDate?.toLocaleDateString() }),
//     };

//     setResults(data);
//   };

//   return (
//     <div>
//       <form className="search-bar" onSubmit={handleSubmit}>
//         {/* Trip Type */}
//         <label>
//           <input
//             type="radio"
//             name="tripType"
//             value="oneWay"
//             checked={tripType === "oneWay"}
//             onChange={() => setTripType("oneWay")}
//           />
//           One way
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="tripType"
//             value="return"
//             checked={tripType === "return"}
//             onChange={() => setTripType("return")}
//           />
//           Return trip
//         </label>

//         {/* Locations */}
//         <input
//           type="text"
//           placeholder="From:"
//           value={from}
//           onChange={(e) => setFrom(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="To:"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//           required
//         />

//         {/* Departure Date */}
//         <DatePicker
//           selected={departureDate}
//           onChange={(date) => setDepartureDate(date)}
//           placeholderText="Departure date"
//           dateFormat="yyyy-MM-dd"
//           minDate={new Date()}
//           required
//         />

//         {/* Return Date (if applicable) */}
//         {tripType === "return" && (
//           <DatePicker
//             selected={returnDate}
//             onChange={(date) => setReturnDate(date)}
//             placeholderText="Return date"
//             dateFormat="yyyy-MM-dd"
//             minDate={departureDate || new Date()}
//             required
//           />
//         )}

//         <button type="submit">Search</button>
//       </form>

//       {/* Search Results */}
//       {results && (
//         <div style={{ marginTop: "20px" }}>
//           <h3>Search Summary:</h3>
//           <p><strong>From:</strong> {results.from}</p>
//           <p><strong>To:</strong> {results.to}</p>
//           <p><strong>Departure:</strong> {results.departureDate}</p>
//           {tripType === "return" && (
//             <p><strong>Return:</strong> {results.returnDate}</p>
//           )}
//           <p>🔍 Searching available trips...</p>
//         </div>
//       )}
//     </div>
//   );
// }
import  { useState, useEffect } from 'react';
import {getCounties} from 'kenya-locations'

const counties = getCounties();

const TripSearchBar = ({ onSearch }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!from || !to || !departureDate) {
          alert('Please select From, To, and Departure Date.');
          return;
        }

        if (returnDate && returnDate < departureDate) {
          alert('Return date must be after departure date.');
          return;
        }

        onSearch({ from, to, departureDate, returnDate });
    };

    
    return (
      <div className="container">
        <form className="row g-3 p-3 bg-light rounded shadow-sm mb-4" onSubmit={handleSubmit}>
        <div className="col-md-3">
          <label htmlFor="fromLocation" className="form-label">From</label>
          <select
            id="fromLocation"
            className="form-select"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          >
            <option value="">Select departure</option>
            {counties.map((loc) => (
              <option key={loc.code} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="toLocation" className="form-label">To</label>
          <select
            id="toLocation"
            className="form-select"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          >
            <option value="">Select destination</option>
            {counties
            .filter((loc) => loc.name !== from)
            .map((loc) => (
              <option key={loc.code} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-2">
          <label htmlFor="departureDate" className="form-label">Departure Date</label>
          <input
            type="date"
            id="departureDate"
            className="form-control"
            value={departureDate}
            onChange={(e) => {
              setDepartureDate(e.target.value);
              if (returnDate && e.target.value > returnDate) {
                setReturnDate(''); // reset return date if it's invalid
              }
            }}
            min={minDate}
            required
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="returnDate" className="form-label">Return Date (optional)</label>
          <input
            type="date"
            id="returnDate"
            className="form-control"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={departureDate || minDate}
            disabled={!departureDate}
          />
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">Search</button>
        </div>
      </form>
      </div>
      
    );
};

export default TripSearchBar;
