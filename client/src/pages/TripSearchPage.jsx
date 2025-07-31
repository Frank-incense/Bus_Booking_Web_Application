import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Carousel from "../components/Carousel"
import TripSearchBar from "../components/SearchBar"
import TripResultsList from "../components/TripResultsList"
import BusBooking from "../components/BusBooking"

function SearchPage() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleCloseModal = () => setSelectedTrip(null);

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      from: params.get('from') || '',
      to: params.get('to') || '',
      departureDate: params.get('departureDate') || '',
      returnDate: params.get('returnDate') || '',
    };
  };

  const fetchResults = async (query) => {
    const res = await fetch(`/api/search?${new URLSearchParams(query)}`);
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    const query = getQueryParams();
    fetchResults(query);
  }, [location.search]);
  

  return (
    <main>
      <Carousel />
      <TripSearchBar />
      <div className="container">
        <div className="row">
          {/* <div className="col-md-3">
            <TripFilterSidebar filters={filters} setFilters={setFilters} />
          </div>
          <div className="col-md-9">
            
          </div> */}
          <TripResultsList trips={results} onBook={setSelectedTrip}/>
        </div>
      </div>
      {selectedTrip && (
        <BusBooking
          tripId={selectedTrip.tripId}
          operator={selectedTrip.operator}
          departure={`${selectedTrip.departure} ${selectedTrip.from}`}
          arrival={`Estimated ${selectedTrip.arrival} ${selectedTrip.to}`}
          bookings={selectedTrip.bookings}
          onClose={handleCloseModal}
        />
      )}
    </main>
  );
}

export default SearchPage;
