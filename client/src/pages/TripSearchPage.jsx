import { useState } from "react"
import Carousel from "../components/Carousel"
import DateSlider from "../components/DateSlider"
import TripSearchBar from "../components/SearchBar"
import TripFilterSidebar from "../components/TripFilterSidebar"
import TripResultsList from "../components/TripResultsList"

function SearchPage(){
  const [filters, setFilters] = useState({ operators: [], priceRange: [0, 5000] });
  const mockTrips = [
  {
    id: 1,
    operator: 'Modern Coast',
    from: 'Nairobi',
    to: 'Mombasa',
    date: '2025-07-17',
    departure: '08:00',
    price: 1500,
  },
  {
    id: 2,
    operator: 'Dreamline',
    from: 'Nairobi',
    to: 'Kisumu',
    date: '2025-07-18',
    departure: '07:30',
    price: 1800,
  },
  {
    id: 3,
    operator: 'Guardian',
    from: 'Nairobi',
    to: 'Eldoret',
    date: '2025-07-17',
    departure: '09:00',
    price: 1200,
  },
  // Add more as needed
];

  const filteredTrips = mockTrips.filter((trip) => {
    const matchesOperator = filters.operators.length
      ? filters.operators.includes(trip.operator)
      : true;
    const matchesPrice =
      trip.price >= filters.priceRange[0] && trip.price <= filters.priceRange[1];

    return  matchesOperator && matchesPrice;
  });
  return (
    <main>
      <Carousel/>
      <TripSearchBar/>
      <div className="container">
        <div className="container-fluid mt-4">
          <div className="row">
            <div className="col-md-3">
              <TripFilterSidebar filters={filters} setFilters={setFilters} />
            </div>
            <div className="col-md-9">
              <TripResultsList trips={filteredTrips} />
            </div>
          </div>
        </div>
      </div>
      


    </main>
  )
}

export default SearchPage