import React, { createContext, useState, useEffect } from "react";

export const TripsContext = createContext();


export const TripsProvider = ({ children }) => {
  const [trips, setTrips] = useState(() => {
    const storedTrips = localStorage.getItem("trips");
    return storedTrips ? JSON.parse(storedTrips) : [];
  });


  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);


  const addTrip = (trip) => {
    setTrips((prev) => [...prev, trip]);
  };


  const removeTrip = (id) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  return (
    <TripsContext.Provider value={{ trips, addTrip, removeTrip }}>
      {children}
    </TripsContext.Provider>
  );
};
