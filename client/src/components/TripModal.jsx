import { useEffect, useState } from "react";

const TripModal = ({ show, onClose, onSave, trip }) => {
    const [formData, setFormData] = useState(trip || {
        route_id: 0,
        bus_id: 0,
        departure: '',
        arrival: '',
        cost: 0
    });
    const [minDate, setMinDate] = useState('');
    const [routes, setRoutes] = useState([]);
    const [buses, setBuses] = useState([]);

    useEffect(() => {
        if (trip) setFormData(trip);
        const today = new Date().toISOString().slice(0, 16);
        setMinDate(today);

        // Fetch routes
        fetch('/api/routes')
            .then(r => {
                if (!r.ok) throw new Error('Failed to fetch routes');
                return r.json();
            })
            .then(data => setRoutes(data))
            .catch(err => console.error(err));

        // Fetch buses
        fetch('/api/buses')
            .then(r => {
                if (!r.ok) throw new Error('Failed to fetch buses');
                return r.json();
            })
            .then(data => setBuses(data.data || []))
            .catch(err => console.error(err));

    }, [trip]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = trip ? 'PATCH' : 'POST';
        const url = trip ? `/api/trips/${trip.id}` : `/api/trips`;

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(r => r.json())
        .then(newTrip => {
            onSave(newTrip);
            onClose();
        })
        .catch(err => console.error("Trip save failed:", err));
    };

    if (!show) return null;

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">{trip ? 'Edit Trip' : 'Schedule Trip'}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">

                            {/* Route Selector */}
                            <select name="route_id" value={formData.route_id} onChange={handleChange} className="form-control mb-2" required>
                                <option value="">Select Route</option>
                                {routes.map(route => (
                                    <option key={route.id} value={route.id}>{route.name}</option>
                                ))}
                            </select>

                            {/* Bus Selector */}
                            <select name="bus_id" value={formData.bus_id} onChange={handleChange} className="form-control mb-2" required>
                                <option value="">Select Bus</option>
                                {buses.map(bus => (
                                    <option key={bus.id} value={bus.id}>{bus.registration}</option>
                                ))}
                            </select>

                            <input
                                type="datetime-local"
                                id="departure"
                                name="departure"
                                value={formData.departure}
                                onChange={handleChange}
                                min={minDate}
                                className="form-control mb-2"
                                required
                            />

                            <input
                                type="datetime-local"
                                id="arrival"
                                name="arrival"
                                value={formData.arrival}
                                onChange={handleChange}
                                min={formData.departure || minDate}
                                className="form-control mb-2"
                                required
                            />

                            <input
                                type="number"
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Cost"
                                required
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TripModal;
