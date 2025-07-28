// const TripFilterSidebar = ({ filters, setFilters }) => {
//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="card p-3 shadow-sm">
//       <h5>Filter Trips</h5>

//       <div className="mb-3">
//         <label className="form-label">Operator</label>
//         <select
//           className="form-select"
//           name="operator"
//           value={filters.operator}
//           onChange={handleChange}
//         >
//           <option value="">All</option>
//           <option value="Dreamline">Dreamline</option>
//           <option value="Modern Coast">Modern Coast</option>
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Price Range</label>
//         <select
//           className="form-select"
//           name="priceRange"
//           value={filters.priceRange}
//           onChange={handleChange}
//         >
//           <option value="">Any</option>
//           <option value="0-1000">0 - 1,000 KES</option>
//           <option value="1001-2000">1,001 - 2,000 KES</option>
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Time of Day</label>
//         <select
//           className="form-select"
//           name="timeOfDay"
//           value={filters.timeOfDay}
//           onChange={handleChange}
//         >
//           <option value="">Any</option>
//           <option value="morning">Morning (6AM - 12PM)</option>
//           <option value="afternoon">Afternoon (12PM - 6PM)</option>
//           <option value="evening">Evening (6PM - 10PM)</option>
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">Date of Travel</label>
//         <input
//           type="date"
//           className="form-control"
//           name="travelDate"
//           value={filters.travelDate}
//           onChange={handleChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default TripFilterSidebar;
import React from 'react';

export default function SidebarFilter({ filters, setFilters }) {
  const operators = ['Modern Coast', 'Easy Coach', 'Dreamline', 'Guardian'];

  const toggleOperator = (operator) => {
    const updated = filters.operators.includes(operator)
      ? filters.operators.filter((op) => op !== operator)
      : [...filters.operators, operator];
    setFilters({ ...filters, operators: updated });
  };

  return (
    <div className="card p-3">
      <h5>Filter by Operator</h5>
      {operators.map((op) => (
        <div className="form-check" key={op}>
          <input
            className="form-check-input"
            type="checkbox"
            checked={filters.operators.includes(op)}
            onChange={() => toggleOperator(op)}
          />
          <label className="form-check-label">{op}</label>
        </div>
      ))}
    </div>
  );
}
