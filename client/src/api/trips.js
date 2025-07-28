// src/api/trips.js
import axios from 'axios';
const trips = [
  {
    id: 1,
    operator: "Greenline Express",
    departureTime: "08:30 AM",
    arrivalTime: "02:00 PM",
    price: 1200,
    date: "2025-07-28",
    origin: "Nairobi",
    destination: "Kisumu"
  },
  {
    id: 2,
    operator: "Modern Coast",
    departureTime: "06:00 AM",
    arrivalTime: "01:30 PM",
    price: 1500,
    date: "2025-07-28",
    origin: "Nairobi",
    destination: "Mombasa"
  },
  {
    id: 3,
    operator: "Easy Coach",
    departureTime: "11:00 AM",
    arrivalTime: "07:00 PM",
    price: 1300,
    date: "2025-07-29",
    origin: "Nairobi",
    destination: "Eldoret"
  },
  {
    id: 4,
    operator: "Guardian Angel",
    departureTime: "07:00 PM",
    arrivalTime: "03:30 AM",
    price: 1000,
    date: "2025-07-30",
    origin: "Nairobi",
    destination: "Kisumu"
  },
  {
    id: 5,
    operator: "Mash Poa",
    departureTime: "10:00 PM",
    arrivalTime: "06:00 AM",
    price: 1800,
    date: "2025-07-28",
    origin: "Nairobi",
    destination: "Malindi"
  }
];


export const fetchTrips = async (filters) => {
//   const response = await axios.get('/api/trips', {
//     params: filters
//   });
//   console.log(response)
  return trips; // adjust if your backend structure differs
};
