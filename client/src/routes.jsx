import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Hiring from "./components/Hiring";
import Parcel from "./components/Parcel";
import Signup from "./components/Signup";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminRoutesManager from "./pages/AdminRoutesManager";
import AdminBuses from "./pages/AdminBuses";
import AdminUsers from "./pages/AdminUsers";
import AdminReports from "./pages/AdminReports";
import Home from "./pages/Home";
import SearchPage from "./pages/TripSearchPage";
import UserBookingPage from "./pages/BookingPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <LoginForm /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <AboutUs /> },
      { path: "contact", element: <ContactUs /> },
      { path: "service1", element: <Hiring /> },
      { path: "service2", element: <Parcel /> },
      { path: 'search', element: <SearchPage/>},
      { path:'book', element:<UserBookingPage/>}
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute>
      <AdminLayout />
      </ProtectedRoute> , 
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "bookings", element: <AdminBookings /> },
      { path: "routes", element: <AdminRoutesManager /> },
      { path: "buses", element: <AdminBuses /> },
      { path: "users", element: <AdminUsers /> },
      // { path: "reports", element: <AdminReports /> },
    ],
  },
]);

export default router;
