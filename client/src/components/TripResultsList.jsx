

export default function TripResultsList({ trips, onBook }) {
  return (
    <div>
      {trips.length === 0 ? (
        <p>No trips match your criteria.</p>
      ) : (
        trips.map((trip) => (
          <div className="card mb-3" key={trip.id}>
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5>{trip.operator||''}</h5>
                <p>{trip.from} → {trip.to}</p>
                <small>{trip.date} @ {trip.departure}</small>
              </div>
              <div className="text-end">
                <h5>KES {trip.cost}</h5>
                <button className="btn btn-primary" onClick={() => onBook(trip)}>Book</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
