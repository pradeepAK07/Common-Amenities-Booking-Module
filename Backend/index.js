const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Store booked facilities
const bookedFacilities = [];

// Define facility details
const facilities = {
  clubhouse: {
    slots: [
      { startTime: "10:00", endTime: "16:00", price: 100 },
      { startTime: "16:00", endTime: "22:00", price: 500 },
    ],
  },
  tennisCourt: {
    slots: [{ startTime: "00:00", endTime: "23:59", price: 50 }],
  },
};

// Endpoint to handle facility booking
app.post("/book", (req, res) => {
  const { facility, date, startTime, endTime } = req.body;

  // Check if the facility exists
  if (!facilities[facility]) {
    return res.status(400).json({ error: "Facility not found" });
  }

  // Check if the requested time slot is available
  const requestedSlot = { startTime, endTime };
  const isSlotAvailable = bookedFacilities.every((booking) => {
    if (booking.facility === facility && booking.date === date) {
      return !isOverlap(requestedSlot, booking.slot);
    }
    return true;
  });

  if (!isSlotAvailable) {
    return res.status(400).json({ error: "Booking Failed, Already Booked" });
  }

  // Find the price for the requested time slot
  const facilityDetails = facilities[facility];
  const slot = facilityDetails.slots.find((s) => isOverlap(requestedSlot, s));
  if (!slot) {
    return res.status(400).json({ error: "Invalid time slot" });
  }

  // Calculate the booking amount
  const bookingAmount = calculateBookingAmount(slot);

  // Store the booked facility
  bookedFacilities.push({
    facility,
    date,
    slot: requestedSlot,
    bookingAmount,
  });

  // Return the booking details
  res.json({ message: "Booked", bookingAmount });
});

// Helper function to check if two time slots overlap
function isOverlap(slot1, slot2) {
  const start1 = new Date(`2000-01-01T${slot1.startTime}`);
  const end1 = new Date(`2000-01-01T${slot1.endTime}`);
  const start2 = new Date(`2000-01-01T${slot2.startTime}`);
  const end2 = new Date(`2000-01-01T${slot2.endTime}`);

  return (
    (start1 <= start2 && start2 < end1) ||
    (start1 < end2 && end2 <= end1) ||
    (start2 <= start1 && start1 < end2) ||
    (start2 < end1 && end1 <= end2)
  );
}

// Helper function to calculate booking amount
function calculateBookingAmount(slot) {
  const { startTime, endTime, price } = slot;
  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);
  const hours = (end - start) / (1000 * 60 * 60);

  return hours * price;
}

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
