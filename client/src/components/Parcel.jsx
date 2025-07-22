import React from 'react';
import './Parcel.css';

const Parcel = () => {
  return (
    <div className="parcel-container">
      <section className="parcel-hero">
        <h1>Parcel Delivery</h1>
        <p>Send packages fast, securely, and affordably across the country.</p>
      </section>

      <section className="parcel-benefits">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>🚚 Same-day and next-day delivery options</li>
          <li>🔒 Real-time tracking and secure handling</li>
          <li>💼 Door-to-door and terminal pickup options</li>
          <li>💳 Pay on delivery support</li>
        </ul>
      </section>

      <section className="parcel-form-section">
        <h2>Send a Parcel</h2>
        <form className="parcel-form">
          <input type="text" placeholder="Sender Name" required />
          <input type="text" placeholder="Recipient Name" required />
          <input type="text" placeholder="Origin City" required />
          <input type="text" placeholder="Destination City" required />
          <textarea placeholder="Parcel Description" rows="4"></textarea>
          <button type="submit">Submit Parcel</button>
        </form>
      </section>
    </div>
  );
};

export default Parcel;
