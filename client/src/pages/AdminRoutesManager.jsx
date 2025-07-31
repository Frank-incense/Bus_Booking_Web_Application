import RouteModal from '../components/AddRouteModal';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminRoutesManager = () => {
  const [editRoute, setEditRoute] = useState(null);
  const [routes, setRoutes] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const {user} = useContext(AuthContext)

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

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          route.destination.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'date') {
      return matchesSearch && route.schedule; // Only those with schedule (you can customize)
    }

    if (filter === 'route') {
      return matchesSearch && route.name; // Can be used to match based on route name
    }

    return matchesSearch;
  });


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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mb-4 d-flex gap-2">
        <button 
          className={`btn btn-outline-secondary btn-sm ${filter === 'date' ? 'active' : ''}`}
          onClick={() => setFilter('date')}
        >
          Date
        </button>
        <button 
          className={`btn btn-outline-secondary btn-sm ${filter === 'route' ? 'active' : ''}`}
          onClick={() => setFilter('route')}
        >
          Route
        </button>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={() => {
            setSearchTerm('');
            setFilter('');
          }}
        >
          Clear
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Route Name</th>
              <th>Origin</th>
              <th>Destination</th>
              {user?.role==='Admin'?<th>Actions</th>:''}
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((route) => (
              <tr key={route.name}>
                <td>{route.name}</td>
                <td>
                  <span className="text-primary">
                    {route.origin}  
                  </span>
                </td>
                <td>
                  <span className="text-primary">
                  {route.destination}
                  </span>
                  </td>
                {user?.role==='Admin'?<td>
                  <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleEdit(route)}
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  >
                     Edit
                  </button>
                </td>:null}
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
