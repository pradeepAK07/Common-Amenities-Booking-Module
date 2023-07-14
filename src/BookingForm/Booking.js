import React, { useState } from "react";
import "./Booking.css";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const bookFacility = () => {
    // Check if all input fields are filled
    if (date !== "" && startTime !== "" && endTime !== "") {
      const parsedStartTime = parseInt(startTime.split(":")[0], 10);
      const parsedEndTime = parseInt(endTime.split(":")[0], 10);

      // Check if the facility is already booked for the given time slot
      const isBooked = bookings.some(
        (booking) =>
          booking.facility === facility &&
          booking.date === date &&
          ((booking.startTime <= parsedStartTime &&
            booking.endTime >= parsedStartTime) ||
            (booking.startTime <= parsedEndTime &&
              booking.endTime >= parsedEndTime))
      );

      if (isBooked) {
        alert("Booking Failed, Already Booked");
        return;
      }

      let bookingAmount = 0;

      // Calculate the booking amount based on the facility and time slot
      if (facility === "Clubhouse") {
        if (parsedStartTime >= 10 && parsedEndTime <= 16) {
          bookingAmount = (parsedEndTime - parsedStartTime) * 100;
        } else if (parsedStartTime >= 16 && parsedEndTime <= 22) {
          bookingAmount = (parsedEndTime - parsedStartTime) * 500;
        }
      } else if (facility === "Tennis Court") {
        bookingAmount = (parsedEndTime - parsedStartTime) * 50;
      }

      // Create a new booking object and add it to the bookings array
      if (facility === "--- Select Facility ---" || facility === "") {
        alert("select the facility and fill the fields");
      } else {
        const newBooking = {
          facility,
          date,
          startTime: parsedStartTime,
          endTime: parsedEndTime,
          bookingAmount,
        };
        setBookings([...bookings, newBooking]);

        alert(`Booked successfully, Rs. ${bookingAmount}`);

        // Reset the input fields after successful booking
        setFacility("");
        setDate("");
        setStartTime("");
        setEndTime("");
      }
    } else {
      alert("fill all the fields");
    }
  };

  console.log(bookings);
  return (
    <div className="form-container">
      <div className="form">
        <h2 className="header">Facility Booking</h2>
        <select
          onChange={(e) => setFacility(e.target.value)}
          className="dropdown"
          value={facility}
        >
          <option>--- Select Facility ---</option>
          <option>Clubhouse</option>
          <option>Tennis Court</option>
        </select>
        <input
          type="date"
          className="input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Start Time      ex: 11:00"
          className="input"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="End Time       ex: 16:00"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <button className="btn" onClick={bookFacility}>
          Book
        </button>
      </div>
    </div>
  );
};

export default Booking;
