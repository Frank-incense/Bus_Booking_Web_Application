@@ .. @@
 import React, { useState } from 'react';
 import './Home.css';
 import DatePicker from 'react-datepicker';
 import 'react-datepicker/dist/react-datepicker.css';
 import BusBooking from '../components/BusBooking';

 // Placeholder for an icon component if you have one
 const Icon = ({ name }) => <i className={`fa fa-${name}`}></i>;

 const Home = () => {
   const [fromDate, setFromDate] = useState('');
   const [toDate, setToDate] = useState('');
   const [selectedDate, setSelectedDate] = useState(null);
   const [showBookingModal, setShowBookingModal] = useState(false);
   const [selectedRoute, setSelectedRoute] = useState(null);
+  const [isSearching, setIsSearching] = useState(false);

   const popularRoutes = [
     { id: 1, from: 'Nairobi', to: 'Kisumu', time: '6h 21min', price: 'Kes 1,500' },
     { id: 2, from: 'Nairobi', to: 'Mombasa', time: '8h', price: 'Kes 2,000' },
     { id: 3, from: 'Nairobi', to: 'Mandera', time: '18h 27min', price: 'Kes 3,500' },
     { id: 4, from: 'Nakuru', to: 'Siaya', time: '4h 59min', price: 'Kes 1,200' },
     { id: 5, from: 'Nakuru', to: 'Kitale', time: '4h 26min', price: 'Kes 1,000' },
     { id: 6, from: 'Nairobi', to: 'Eldoret', time: '5h', price: 'Kes 900' },
   ];

-  const handleSearch = () => {
+  const handleSearch = async () => {
+    setIsSearching(true);
+    // Simulate API call
+    await new Promise(resolve => setTimeout(resolve, 1500));
     console.log('Searching for:', {
       fromDate,
       toDate,
       selectedDate: selectedDate?.toLocaleDateString(),
     });
+    setIsSearching(false);
   };

+  const clearInput = (field) => {
+    if (field === 'from') setFromDate('');
+    if (field === 'to') setToDate('');
+    if (field === 'date') setSelectedDate(null);
+  };

   return (
     <div className="home-container">
       {/* Hero Section */}
       <section className="hero-section">
         <img
-          src="https://via.placeholder.com/1500x500/ADD8E6/FFFFFF?text=Bus+on+Road"
+          src="https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=1500&h=600&fit=crop"
           alt="Bus on a road"
           className="hero-image"
         />
+        <div className="hero-overlay"></div>
+        <div className="hero-content">
+          <h1>Your Journey Starts Here</h1>
+          <p>Experience comfortable, reliable, and affordable bus travel across Kenya</p>
+          <div className="hero-cta">
+            <a href="#search" className="cta-button cta-primary">Book Your Trip</a>
+            <a href="#routes" className="cta-button cta-secondary">Explore Routes</a>
+          </div>
+        </div>
       </section>

       {/* Journey Hub Logo & Tagline */}
       <section className="journey-hub-intro">
         <div className="star-rating">⭐⭐⭐⭐⭐</div>
         <h1>JOURNEY HUB</h1>
         <p>KENYA'S NUMBER ONE TRUSTED TRAVEL PARTNER</p>
       </section>

       {/* Search Bar Section */}
-      <section className="search-bar-section">
+      <section id="search" className="search-bar-section">
         <div className="search-inputs">
           <div className="input-group">
             <label htmlFor="from">From</label>
             <input
               type="text"
               id="from"
               placeholder="Origin"
               value={fromDate}
               onChange={(e) => setFromDate(e.target.value)}
             />
-            <span className="clear-input">X</span>
+            {fromDate && (
+              <span className="clear-input" onClick={() => clearInput('from')}>×</span>
+            )}
           </div>

           <div className="input-group">
             <label htmlFor="to">To</label>
             <input
               type="text"
               id="to"
               placeholder="Destination"
               value={toDate}
               onChange={(e) => setToDate(e.target.value)}
             />
-            <span className="clear-input">X</span>
+            {toDate && (
+              <span className="clear-input" onClick={() => clearInput('to')}>×</span>
+            )}
           </div>

           <div className="input-group date-input-group">
             <label htmlFor="date">Select date</label>
             <DatePicker
               selected={selectedDate}
               onChange={(date) => setSelectedDate(date)}
               placeholderText="Choose a date"
               dateFormat="yyyy-MM-dd"
               minDate={new Date()}
               id="date"
               className="date-picker-input"
               required
             />
+            {selectedDate && (
+              <span className="clear-input" onClick={() => clearInput('date')}>×</span>
+            )}
           </div>

-          <button className="search-button" onClick={handleSearch}>
-            SEARCH
+          <button 
+            className={`search-button ${isSearching ? 'loading' : ''}`} 
+            onClick={handleSearch}
+            disabled={isSearching}
+          >
+            {isSearching ? 'SEARCHING...' : 'SEARCH BUSES'}
           </button>
         </div>
       </section>

       {/* Popular Routes Section */}
-      <section className="popular-routes-section">
+      <section id="routes" className="popular-routes-section">
         <h2>POPULAR ROUTES</h2>
         <p>Discover the most traveled routes across the country</p>
         <div className="routes-grid">
           {popularRoutes.map((route) => (
             <div
               key={route.id}
               className="route-card"
               onClick={() => {
                 setShowBookingModal(true);
                 setSelectedRoute(route);
               }}
-              style={{ cursor: 'pointer' }}
             >
               <div className="route-header">
                 <h3>
                   {route.from} - {route.to}
                 </h3>
               </div>
               <div className="route-details">
                 <div className="profile-pic-container">
                   <img
-                    src="https://via.placeholder.com/30"
+                    src="https://images.pexels.com/photos/1010973/pexels-photo-1010973.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&fit=crop"
                     alt="Profile"
                     className="profile-pic"
                   />
                 </div>
-                <span>{route.time}</span>
-                <span>{route.price}</span>
+                <div className="route-details-text">
+                  <div className="time">{route.time}</div>
+                  <div className="price">{route.price}</div>
+                </div>
               </div>
             </div>
           ))}
         </div>
         <button className="view-all-routes-button">View all routes</button>
       </section>

       {/* Booking Modal */}
       {showBookingModal && (
         <BusBooking
           operator="Easy Coach"
           departure={`07:00 ${selectedRoute?.from || ''}`}
           arrival={`04:00 ${selectedRoute?.to || ''}`}
           onClose={() => setShowBookingModal(false)}
         />
       )}

       {/* Footer Section */}
       <footer className="footer-section">
         <div className="footer-columns">
-          <div className="footer-column social-icons">
-            <Icon name="facebook" />
-            <Icon name="twitter" />
-            <Icon name="instagram" />
-            <Icon name="youtube" />
+          <div className="footer-column">
+            <h4>JourneyHub</h4>
+            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
+              Your trusted partner for comfortable and reliable bus travel across Kenya. 
+              Experience the difference with our premium services.
+            </p>
+            <div className="social-icons">
+              <Icon name="facebook" />
+              <Icon name="twitter" />
+              <Icon name="instagram" />
+              <Icon name="youtube" />
+            </div>
           </div>
           <div className="footer-column">
-            <h4>Use cases</h4>
+            <h4>Services</h4>
             <ul>
-              <li>UI design</li>
-              <li>UX design</li>
-              <li>Wireframing</li>
-              <li>Programming</li>
-              <li>Development</li>
-              <li>Online whiteboard</li>
-              <li>Team collaboration</li>
+              <li><a href="/service1">Bus Booking</a></li>
+              <li><a href="/service2">Parcel Delivery</a></li>
+              <li><a href="/service1">Bus Hiring</a></li>
+              <li><a href="#routes">Route Planning</a></li>
+              <li><a href="/contact">Customer Support</a></li>
+              <li><a href="/about">Travel Insurance</a></li>
             </ul>
           </div>
           <div className="footer-column">
-            <h4>Explore</h4>
+            <h4>Company</h4>
             <ul>
-              <li>Design</li>
-              <li>Prototyping</li>
-              <li>Development features</li>
-              <li>Design systems</li>
-              <li>Collaboration features</li>
-              <li>Design process</li>
-              <li>FigJam</li>
+              <li><a href="/about">About Us</a></li>
+              <li><a href="/contact">Contact</a></li>
+              <li><a href="/careers">Careers</a></li>
+              <li><a href="/news">News & Updates</a></li>
+              <li><a href="/partners">Partners</a></li>
+              <li><a href="/sustainability">Sustainability</a></li>
             </ul>
           </div>
           <div className="footer-column">
-            <h4>Resources</h4>
+            <h4>Support</h4>
             <ul>
-              <li>Blog</li>
-              <li>Best practices</li>
-              <li>Colors</li>
-              <li>Color wheel</li>
-              <li>Support</li>
-              <li>Developers</li>
-              <li>Resource library</li>
+              <li><a href="/help">Help Center</a></li>
+              <li><a href="/faq">FAQ</a></li>
+              <li><a href="/terms">Terms of Service</a></li>
+              <li><a href="/privacy">Privacy Policy</a></li>
+              <li><a href="/refund">Refund Policy</a></li>
+              <li><a href="/contact">Contact Support</a></li>
             </ul>
           </div>
         </div>
+        <div className="footer-bottom">
+          <p>&copy; 2025 JourneyHub. All rights reserved. | Privacy Policy | Terms of Service | Cookie Policy</p>
+        </div>
       </footer>
     </div>
   );
 };

 export default Home;