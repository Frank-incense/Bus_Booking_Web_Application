import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const routes = [
  {
    name: 'Route A',
    from: 'Nairobi',
    to: 'Kisumu',
    schedule: 'Mon-Fri: 8 AM, 12 PM, 5 PM',
  },
  {
    name: 'Route B',
    from: 'Mombasa',
    to: 'Nakuru',
    schedule: 'Daily: 7 AM, 10 AM, 2 PM, 6 PM',
  },
  {
    name: 'Route C',
    from: 'Eldoret',
    to: 'Thika',
    schedule: 'Mon-Sat: 9 AM, 1 PM, 6 PM',
  },
  {
    name: 'Route D',
    from: 'Kakamega',
    to: 'Kericho',
    schedule: 'Weekends: 10 AM, 3 PM, 7 PM',
  },
  {
    name: 'Route E',
    from: 'Naivasha',
    to: 'Nyeri',
    schedule: 'Mon-Fri: 6 AM, 2 PM, 10 PM',
  },
];

const AdminRoutesManager = () => {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Routes</h2>
        <button className="btn btn-light">Add Route</button>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search routes"
        />
      </div>

      <div className="mb-4 d-flex gap-2">
        <button className="btn btn-outline-secondary btn-sm">Date</button>
        <button className="btn btn-outline-secondary btn-sm">Route</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Route Name</th>
              <th>Trip</th>
              <th>Schedule</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.name}>
                <td>{route.name}</td>
                <td>
                  <span className="text-primary">
                    {route.from} – {route.to}
                  </span>
                </td>
                <td>{route.schedule}</td>
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
  );
};

export default AdminRoutesManager;
