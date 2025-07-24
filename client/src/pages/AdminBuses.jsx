import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const buses = [
  {
    driver: 'Frankincense Wesley',
    bus: 1,
    trip: 2,
    arrival: '11/07/2025 19:00',
    status: 'Active',
    seats: 50,
  },
  {
    driver: 'Frankincense Wesley',
    bus: 1,
    trip: 11,
    arrival: '11/07/2025 19:00',
    status: 'Inactive',
    seats: 50,
  },
  {
    driver: 'Frankincense Wesley',
    bus: 1,
    trip: 7,
    arrival: '11/07/2025 19:00',
    status: 'Active',
    seats: 50,
  },
];

const trips = [
  {
    route: 'Route A',
    bus: 1,
    departure: '11/07/2025 19:00',
    arrival: '11/07/2025 19:00',
    cost: '$25',
  },
  {
    route: 'Route B',
    bus: 1,
    departure: '11/07/2025 19:00',
    arrival: '11/07/2025 19:00',
    cost: '$25',
  },
  {
    route: 'Route C',
    bus: 1,
    departure: '11/07/2025 19:00',
    arrival: '11/07/2025 19:00',
    cost: '$25',
  },
];

const AdminBuses = () => {
  return (
    <div className="container py-4">
      {/* Buses Section */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Buses</h2>
          <button className="btn btn-primary">Add Bus</button>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Buses"
          />
        </div>

        <div className="mb-4 d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">Status</button>
          <button className="btn btn-outline-secondary btn-sm">Time</button>
          <button className="btn btn-outline-secondary btn-sm">Seats</button>
          <button className="btn btn-outline-secondary btn-sm">Bus</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Driver</th>
                <th>Bus</th>
                <th>Trip</th>
                <th>Arrival</th>
                <th>Status</th>
                <th>No. of Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr key={index}>
                  <td>{bus.driver}</td>
                  <td>{bus.bus}</td>
                  <td>{bus.trip}</td>
                  <td>{bus.arrival}</td>
                  <td className={bus.status === 'Active' ? 'text-success' : 'text-danger'}>
                    {bus.status}
                  </td>
                  <td>{bus.seats}</td>
                  <td>
                    <a href="#" className="text-decoration-none text-primary fw-medium">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trips Section */}
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Trips</h2>
          <button className="btn btn-secondary">Schedule Trip</button>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Trips"
          />
        </div>

        <div className="mb-4 d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm">Route</button>
          <button className="btn btn-outline-secondary btn-sm">Time</button>
          <button className="btn btn-outline-secondary btn-sm">Customer</button>
          <button className="btn btn-outline-secondary btn-sm">Bus</button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Route</th>
                <th>Bus</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.route}</td>
                  <td>{trip.bus}</td>
                  <td>{trip.departure}</td>
                  <td>{trip.arrival}</td>
                  <td>{trip.cost}</td>
                  <td>
                    <a href="#" className="text-decoration-none text-primary fw-medium">
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBuses;
