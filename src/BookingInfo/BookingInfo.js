import React from "react";
import "./BookingInfo.css";

const BookingInfo = () => {
  return (
    <div className="two-container">
      <h2 className="header-info">Facility Booking Info</h2>
      <div className="inside-container">
        <div className="Clubhouse-container">
          <h3 className="side-header">Club House</h3>
          <p>10:00 to 16:00 - Rs.100/hour</p>
          <p>16:00 to 22:00 - Rs.500/hour</p>
        </div>
        <div className="Tennis-container">
          <h3 className="side-header">Tennis Court</h3>
          <p>10:00 to 22:00 - Rs.50/hour</p>
        </div>
      </div>
    </div>
  );
};
export default BookingInfo;
