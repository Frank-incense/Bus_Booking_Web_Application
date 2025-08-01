import { useEffect, useState } from "react";
import { getCounties } from "kenya-locations";
import './BookingDetailsModal.css'

const counties = getCounties();

function RouteModal({ onPost, routeToEdit, onUpdate, handleCancel }){
    const [formData, setFormData] = useState({
        name: '',
        origin: '',
        destination: '',
        distance: ''
    })

    useEffect(() => {
        if (routeToEdit) {
            setFormData(routeToEdit);
        } else {
            setFormData({ 
                name: '', 
                origin: '', 
                destination: '', 
                distance: '' });
        }
    }, [routeToEdit]);

    function handleSubmit(e) {
        e.preventDefault();
        if (routeToEdit) {
            fetch(`/api/routes/${routeToEdit.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then((r) => r.json())
            .then((updated) => {
                onUpdate(updated);
                setFormData({ 
                name: '', 
                origin: '', 
                destination: '', 
                distance: '' })
            });
        } 
        else {
            fetch('/api/routes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then((r) => r.json())
            .then((newRoute) => {
                onPost(newRoute);
                setFormData({ 
                name: '', 
                origin: '', 
                destination: '', 
                distance: '' })
            });
        }
    }

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{routeToEdit? 
                            'Edit Route' :
                            'Add New Route'}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}></button>
                        </div>
                        <div className="modal-body">
                            
                            <input name="name" placeholder="Route Name" value={formData.name} onChange={handleChange} required />
            
                            <select
                                name='origin'
                                className="form-select"
                                value={formData.origin}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Origin</option>
                                {counties.map((loc) => (
                                <option key={loc.code} value={loc.name}>{loc.name}</option>
                                ))}
                            </select>
                            <select
                                name='destination'
                                className="form-select"
                                value={formData.destination}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Destination</option>
                                {counties
                                .filter((loc) => loc.name !== formData.origin)
                                .map((loc) => (
                                    <option key={loc.code} value={loc.name}>{loc.name}</option>
                                ))}
                            </select>
                            <input name="distance" placeholder="Distance" type="number" value={formData.distance} onChange={handleChange} required />
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">{
                            routeToEdit
                            ? 'Edit Route' 
                            : 'Add Route'
                            }</button>
                            <button type="button" className="btn-cancel" data-bs-dismiss="modal" onClick={handleCancel}>Close</button>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}
export default RouteModal;
