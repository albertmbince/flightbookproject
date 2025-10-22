import React from "react";
import { Card } from "react-bootstrap";

function BookingCard({ booking }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{booking.flight_number}</Card.Title>
        <Card.Text>
          <strong>From:</strong> {booking.origin} <br />
          <strong>To:</strong> {booking.destination} <br />
          <strong>Date:</strong> {new Date(booking.departure_time).toLocaleString()} <br />
          <strong>Status:</strong> {booking.status}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookingCard;
