// import React from "react";
// import TripCard from "./TripCard";

// const TripResultsList = ({ trips }) => {
//   if (!trips.length) return <p>No trips found.</p>;

//   return (
//     <div className="row">
//       {trips.map((trip) => (
//         <div key={trip.id} className="col-md-6 mb-4">
//           <TripCard trip={trip} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TripResultsList;
import React from 'react';

export default function TripResultsList({ trips }) {
  return (
    <div>
      {trips.length === 0 ? (
        <p>No trips match your criteria.</p>
      ) : (
        trips.map((trip) => (
          <div className="card mb-3" key={trip.id}>
            <div className="card-body d-flex justify-content-between">
              <div>
                <h5>{trip.operator}</h5>
                <p>{trip.from} → {trip.to}</p>
                <small>{trip.date} @ {trip.departure}</small>
              </div>
              <div className="text-end">
                <h5>KES {trip.price}</h5>
                <button className="btn btn-primary">Book</button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
