import React, { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Driver",
    image: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Registration successful! You can now log in.");
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Driver",
        image: "",
      });
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Register</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="Driver">Driver</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
