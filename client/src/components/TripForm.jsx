import { useState } from "react";

export default function TripForm() {
  const [tripType, setTripType] = useState("one-way");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: "",
    return: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
    if (e.target.value === "one-way") {
      setFormData({ ...formData, return: "" }); // Clear return date
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify({ tripType, ...formData }, null, 2));
    // You can replace this with a POST fetch to your Flask backend
  };

  return (
    <div className="trip-form-container" style={{ maxWidth: 500, margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={handleTripTypeChange}
            />
            One way
          </label>
          <label style={{ marginLeft: 20 }}>
            <input
              type="radio"
              name="tripType"
              value="return"
              checked={tripType === "return"}
              onChange={handleTripTypeChange}
            />
            Return trip
          </label>
        </div>

        <div>
          <input
            type="text"
            name="from"
            placeholder="From"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="to"
            placeholder="To"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="date"
            name="departure"
            value={formData.departure}
            onChange={handleChange}
            required
          />
        </div>

        {tripType === "return" && (
          <div>
            <input
              type="date"
              name="return"
              value={formData.return}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <button type="submit">Search</button>
      </form>
    </div>
  );
}