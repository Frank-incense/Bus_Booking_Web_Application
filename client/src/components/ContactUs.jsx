import React from 'react';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
      <section className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We’re here to help you with bookings, support, and feedback.</p>
      </section>

      {/* Contact Info Icons */}
      <section className="contact-icons">
        <div className="contact-icon">
          <span>📧</span>
          <h3>Email</h3>
          <p>For any general inquiries</p>
          <a href="mailto:support@travelhub.com">support@travelhub.com</a>
        </div>
        <div className="contact-icon">
          <span>📞</span>
          <h3>Phone</h3>
          <p>Chat with us directly</p>
          <p>+254 797 760 731</p>
        </div>
        <div className="contact-icon">
          <span>📍</span>
          <h3>Office</h3>
          <p>Visit us physically</p>
          <p>Ngong Lane Plaza, Nairobi, KE</p>
        </div>
      </section>

      {/* Form Section
      <section className="contact-form-section">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you.</p>
        <form className="contact-form">
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Subject" />
          <textarea placeholder="Message" rows="5"></textarea>
          <button type="submit">Send</button>
        </form>
      </section> */}

      {/* Locations Section */}
      <section className="contact-locations">
        <h3>Our Locations</h3>
        <p>Find us in multiple locations worldwide</p>
        <div className="location-grid">
          <div className="location-card">
            <div className="location-image">[Image]</div>
            <h4>Sydney</h4>
            <p>123 Sydney Lane</p>
          </div>
          <div className="location-card">
            <div className="location-image">[Image]</div>
            <h4>New York</h4>
            <p>456 Manhattan St</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="testimonial-image">[Image]</div>
        <blockquote>
          “Booking a bus was incredibly smooth and clear. I would recommend this service to anyone!”
        </blockquote>
        <p className="testimonial-author">— Rachel M., Customer</p>
      </section>

      {/* Newsletter Section
      <section className="newsletter-section">
        <h3>Stay Updated with Our News</h3>
        <p>Receive updates about new routes and features.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Your Email" />
          <button>Subscribe</button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-cols">
          <div>
            <h4>Logo</h4>
            <p>© 2025 BusBooking</p>
          </div>
          <div>
            <h4>Company</h4>
            <p>About</p>
            <p>Contact</p>
          </div>
          <div>
            <h4>Services</h4>
            <p>Booking</p>
            <p>Management</p>
          </div>
          <div>
            <h4>Support</h4>
            <p>FAQs</p>
            <p>Help</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Privacy • Terms • Cookies</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUs;
