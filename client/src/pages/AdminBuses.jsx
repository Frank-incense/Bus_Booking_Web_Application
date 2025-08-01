import { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BusModal from '../components/BusModal';
import TripModal from '../components/TripModal';
import { AuthContext } from '../context/AuthContext';

const AdminBuses = () => {
  const [buses, setBuses] = useState([])
  const [trips, setTrips] = useState([])
  const [showBusModal, setShowBusModal] = useState(false);
  const [showTripModal, setShowTripModal] = useState(false);
  const [currentBus, setCurrentBus] = useState(null);
  const [currentTrip, setCurrentTrip] = useState(null);

  const {user} = useContext(AuthContext)
  
  useEffect(()=>{
    const busUrl = user?.role === 'Admin' 
        ? '/api/buses' 
        : `/api/buses?driver_id=${user?.id}`;

    const tripUrl = user?.role === 'Admin' 
      ? '/api/trips' 
      : `/api/trips?driver_id=${user?.id}`;

    fetch(busUrl)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Failed to fetch buses: ${r.status} ${r.statusText}`);
        }
        return r.json();
      })
      .then((buses) => {
        setBuses(buses.data||[]);
      })
      .catch((error) => {
        console.error("Error fetching buses:", error.message);
        // Optionally show an error message to the user
      });

    fetch(tripUrl)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Failed to fetch trips: ${r.status} ${r.statusText}`);
        }
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTrips(data);
        } else if (Array.isArray(data.data)) {
          setTrips(data.data);
        } else {
          console.error("Unexpected trips format:", data);
          setTrips([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching trips:", error.message);
        setTrips([]); 
      });


  },[user])
    console.log(buses)
  return (
    <div className="container py-4">
      {/* Buses Section */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Buses</h2>
          <button className="btn btn-primary" onClick={() => {
            setCurrentBus(null);
            setShowBusModal(true);
          }}>
            Add Bus
          </button>
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
                <th>Trip Count</th>
                <th>Status</th>
                <th>No. of Seats</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus, index) => (
                <tr key={index}>
                  <td>{bus.user.name}</td>
                  <td>{bus.registration}</td>
                  <td>{bus.trips.length}</td>
                  <td className={bus.status === 'Active' ? 'text-success' : 'text-danger'}>
                    {bus.status}
                  </td>
                  <td>{bus.no_of_seats}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentBus(bus);
                        setShowBusModal(true);
                      }}
                      className="text-decoration-none text-primary fw-medium"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BusModal
        show={showBusModal}
        onClose={() => setShowBusModal(false)}
        onSave={(busData) => {
          if (currentBus) {
            setBuses(prev => prev.map(b => b === currentBus ? busData : b));
          } else {
            setBuses(prev => [...prev, busData]);
          }
        }}
        bus={currentBus}
        user={user}
      />
      {/* Trips Section */}
      <div className="mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Trips</h2>
          <button className="btn btn-secondary" onClick={() => {
            setCurrentTrip(null);
            setShowTripModal(true);
          }}>
            Schedule Trip
          </button>
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
              {trips?.error? <p>{trips.error}</p>:trips.map((trip, index) => (
                <tr key={index}>
                  <td>{trip.route.name}</td>
                  <td>{trip.bus.registration}</td>
                  <td>{trip.departure}</td>
                  <td>{trip.arrival}</td>
                  <td>{trip.cost}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentTrip(trip);
                        setShowTripModal(true);
                      }}
                      className="text-decoration-none text-primary fw-medium"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <TripModal
        show={showTripModal}
        onClose={() => setShowTripModal(false)}
        onSave={(tripData) => {
          if (currentTrip) {
            setTrips(prev => prev.map(t => t === currentTrip ? tripData : t));
          } else {
            setTrips(prev => {
              return[...prev, tripData]
            });
          }
        }}
        trip={currentTrip}
        busses={buses}
      />
    </div>
  );
};

export default AdminBuses;
