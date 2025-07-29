import RouteModal from '../components/AddRouteModal';
import { useEffect, useState } from 'react';

const AdminRoutesManager = () => {
  const [editRoute, setEditRoute] = useState(null);
  const [routes, setRoutes] = useState([])

  function handleEdit(route) {
      setEditRoute(route);
  }
  
  useEffect(()=>{
    fetch('/api/routes')
    .then(r=>r.json())
    .then(routes=>{
      setRoutes(routes)
    })
  },[])

  function handleUpdate(updatedRoute) {
      setRoutes(prev =>
          prev.map(r => (r.id === updatedRoute.id ? updatedRoute : r))
      );
      setEditRoute(null);
  }

  function handleCancel(){
      setEditRoute(null);
  }

  function handlePost(route){
      setRoutes([
          ...routes,
          route
      ])
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Routes</h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Add Route
        </button>
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
                    {route.origin} – {route.destination}
                  </span>
                </td>
                <td>{route.schedule || 'Not set'}</td>
                <td>
                  <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(route)}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  >
                     Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Route */}
      <RouteModal
        routeToEdit={editRoute}
        onPost={handlePost}
        onUpdate={handleUpdate}
        handleCancel={handleCancel}
      />

    </div>
  );
};

export default AdminRoutesManager;
