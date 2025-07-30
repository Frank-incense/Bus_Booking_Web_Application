import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const team = [
    {
      name: 'Frankincense Okwemba',
      role: 'Technical Lead',
      description: 'Frankincense oversees system architecture and ensures the reliability and performance of our platform.',
    },
    {
      name: 'Jeff Wafula',
      role: 'Operations Manager',
      description: 'Jeff streamlines operations, making sure services run smoothly and efficiently.',
    },
    {
      name: 'Margaret Wanjiku',
      role: 'UX/UI Designer',
      description: 'Margaret crafts clean and intuitive designs for a seamless user experience.',
    },
    {
      name: 'Ibrahim Abdullahi',
      role: 'Customer Relations',
      description: 'Ibrahim builds relationships with customers and ensures satisfaction across all services.',
    },
    {
      name: 'Alex Dunstan',
      role: 'Software Developer',
      description: 'Alex writes scalable code and brings technical solutions to life across the platform.',
    },
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Booking Made Easy</h1>
        <p>Our mission is to revolutionize bus travel with seamless booking and management solutions for everyone.</p>
        
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="journey-text">
          <h2>Our Journey: From Concept to Leading Bus Booking Solution</h2>
          <p>
            Founded in 2025, our company began with a vision to revolutionize the bus booking experience.
            Over the months, we have grown into a powerful platform, serving millions of passengers and
            empowering operators with advanced management tools.
          </p>
        </div>
        <div className="journey-image">[Image Placeholder]</div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h3>Together</h3>
        <h2>Our Team</h2>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-image">[Photo]</div>
              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
              <p className="description">{member.description}</p>
              <div className="icons">🌐 ✉️ 🔗</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
