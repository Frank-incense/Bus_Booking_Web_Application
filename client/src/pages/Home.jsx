import React, { useState } from 'react';
import './Home.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BusBooking from '../components/BusBooking';
import TripSearchBar from '../components/SearchBar';

// Placeholder for an icon component if you have one
const Icon = ({ name }) => <i className={`fa fa-${name}`}></i>;

const Home = () => {
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
        <TripSearchBar/>
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
                {/* <div className="profile-pic-container">
                  <img
                    src="https://via.placeholder.com/30"
                    alt="Profile"
                    className="profile-pic"
                  />
                </div> */}
                <span>{route.time}</span>
                <span>{route.price}</span>
              </div>
            </div>
          ))}
        </div>
        {/* <button className="view-all-routes-button">View all routes</button> */}
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

    {/* Social Media
    <div className="footer-column">
      <h4>Follow Us</h4>
      <div className="social-icons d-flex gap-3">
        <Icon name="facebook" />
        <Icon name="twitter" />
        <Icon name="instagram" />
        <Icon name="youtube" />
      </div>
    </div> */}

    {/* Top Routes in Kenya */}
    <div className="footer-column">
      <h4>Top Routes</h4>
      <ul>
        <li>Nairobi – Mombasa</li>
        <li>Nairobi – Kisumu</li>
        <li>Nairobi – Eldoret</li>
        <li>Nairobi – Nakuru</li>
        <li>Mombasa – Malindi</li>
        <li>Kisumu – Kakamega</li>
        <li>Nakuru – Kericho</li>
      </ul>
    </div>

    {/* Popular Destinations in Kenya */}
    <div className="footer-column">
      <h4>Popular Destinations</h4>
      <ul>
        <li>Nairobi</li>
        <li>Mombasa</li>
        <li>Kisumu</li>
        <li>Nakuru</li>
        <li>Eldoret</li>
        <li>Malindi</li>
        <li>Naivasha</li>
      </ul>
    </div>

    {/* Travel Resources */}
    <div className="footer-column">
      <h4>Resources</h4>
      <ul>
        <li>Travel Blog</li>
        <li>Customer Support</li>
        <li>Booking Help</li>
        <li>Safety Guidelines</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

  </div>
</footer>

    </div>
  );
};

export default Home;
