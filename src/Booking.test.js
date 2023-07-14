import React from "react";
import Booking from "./BookingForm/Booking";
import { render, fireEvent } from "@testing-library/react";

describe("Booking component", () => {
  test("should book a facility successfully", () => {
    const { getByText, getByLabelText } = render(<Booking />);

    // Fill in the input fields
    fireEvent.change(getByLabelText("Facility"), {
      target: { value: "Clubhouse" },
    });
    fireEvent.change(getByLabelText("Date"), {
      target: { value: "2023-07-13" },
    });
    fireEvent.change(getByLabelText("Start Time"), {
      target: { value: "11:00" },
    });
    fireEvent.change(getByLabelText("End Time"), {
      target: { value: "16:00" },
    });

    // Click on the book button
    fireEvent.click(getByText("Book"));

    // Check if the booking success message is displayed
    expect(window.alert).toHaveBeenCalledWith("Booked successfully, Rs. 500");

    // Check if the input fields are reset after successful booking
    expect(getByLabelText("Facility").value).toBe("");
    expect(getByLabelText("Date").value).toBe("");
    expect(getByLabelText("Start Time").value).toBe("");
    expect(getByLabelText("End Time").value).toBe("");
  });

  test("should show an error message if any field is empty", () => {
    const { getByText } = render(<Booking />);

    // Click on the book button without filling any fields
    fireEvent.click(getByText("Book"));

    // Check if the error message is displayed
    expect(window.alert).toHaveBeenCalledWith("fill all the fields");
  });

  test("should show an error message if the facility is already booked", () => {
    const { getByText, getByLabelText } = render(<Booking />);

    // Fill in the input fields
    fireEvent.change(getByLabelText("Facility"), {
      target: { value: "Clubhouse" },
    });
    fireEvent.change(getByLabelText("Date"), {
      target: { value: "2023-07-13" },
    });
    fireEvent.change(getByLabelText("Start Time"), {
      target: { value: "11:00" },
    });
    fireEvent.change(getByLabelText("End Time"), {
      target: { value: "16:00" },
    });

    // Click on the book button to book the facility
    fireEvent.click(getByText("Book"));

    // Click on the book button again for the same time slot
    fireEvent.click(getByText("Book"));

    // Check if the booking failure message is displayed
    expect(window.alert).toHaveBeenCalledWith("Booking Failed, Already Booked");
  });
});
