import  { useState, useEffect } from 'react';
import { getCounties } from 'kenya-locations'
import { useLocation, useNavigate } from 'react-router-dom';

const counties = getCounties();

const TripSearchBar = ({ onSearch }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
      const params = new URLSearchParams(location.search);
      setFrom(params.get('from') || '');
      setTo(params.get('to') || '');
      setDepartureDate(params.get('departureDate') || '');
      setReturnDate(params.get('returnDate') || '');
    }, [location.search]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setMinDate(today);
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!from || !to || !departureDate) {
        alert('Please fill in From, To, and Departure Date');
        return;
      }

      if (returnDate && returnDate < departureDate) {
        alert('Return date must be after departure date.');
        return;
      }

      const searchParams = new URLSearchParams({
        from,
        to,
        departureDate,
        ...(returnDate && { returnDate }),
      }).toString();

      // If there's an onSearch prop, use it (SearchPage); otherwise redirect (HomePage)
      if (onSearch) {
        onSearch({ from, to, departureDate, returnDate });
      } else {
        navigate(`/search?${searchParams}`);
      }
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
          <label htmlFor="departureDate" className="form-label">Departure</label>
          <input
            type="date"
            id="departureDate"
            className="form-control"
            value={departureDate}
            onChange={(e) => {
              setDepartureDate(e.target.value);
              if (returnDate && e.target.value > returnDate) {
                setReturnDate(''); 
              }
            }}
            min={minDate}
            required
          />
        </div>

        <div className="col-md-2">
          <label htmlFor="returnDate" className="form-label">Return(optional)</label>
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
