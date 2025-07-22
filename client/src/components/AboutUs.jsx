import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const team = [
    {
      name: 'Alice Johnson',
      role: 'Project Manager',
      description: 'Alice leads projects & ensures timely execution, driving the team with expertise.',
    },
    {
      name: 'Bob Smith',
      role: 'Lead Developer',
      description: 'Bob leads innovative architecture, driving development forward with precision and speed.',
    },
    {
      name: 'Cathy Lee',
      role: 'UI Designer',
      description: 'Cathy designs user-friendly, beautiful interfaces, ensuring great user experience.',
    },
    {
      name: 'David Brown',
      role: 'Marketing Specialist',
      description: 'David focuses on marketing strategies, enhancing outreach and user adoption.',
    },
    {
      name: 'Emma Wilson',
      role: 'Data Analyst',
      description: 'Emma analyzes data insights, helping to refine and innovate for growth opportunities.',
    },
    {
      name: 'Frank Harris',
      role: 'Customer Support',
      description: 'Frank provides exceptional support, ensuring user satisfaction and smooth experiences.',
    },
    {
      name: 'Grace Lee',
      role: 'Content Writer',
      description: 'Grace creates engaging content that drives our brand mission forward with clarity.',
    },
    {
      name: 'Wei-Yu Neing',
      role: 'AI Lead',
      description: 'Wei-Yu explores cutting-edge opportunities and leads our AI innovation efforts.',
    },
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Booking Made Easy</h1>
        <p>Our mission is to revolutionize bus travel with seamless booking and management solutions for everyone.</p>
        <div className="hero-buttons">
          <button className="primary-btn">Learn More</button>
          <button className="secondary-btn">Join Us</button>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="journey-text">
          <h2>Our Journey: From Concept to Leading Bus Booking Solution</h2>
          <p>
            Founded in 2015, our company began with a vision to revolutionize the bus booking experience.
            Over the years, we have grown into a powerful platform, serving millions of passengers and
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
