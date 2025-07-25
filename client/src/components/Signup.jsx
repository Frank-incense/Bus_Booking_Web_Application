import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    image_url: null,
    license: null,
    rememberMe: false
  });

  const [preview, setPreview] = useState({
    profilePic: null,
    license: null
  });

  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, type, checked, files, value } = event.target;

    if (type === 'file') {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: file }));
      const previewKey = name === 'image_url' ? 'profilePic' : name;
      setPreview((prev) => ({
        ...prev,
        [previewKey]: file ? URL.createObjectURL(file) : null
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Oops! Your passwords don't match. Try again.");
      return;
    }
    console.log("Submitted:", formData);
    setMessage("You’ve signed up! Check your email.");
  };

  return (
    <div className="signup-container">
      <div className="header-section">
        <h1 className="logo-title">
          <img src="/logo.png" alt="logo" className="logo-img" />
          JourneyHub
        </h1>
        <p className="subtitle">Get started now</p>
        <p className="subtext">Enter your credentials to access your account.</p>
      </div>

      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

        <div className="upload-section">
          <div className="upload-group">
            <label className="upload-label">Profile Picture</label>
            <label className="upload-box">
              {preview.profilePic ? (
                <img src={preview.profilePic} alt="Profile Preview" className="preview-image" />
              ) : (
                <div className="upload-icon" />
              )}
              <input type="file" name="image_url" accept="image/*" onChange={handleChange} />
            </label>
          </div>

          <div className="upload-group">
            <label className="upload-label">Drivers license</label>
            <label className="upload-box">
              {preview.license ? (
                <img src={preview.license} alt="License Preview" className="preview-image" />
              ) : (
                <div className="upload-icon" />
              )}
              <input type="file" name="license" accept="image/*" onChange={handleChange} />
            </label>
          </div>
        </div>

        <div className="remember-section">
          <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
          <label>Remember me</label>
        </div>

        <button type="submit">Register</button>

        <p className="login-link">
          Have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
