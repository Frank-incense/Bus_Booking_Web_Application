import { useEffect, useState } from "react";

const BusModal = ({ show, onClose, onSave, bus, user }) => {
  const isAdmin = user?.role === 'Admin';
  const isDriver = user?.role === 'Driver';

  const [formData, setFormData] = useState({
    driver: isDriver ? user.name : '',
    bus: '',
    operator: '',
    status: '',
    seats: ''
  });
  
  const [busImage, setBusImage] = useState(null);

  useEffect(() => {
    if (bus) {
      setFormData(prev=>({
        ...prev,
        bus: bus.registration,
        status: bus.status,
        seats: bus.no_of_seats
      }));
    } else if (isDriver) {
      setFormData({
        driver: isDriver ? user.name : '',
        bus: '',
        operator: '',
        status: '',
        seats: ''
      });
    }
  }, [bus, user, isDriver]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (busImage) {
      data.append('busImage', busImage);
    }

    const method = bus ? 'PATCH' : 'POST';
    const url = bus ? `/api/buses/${bus.id}` : '/api/buses';

    fetch(url, {
      method,
      body: data
    })
      .then(r => r.json())
      .then(newBus => {
        onSave(newBus);
        onClose();
      })
      .catch(err => {
        console.error("Failed to save bus:", err);
        alert("Something went wrong. Try again.");
      });
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{bus ? 'Edit Bus' : 'Add Bus'}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                name="driver"
                value={formData.driver}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Driver"
                disabled={!isAdmin}
              />
              <input
                name="bus"
                value={formData.bus}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Registration"
                required
              />
              <input
                name="operator"
                value={formData.operator}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Operator"
                disabled={!isAdmin}
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control mb-2"
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                className="form-control mb-2"
                placeholder="Seats"
              />

              <div className="mb-3">
                <label htmlFor="busImage" className="form-label">Bus Picture</label>
                <input
                  type="file"
                  className="form-control"
                  id="busImage"
                  name="busImage"
                  accept="image/*"
                  onChange={(e) => setBusImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusModal;
