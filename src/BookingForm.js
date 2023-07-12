import React, { useState } from "react";
import axios from "axios";
import "./BookingForm.css";
const BookingForm = () => {
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState("");
  const [bookingAmount, setBookingAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/book", {
        facility,
        date,
        startTime,
        endTime,
      })
      .then((response) => {
        setMessage(response.data.message);
        setBookingAmount(response.data.bookingAmount);
      })
      .catch((error) => {
        setMessage(error.response.data.error);
        setBookingAmount(0);
      });
  };

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="header">FACILITY BOOKING</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter Facility"
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
          />
          <br />
          <input
            type="date"
            className="input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <input
            type="text"
            className="input"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <br />
          <input
            type="time"
            placeholder="End Time"
            value={endTime}
            className="input"
            onChange={(e) => setEndTime(e.target.value)}
          />
          <br />
          <button type="submit" className="btn">
            Book
          </button>
        </form>
        {message && (
          <div>
            <p>{message}</p>
            <p>Booking Amount: Rs. {bookingAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
