import React from 'react';
import './Hiring.css';

const Hiring = () => {
  return (
    <div className="hiring-container">
      <section className="hiring-hero">
        <h1>Hire a Bus</h1>
        <p>Reliable buses for corporate trips, events, tours, and private travel.</p>
      </section>

      <section className="hiring-details">
        <h2>Our Hiring Options</h2>
        <ul>
          <li>🚌 Full-day or half-day hire</li>
          <li>👥 For groups of all sizes</li>
          <li>📍 Pick-up and drop-off flexibility</li>
          <li>📞 24/7 customer support</li>
        </ul>
      </section>

      <section className="hiring-form-section">
        <h2>Request a Quote</h2>
        <form className="hiring-form">
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="text" placeholder="Trip Location" required />
          <input type="date" required />
          <textarea placeholder="Describe your needs..." rows="4"></textarea>
          <button type="submit">Submit Request</button>
        </form>
      </section>
    </div>
  );
};

export default Hiring;
