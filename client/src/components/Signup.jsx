import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  
  const [message, setMessage] = useState('');

  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();

    
    if (formData.password !== formData.confirmPassword) {
      setMessage("Oops! Your passwords don't match please try it again.");
      return;
    }

    
    console.log('Here’s what the user entered:', formData);
    setMessage('You’ve signed up! Check your email to verify your account.');
  };

  return (
    <div className="signup-container">
      <h2>Let's Get You Signed Up</h2>

    
      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
