import React, { useState } from 'react';
import './Home.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BusBooking from '../components/BusBooking';

// Placeholder for an icon component if you have one
const Icon = ({ name }) => <i className={`fa fa-${name}`}></i>;

const Home = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const popularRoutes = [
    { id: 1, from: 'Nairobi', to: 'Kisumu', time: '6h 21min', price: 'Kes 1,500' },
    { id: 2, from: 'Nairobi', to: 'Mombasa', time: '8h', price: 'Kes 2,000' },
    { id: 3, from: 'Nairobi', to: 'Mandera', time: '18h 27min', price: 'Kes 3,500' },
    { id: 4, from: 'Nakuru', to: 'Siaya', time: '4h 59min', price: 'Kes 1,200' },
    { id: 5, from: 'Nakuru', to: 'Kitale', time: '4h 26min', price: 'Kes 1,000' },
    { id: 6, from: 'Nairobi', to: 'Eldoret', time: '5h', price: 'Kes 900' },
  ];

  const handleSearch = () => {
    console.log('Searching for:', {
      fromDate,
      toDate,
      selectedDate: selectedDate?.toLocaleDateString(),
    });
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="https://via.placeholder.com/1500x500/ADD8E6/FFFFFF?text=Bus+on+Road"
          alt="Bus on a road"
          className="hero-image"
        />
      </section>

      {/* Journey Hub Logo & Tagline */}
      <section className="journey-hub-intro">
        <div className="star-rating">⭐⭐⭐⭐</div>
        <h1>JOURNEY HUB</h1>
        <p>KENYA'S NUMBER ONE TRUSTED TRAVEL PARTNER</p>
      </section>

      {/* Search Bar Section */}
      <section className="search-bar-section">
        <div className="search-inputs">
          <div className="input-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              placeholder="Origin"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <span className="clear-input">X</span>
          </div>

          <div className="input-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              placeholder="Destination"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <span className="clear-input">X</span>
          </div>

          <div className="input-group date-input-group">
            <label htmlFor="date">Select date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Choose a date"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              id="date"
              className="date-picker-input"
              required
            />
          </div>

          <button className="search-button" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="popular-routes-section">
        <h2>POPULAR ROUTES</h2>
        <p>Discover the most traveled routes across the country</p>
        <div className="routes-grid">
          {popularRoutes.map((route) => (
            <div
              key={route.id}
              className="route-card"
              onClick={() => {
                setShowBookingModal(true);
                setSelectedRoute(route);
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="route-header">
                <h3>
                  {route.from} - {route.to}
                </h3>
              </div>
              <div className="route-details">
                <div className="profile-pic-container">
                  <img
                    src="https://via.placeholder.com/30"
                    alt="Profile"
                    className="profile-pic"
                  />
                </div>
                <span>{route.time}</span>
                <span>{route.price}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="view-all-routes-button">View all routes</button>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <BusBooking
          operator="Easy Coach"
          departure={`07:00 ${selectedRoute?.from || ''}`}
          arrival={`04:00 ${selectedRoute?.to || ''}`}
          onClose={() => setShowBookingModal(false)}
        />
      )}

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-columns">
          <div className="footer-column social-icons">
            <Icon name="facebook" />
            <Icon name="twitter" />
            <Icon name="instagram" />
            <Icon name="youtube" />
          </div>
          <div className="footer-column">
            <h4>Use cases</h4>
            <ul>
              <li>UI design</li>
              <li>UX design</li>
              <li>Wireframing</li>
              <li>Programming</li>
              <li>Development</li>
              <li>Online whiteboard</li>
              <li>Team collaboration</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>Design</li>
              <li>Prototyping</li>
              <li>Development features</li>
              <li>Design systems</li>
              <li>Collaboration features</li>
              <li>Design process</li>
              <li>FigJam</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Best practices</li>
              <li>Colors</li>
              <li>Color wheel</li>
              <li>Support</li>
              <li>Developers</li>
              <li>Resource library</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
