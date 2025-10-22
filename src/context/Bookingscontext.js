import React, { createContext, useState } from "react";

export const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const addBooking = (flight, user) => {
    const newBooking = {
      id: bookings.length ? bookings[bookings.length - 1].id + 1 : 1,
      flight,
      user,
    };
    setBookings([...bookings, newBooking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(bookings.filter((b) => b.id !== bookingId));
  };

  return (
    <BookingsContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingsContext.Provider>
  );
};
