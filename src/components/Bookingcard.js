import React from "react";
import { Card } from "react-bootstrap";

function BookingCard({ booking }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{booking.flight.name}</Card.Title>
        <Card.Text>
          <strong>From:</strong> {booking.flight.from_airport} <br />
          <strong>To:</strong> {booking.flight.to_airport} <br />
          <strong>Date:</strong> {booking.flight.date} <br />
          <strong>Status:</strong> {booking.status}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookingCard;
