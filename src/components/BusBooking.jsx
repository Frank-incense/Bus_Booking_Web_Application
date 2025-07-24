@@ .. @@
 import React, { useState } from "react";
 import "./BusBooking.css";

 const seatRows = 10;
 const seatColumns = 4;
 const pricePerSeat = 1750;

 const initialBookedSeats = new Set(["1B", "2B", "3B"]);
+
 const BusBooking = ({
   operator = "Easy Coach",
   departure = "07:00 Nairobi",
   arrival = "04:00 Kisumu",
   onClose,
 }) => {
   const [selectedSeats, setSelectedSeats] = useState(new Set());
   const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
+  const [isBooking, setIsBooking] = useState(false);

   const toggleSeat = (seat) => {
     if (bookedSeats.has(seat)) return;
     const newSelectedSeats = new Set(selectedSeats);
     if (newSelectedSeats.has(seat)) {
       newSelectedSeats.delete(seat);
     } else {
       newSelectedSeats.add(seat);
     }
     setSelectedSeats(newSelectedSeats);
   };

   const totalFare = selectedSeats.size * pricePerSeat;

-  const handleBookSeats = () => {
+  const handleBookSeats = async () => {
     if (selectedSeats.size === 0) return;
-    alert("Seats booked successfully!");
+    
+    setIsBooking(true);
+    
+    // Simulate booking API call
+    await new Promise(resolve => setTimeout(resolve, 2000));
+    
     const newBookedSeats = new Set(bookedSeats);
     selectedSeats.forEach((seat) => newBookedSeats.add(seat));
     setBookedSeats(newBookedSeats);
     setSelectedSeats(new Set());
+    setIsBooking(false);
+    
+    // Show success message
+    alert(`Successfully booked ${selectedSeats.size} seat(s)! Total: Kes ${totalFare.toLocaleString()}`);
+    onClose();
   };

   const renderSeat = (row, col) => {
     let seatLabel = `${row}${String.fromCharCode(65 + col)}`;
     if (row === 1 && col === 2) {
       seatLabel = "DR";
     }
     const isBooked = bookedSeats.has(seatLabel);
     const isSelected = selectedSeats.has(seatLabel);

     let seatClass = "seat empty-seat";
     if (seatLabel === "DR") {
       seatClass = "seat driver-seat";
     } else if (isBooked) {
       seatClass = "seat booked-seat";
     } else if (isSelected) {
       seatClass = "seat selected-seat";
     }

     return (
       <div
         key={seatLabel}
         className={seatClass}
         onClick={() => {
           if (seatLabel === "DR") return;
           toggleSeat(seatLabel);
         }}
         title={seatLabel}
-        style={seatLabel === "DR" ? { backgroundColor: "red", color: "white", fontWeight: "bold", cursor: "default" } : {}}
       >
         {seatLabel}
       </div>
     );
   };

   const renderSeatsGrid = () => {
     const rows = [];
     for (let row = 1; row <= seatRows; row++) {
       const seatsLeft = [];
       const seatsRight = [];
       seatsLeft.push(renderSeat(row, 0));
       seatsLeft.push(renderSeat(row, 1));
       if (row === 1) {
         seatsRight.push(renderSeat(row, 2));
       } else {
         seatsRight.push(renderSeat(row, 2));
         seatsRight.push(renderSeat(row, 3));
       }
       rows.push(
         <div
           key={row}
           className="seat-row"
-          style={{ display: "flex", justifyContent: "space-between" }}
         >
-          <div className="seat-group-left" style={{ display: "flex" }}>
+          <div className="seat-group-left">
             {seatsLeft}
           </div>
-          <div className="seat-group-right" style={{ display: "flex" }}>
+          <div className="seat-group-right">
             {seatsRight}
           </div>
         </div>
       );
     }
     return rows;
   };

   return (
     <div className="bus-booking-modal">
-      <div className="bus-booking-header">
-        <h3>Bus Booking Details</h3>
-        <button className="close-button" onClick={onClose}>
-          ×
-        </button>
-      </div>
-      <div className="bus-booking-operator-time">
-        <strong>{operator}</strong>
-        <span>{departure}</span>
-        <span>{arrival}</span>
-      </div>
-      <div className="bus-booking-content">
+      <div className="bus-booking-content">
+        <div className="bus-booking-header">
+          <h3>Select Your Seats</h3>
+          <button className="close-button" onClick={onClose}>
+            ×
+          </button>
+        </div>
+        
+        <div className="bus-booking-operator-time">
+          <div className="operator-info">
+            <div className="operator-logo">
+              {operator.split(' ').map(word => word[0]).join('')}
+            </div>
+            <strong>{operator}</strong>
+          </div>
+          <div className="route-info">
+            <span>{departure}</span>
+            <span className="route-arrow">→</span>
+            <span>{arrival}</span>
+          </div>
+        </div>
+        
+        <div className="bus-booking-body">
         <div className="seats-selection">
           <div className="legend">
-            <div>
-              <div className="seat empty-seat"></div> Empty seat
+            <div className="legend-item">
+              <div className="legend-seat empty-seat"></div>
+              <span>Available</span>
             </div>
-            <div>
-              <div className="seat booked-seat"></div> Booked seat
+            <div className="legend-item">
+              <div className="legend-seat booked-seat"></div>
+              <span>Booked</span>
             </div>
-            <div>
-              <div className="seat selected-seat"></div> Selected seat
+            <div className="legend-item">
+              <div className="legend-seat selected-seat"></div>
+              <span>Selected</span>
             </div>
-            <div>
-              <div className="seat driver-seat" style={{backgroundColor: 'red', color: 'white', fontWeight: 'bold', cursor: 'default', display: 'inline-flex', justifyContent: 'center', alignItems: 'center'}}>
-                DR
-              </div> Driver seat
+            <div className="legend-item">
+              <div className="legend-seat driver-seat">DR</div>
+              <span>Driver</span>
             </div>
           </div>
           <div className="seats-grid">{renderSeatsGrid()}</div>
         </div>
+        
         <div className="booking-details">
-          <h4>Booking Details</h4>
-          <p>Selected seats: {selectedSeats.size}</p>
-          <p>Price per seat: {pricePerSeat}</p>
-          <p>Total Fare: {totalFare}</p>
+          <h4>Booking Summary</h4>
+          
+          {selectedSeats.size > 0 && (
+            <div className="selected-seats-display">
+              <h5>Selected Seats:</h5>
+              <div className="seat-tags">
+                {Array.from(selectedSeats).map(seat => (
+                  <span key={seat} className="seat-tag">{seat}</span>
+                ))}
+              </div>
+            </div>
+          )}
+          
+          <div className="booking-summary">
+            <div className="summary-item">
+              <span className="summary-label">Selected Seats:</span>
+              <span className="summary-value">{selectedSeats.size}</span>
+            </div>
+            <div className="summary-item">
+              <span className="summary-label">Price per Seat:</span>
+              <span className="summary-value">Kes {pricePerSeat.toLocaleString()}</span>
+            </div>
+            <div className="summary-item">
+              <span className="summary-label">Total Fare:</span>
+              <span className="summary-value total-fare">Kes {totalFare.toLocaleString()}</span>
+            </div>
+          </div>
+          
           <button
             className="book-seats-button"
-            disabled={selectedSeats.size === 0}
+            disabled={selectedSeats.size === 0 || isBooking}
             onClick={handleBookSeats}
           >
-            Book seats
+            {isBooking ? 'Booking...' : `Book ${selectedSeats.size} Seat${selectedSeats.size !== 1 ? 's' : ''}`}
           </button>
         </div>
+        </div>
       </div>
     </div>
   );
 };

 export default BusBooking;