import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import api from "../api/axiosConfig";

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [message, setMessage] = useState("");

  const fetchTrips = async () => {
    try {
      const res = await api.get("/bookings/my-trips/");
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCancel = async (tripId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await api.delete(`/bookings/${tripId}/`);
        setMessage("Booking cancelled successfully!");
        fetchTrips(); // refresh
      } catch (err) {
        console.error(err);
        setMessage("Failed to cancel booking. Please try again.");
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">My Trips</h2>

      {message && <Alert variant="info">{message}</Alert>}

      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.flight.flight_number}</td>
                <td>{trip.flight.origin}</td>
                <td>{trip.flight.destination}</td>
                <td>{trip.flight.departure_time}</td>
                <td>{trip.flight.price}</td>
                <td>{trip.status}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleCancel(trip.id)}
                    disabled={trip.status === "Cancelled"}
                  >
                    {trip.status === "Cancelled" ? "Cancelled" : "Cancel"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default MyTrips;
