import React from "react";
import { Card, Button } from "react-bootstrap";

function FlightCard({ flight, onBook }) {
  return (
    <Card
      className="shadow-sm hover-card"
      style={{ cursor: "pointer", transition: "0.3s", marginBottom: "1rem" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0c000")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
    >
      <Card.Body>
        <Card.Title className="text-primary">{flight.flight_number}</Card.Title>
        <Card.Text>
          <strong>From:</strong> {flight.origin} <br />
          <strong>To:</strong> {flight.destination} <br />
          <strong>Date:</strong> {new Date(flight.departure_time).toLocaleString()} <br />
          <strong>Price:</strong> ₹{flight.price} <br />
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: flight.status === "On-time" ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {flight.status}
          </span>
        </Card.Text>
        <Button variant="success" className="w-100 fw-bold" onClick={() => onBook(flight)}>
          Book Now
        </Button>
      </Card.Body>
    </Card>
  );
}

export default FlightCard;
